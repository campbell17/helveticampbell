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
        
        const response = await fetch(apiUrl.toString(), {
          // Add timeout and better error handling
          signal: AbortSignal.timeout(10000), // 10 second timeout
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          // Don't treat API failures as critical errors
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.error || response.statusText;
          console.warn(`Substack API warning: ${errorMessage} (Status: ${response.status})`);
          
          // Set empty array instead of throwing error
          if (isMounted) {
            setPosts([]);
            setError(null); // Don't set error for external API failures
          }
          return;
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
          
          // No valid structure found - set empty array
          console.warn('Unexpected data format from Substack API:', responseData);
          setPosts([]);
        } else {
          console.warn('Empty response from Substack API');
          setPosts([]);
        }
      } catch (err) {
        if (isMounted) {
          // Handle network errors gracefully
          if (err instanceof Error) {
            if (err.name === 'AbortError') {
              console.warn('Substack API request timed out');
            } else if (err.name === 'TypeError') {
              console.warn('Substack API network error:', err.message);
            } else {
              console.warn('Substack API error:', err.message);
            }
          } else {
            console.warn('Unknown Substack API error:', err);
          }
          
          // Don't set error state for external API failures
          setPosts([]);
          setError(null);
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