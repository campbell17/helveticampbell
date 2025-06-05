'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSubstackPosts, SubstackPost } from '../hooks/useSubstackPosts';
import { config } from '../config/environment';
import { Overline } from './Typography';

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
  limit?: number;
  layout?: 'grid' | 'list';
}

export default function UnifiedContentList({ localEssays, showFilters = false, limit, layout = 'grid' }: UnifiedContentListProps) {
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
      tags: ['Substack'], // Tag all substack posts with 'substack'
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
    
    // Apply limit if specified
    const limitedContent = limit ? combined.slice(0, limit) : combined;
    
    setUnifiedContent(limitedContent);
    
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
    
  }, [localEssays, substackPosts, isLoading, limit]);

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
    return (
      <div className="w-full">
        {/* Skeleton for filter section */}
        {showFilters && (
          <div className="mb-8">
            <div className="mb-8">
              {/* Filter heading skeleton */}
              <div className="h-7 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="relative">
              <div className="overflow-hidden" style={{ height: '76px' }}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* First row of tag skeletons */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div 
                      key={`tag-skeleton-row1-${i}`}
                      className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* Second row of tag skeletons */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div 
                      key={`tag-skeleton-row2-${i}`}
                      className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skeleton for content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`content-skeleton-${i}`} className="container-behavior-primary pane h-[350px] flex flex-col">
              {/* Image skeleton */}
              <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                {/* Title skeleton */}
                <div>
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8"></div>
                  {/* Excerpt skeleton */}
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                {/* Date skeleton */}
                <div className="mt-4">
                  <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <Link 
                href={item.url} 
                key={item.id} 
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="group content-item flex flex-col h-full container-behavior-primary pane"
              >
                {item.coverImage && item.coverImage.url && !imageErrors[item.id] && (
                  <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                    <Image 
                      src={item.coverImage.url} 
                      alt={item.coverImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300"
                      onError={() => handleImageError(item.id)}
                      loading="lazy"
                      priority={false}
                    />
                  </div>
                )}
                
                <div className="flex flex-col justify-between flex-grow p-5">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="!mb-0">
                        {item.title}
                      </h3>
                    </div>
                    
                    {item.excerpt && (
                      <p className="text-base !text-[var(--text-color-light)] mt-2 !mb-8 line-clamp-2">{item.excerpt}</p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <time dateTime={new Date(item.date).toISOString()} className="text-xs uppercase font-sans text-[var(--text-color-light)]">
                        {formattedDate(item.date)}
                      </time>
                      {item.isExternal && (
                        <svg 
                          role="img" 
                          style={{ transform: 'scale(1)' }} 
                          width="16" 
                          height="18" 
                          viewBox="0 0 16 18" 
                          fill="#ff6719" 
                          strokeWidth="1.8" 
                          stroke="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0"
                        >
                          <g>
                            <title>Substack</title>
                            <path d="M16 4H0V6H16V4Z"></path>
                            <path d="M0 8V18L7.9993 13.534L16 18V8H0Z"></path>
                            <path d="M16 0H0V2H16V0Z"></path>
                          </g>
                        </svg>
                      )}
                    </div>
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
      ) : (
        <div className="flex flex-col">
          {filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <Link 
                href={item.url} 
                key={item.id} 
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="flex flex-col mb-4 md:mb-0 rounded-[var(--container-radius)] md:rounded-none overflow-hidden md:overflow-visible md:block border-b border-color-border hover:bg-pane-bg-color-hover transition-colors duration-150 container-behavior-secondary pane"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image - full width on mobile, fixed width on md+ */}
                  {item.coverImage && item.coverImage.url && !imageErrors[item.id] ? (
                    <div className="relative w-full md:min-w-[280px] md:w-[280px] h-auto overflow-hidden flex-shrink-0">
                      <div className="aspect-[16/6] md:aspect-[9/6] h-full">
                        <Image 
                          src={item.coverImage.url} 
                          alt={item.coverImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 280px"
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-300"
                          onError={() => handleImageError(item.id)}
                          loading="lazy"
                          priority={false}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full md:min-w-[280px] md:w-[280px] aspect-[9/6] bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Content with adjusted padding for stacked layout */}
                  <div className="flex flex-col gap-2 flex-1 py-4 md:py-6 px-4 md:px-6">
                    <div className="flex justify-between items-center">
                      <Overline className="!text-[var(--text-color-light)]">
                        {formattedDate(item.date)}
                      </Overline>
                      {item.isExternal && (
                        <svg 
                          role="img" 
                          width="16" 
                          height="18" 
                          viewBox="0 0 16 18" 
                          fill="#ff6719" 
                          strokeWidth="1.8" 
                          stroke="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0"
                        >
                          <g>
                            <title>Substack</title>
                            <path d="M16 4H0V6H16V4Z"></path>
                            <path d="M0 8V18L7.9993 13.534L16 18V8H0Z"></path>
                            <path d="M16 0H0V2H16V0Z"></path>
                          </g>
                        </svg>
                      )}
                    </div>
                    <h3 className="!mb-2 font-medium text-xl">{item.title}</h3>
                    <p className="!mb-0 text-base !text-[var(--text-color-light)]">{item.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-8 text-center">
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
      )}
    </>
  );
} 