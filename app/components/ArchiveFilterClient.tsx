'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Define a type for our markdown essays (matching the one in the archive page)
interface Essay {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

// Define interfaces for props
interface ArchiveFilterClientProps {
  essays: Essay[];
  sortedTags: string[];
  tagCounts: Record<string, number>;
}

export default function ArchiveFilterClient({ essays, sortedTags, tagCounts }: ArchiveFilterClientProps) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);
  const [visibleEssays, setVisibleEssays] = useState<Essay[]>(essays);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(76);
  const [fullHeight, setFullHeight] = useState(0);

  // Measure the full height of the tags container when the component mounts
  useEffect(() => {
    if (tagsContainerRef.current) {
      setFullHeight(tagsContainerRef.current.scrollHeight);
    }
  }, [sortedTags]); // Re-measure if tags change

  // Update essay visibility when filters change
  useEffect(() => {
    if (activeFilters.size === 0) {
      setVisibleEssays(essays);
      return;
    }

    const filtered = essays.filter(essay => {
      return Array.from(activeFilters).some(tag => 
        essay.tags?.includes(tag)
      );
    });

    setVisibleEssays(filtered);
  }, [activeFilters, essays]);

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
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters(new Set());
  };

  // Toggle expanded state for tag container
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const formattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
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
            ref={tagsContainerRef} 
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ height: expanded ? `${fullHeight}px` : '76px' }}
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
      
      {/* Essays list */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {visibleEssays.length > 0 ? (
          visibleEssays.map((essay) => (
            <Link 
              href={`/writing/${essay.slug}?from=archive`} 
              key={essay.slug} 
              className="essay-item flex flex-col justify-between rounded-[var(--container-radius)] overflow-hidden pane py-6 shadow-md border-b border-border transition-colors duration-150 px-4"
            >
              <h3 className="font-medium text-xl hover:text-primary transition-colors duration-300">
                {essay.title}
              </h3>
              <div className="flex flex-wrap gap-2 my-2">
                {essay.tags && essay.tags.map(tag => (
                  <span 
                    key={`${essay.slug}-${tag}`}
                    className="inline-block bg-secondary/10 px-2 py-0.5 rounded-full text-xs"
                  >
                  </span>
                ))}
              </div>
              <time dateTime={new Date(essay.date).toISOString()} className="text-sm text-text-color-light">
                {formattedDate(essay.date)}
              </time>
            </Link>
          ))
        ) : (
          <div className="py-8 text-center col-span-full">
            <p className="text-lg">No essays match the selected tags.</p>
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