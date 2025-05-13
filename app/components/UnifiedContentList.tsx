'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSubstackPosts, SubstackPost } from '../hooks/useSubstackPosts';
import { config } from '../config/environment';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// Define a type for our markdown essays
interface LocalEssay {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

// Unified content item that can represent either type
interface UnifiedContentItem {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  source: 'local' | 'substack';
  url: string;
  isExternal: boolean;
  coverImage?: {
    url: string | null;
    alt: string;
  };
}

interface UnifiedContentListProps {
  localEssays: LocalEssay[];
  showFilters?: boolean;
}

export default function UnifiedContentList({ localEssays, showFilters = false }: UnifiedContentListProps) {
  const [unifiedContent, setUnifiedContent] = useState<UnifiedContentItem[]>([]);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});
  const [expanded, setExpanded] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // Fetch Substack posts
  const { posts: substackPosts, isLoading, error } = useSubstackPosts({
    publicationUrl: config.substackUrl,
    limit: 100
  });

  // Combine and process content when either local essays or substack posts change
  useEffect(() => {
    if (isLoading) return;
    
    // Transform local essays to unified format
    const localItems: UnifiedContentItem[] = localEssays.map(essay => ({
      id: `local-${essay.slug}`,
      title: essay.title,
      date: essay.date,
      excerpt: essay.excerpt,
      tags: essay.tags || [],
      source: 'local' as const,
      url: `/writing/${essay.slug}?from=unified`,
      isExternal: false
    }));
    
    // Transform substack posts to unified format
    const substackItems: UnifiedContentItem[] = (substackPosts || []).map(post => ({
      id: `substack-${post.slug}`,
      title: post.title,
      date: post.date,
      excerpt: post.description || post.excerpt || '',
      tags: ['substack'], // Tag all substack posts with 'substack'
      source: 'substack' as const,
      url: post.url,
      isExternal: true,
      coverImage: {
        url: post.cover_image?.medium || post.cover_image?.original || null,
        alt: post.title || 'Substack post image'
      }
    }));
    
    // Combine and sort by date
    const combined = [...localItems, ...substackItems].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setUnifiedContent(combined);
    
    // Extract all unique tags for filtering
    const tags = new Set<string>();
    combined.forEach(item => {
      item.tags?.forEach(tag => tags.add(tag));
    });
    
    const tagList = Array.from(tags);
    setAllTags(tagList);
    
    // Count items per tag
    const counts: Record<string, number> = {};
    tagList.forEach(tag => {
      counts[tag] = combined.filter(item => item.tags?.includes(tag)).length;
    });
    setTagCounts(counts);
    
  }, [localEssays, substackPosts, isLoading]);

  // Handle image error
  const handleImageError = (itemId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [itemId]: true
    }));
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setActiveFilters(prevFilters => {
      const newFilters = new Set(prevFilters);
      if (newFilters.has(tag)) {
        newFilters.delete(tag);
      } else {
        newFilters.add(tag);
      }
      return newFilters;
    });
    setIsFiltering(true);
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters(new Set());
    setIsFiltering(false);
  };

  // Toggle expanded state for tag container
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Format date string consistently
  const formattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Filter content based on active tags
  const filteredContent = isFiltering && activeFilters.size > 0
    ? unifiedContent.filter(item => 
        Array.from(activeFilters).some(tag => item.tags?.includes(tag))
      )
    : unifiedContent;

  // Sort tags by count (popularity)
  const sortedTags = [...allTags].sort((a, b) => tagCounts[b] - tagCounts[a]);

  if (isLoading) {
    return <div className="p-6 text-center">Loading content...</div>;
  }

  return (
    <>
      {showFilters && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold !mb-0">Filter by Topic</h2>   
            {activeFilters.size > 0 && (
              <div className="flex items-center">
                <button
                  onClick={clearFilters}
                  className="bg-[var(--mode-color)] hover:bg-[var(--grid-color)] border border-[var(--color-border)] cursor-pointer px-3 py-1 rounded-full text-sm transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )} 
          </div>
          <div className="relative">
            <div 
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ height: expanded ? 'auto' : '76px' }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {sortedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center ${activeFilters.has(tag) ? 'bg-[var(--theme-color)]' : 'bg-[var(--pane-bg-color)]'} border border-[var(--color-border)] cursor-pointer px-3 py-1 rounded-full text-sm transition-all`}
                  >
                    {tag} <span className="ml-1 !text-[var(--text-color-light)]">({tagCounts[tag]})</span>
                  </button>
                ))}
              </div>
            </div>
            {sortedTags.length > 10 && (
              <button 
                onClick={toggleExpanded}
                className="mt-2 cursor-pointer text-sm transition-colors focus:outline-none"
              >
                {expanded ? 'Show fewer topics' : 'Show more topics'}
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Unified Content List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredContent.length > 0 ? (
          filteredContent.map((item) => (
            <Link 
              href={item.url} 
              key={item.id} 
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className="group content-item flex flex-col h-full rounded-[var(--container-radius)] overflow-hidden pane shadow-md border border-border transition-colors duration-150"
            >
              {item.coverImage && item.coverImage.url && !imageErrors[item.id] && (
                <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                  <Image 
                    src={item.coverImage.url} 
                    alt={item.coverImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImageError(item.id)}
                  />
                </div>
              )}
              
              <div className="flex flex-col justify-between flex-grow p-5">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-xl group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    {item.isExternal && (
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-text-color-light ml-2 flex-shrink-0" />
                    )}
                  </div>
                  
                  {item.excerpt && (
                    <p className="text-sm text-text-color-light mt-2 line-clamp-2">{item.excerpt}</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.tags && item.tags.map(tag => (
                      <span 
                        key={`${item.id}-${tag}`}
                        className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                          tag === 'substack' ? 'bg-orange-500/20 text-orange-600' : 'bg-secondary/10'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <time dateTime={new Date(item.date).toISOString()} className="text-sm text-text-color-light">
                    {formattedDate(item.date)}
                  </time>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-8 text-center col-span-full">
            <p className="text-lg">No content matches the selected filters.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 bg-primary/10 hover:bg-primary/20 text-text-color px-4 py-2 rounded-full text-sm transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
} 