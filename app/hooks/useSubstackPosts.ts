import { useState, useEffect } from 'react';

export interface SubstackPost {
  slug: string;
  url: string;
  title: string;
  description: string;
  excerpt: string | null;
  date: string;
  likes: number;
  paywall: boolean;
  cover_image: {
    original: string | null;
    small: string | null;
    medium: string | null;
    large: string | null;
  };
  author: string;
}

interface SubstackApiResponse {
  data: {
    data: SubstackPost[];
    metadata: {
      timestamp: number;
      source: string;
      publication_url: string;
      posts_count: number;
      offset: number;
      limit: number;
    }
  };
  metadata: {
    timestamp: number;
    source: string;
    publication_url: string;
    limit: number;
    offset: number;
  }
}

interface UseSubstackPostsProps {
  publicationUrl: string;
  limit?: number;
  offset?: number;
}

export const useSubstackPosts = ({ 
  publicationUrl, 
  limit = 3, 
  offset = 0 
}: UseSubstackPostsProps) => {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<any>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchPosts = async () => {
      if (!isMounted) return;
      
      setIsLoading(true);
      setError(null);
      
      if (!publicationUrl) {
        setError('Publication URL is required');
        setIsLoading(false);
        return;
      }
      
      try {
        // console.log(`Attempting to fetch posts from ${publicationUrl}`);
        
        // Using GET request instead of POST
        const apiUrl = new URL('/api/substack-posts', window.location.origin);
        apiUrl.searchParams.append('publication_url', publicationUrl);
        apiUrl.searchParams.append('limit', limit.toString());
        apiUrl.searchParams.append('offset', offset.toString());
        
        // console.log(`Fetching from: ${apiUrl.toString()}`);
        
        const response = await fetch(apiUrl.toString());
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.error || response.statusText;
          throw new Error(`Failed to fetch posts: ${errorMessage}`);
        }
        
        const responseData = await response.json();
        // console.log('Raw API response:', responseData);
        
        // Save raw response for debugging
        if (isMounted) {
          setRawResponse(responseData);
        }
        
        // Handle various possible response formats
        if (responseData) {
          // Case 1: Double nested structure - {data: {data: [...posts]}}
          if (responseData.data && responseData.data.data && Array.isArray(responseData.data.data)) {
            // console.log(`Found double-nested data structure with ${responseData.data.data.length} posts`);
            setPosts(responseData.data.data);
            return;
          }
          
          // Case 2: Standard structure - {data: [...posts]}
          if (responseData.data && Array.isArray(responseData.data)) {
            // console.log(`Found standard data structure with ${responseData.data.length} posts`);
            setPosts(responseData.data);
            return;
          }
          
          // Case 3: Direct array - [...posts]
          if (Array.isArray(responseData)) {
            // console.log(`Found direct array with ${responseData.length} posts`);
            setPosts(responseData);
            return;
          }
          
          // No valid structure found
          console.error('Unexpected data format:', responseData);
          throw new Error('Invalid response format from API');
        } else {
          throw new Error('Empty response from API');
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch Substack posts';
          setError(errorMessage);
          console.error('Error fetching Substack posts:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchPosts();
    
    return () => {
      isMounted = false;
    };
  }, [publicationUrl, limit, offset]);
  
  return { posts, isLoading, error, rawResponse };
}; 