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
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // NOTE: In production, you would call your own backend API
        // that securely handles the API key. Never expose API keys in client code.
        const apiUrl = new URL('https://api.substackapi.dev/posts/latest');
        apiUrl.searchParams.append('publication_url', publicationUrl);
        apiUrl.searchParams.append('limit', limit.toString());
        apiUrl.searchParams.append('offset', offset.toString());
        
        const response = await fetch('/api/substack-posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            publicationUrl,
            limit,
            offset
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Substack posts');
        console.error('Error fetching Substack posts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [publicationUrl, limit, offset]);
  
  return { posts, isLoading, error };
}; 