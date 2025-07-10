'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageData {
  src: string;
  alt: string;
  aspectRatio?: string;
  fullWidth?: boolean;
  categories?: string[];
}

interface ArchiveGalleryProps {
  images: ImageData[];
}

export default function ArchiveGallery({ images }: ArchiveGalleryProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const filters = [
    { id: 'web', label: 'Web', count: images.filter(img => img.categories?.includes('web')).length },
    { id: 'print', label: 'Print', count: images.filter(img => img.categories?.includes('print')).length },
    { id: 'photo', label: 'Photo', count: images.filter(img => img.categories?.includes('photo')).length },
    { id: 'branding', label: 'Branding', count: images.filter(img => img.categories?.includes('branding')).length },
    { id: 'art', label: 'Art', count: images.filter(img => img.categories?.includes('art')).length },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const filteredImages = selectedFilters.length === 0 
    ? images 
    : images.filter(img => 
        img.categories?.some(category => selectedFilters.includes(category))
      );

  return (
    <>
      {/* Filter Controls */}
      <div className="px-4 sm:px-6 pb-10 md:px-20">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="flex flex-wrap gap-4 mb-6">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`text-sm inline cursor-pointer relative transition-colors duration-150 group ${
                    selectedFilters.includes(filter.id)
                      ? 'text-[var(--color-link-hover)]'
                      : 'text-[var(--color-link)] hover:text-[var(--color-link-hover)]'
                  }`}
                >
                  {filter.label} ({filter.count})
                  <span
                    className={`absolute w-full h-0.5 bottom-[-2px] left-0 bg-current transition-transform duration-150 ease-out origin-left ${
                      selectedFilters.includes(filter.id)
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              ))}
              {selectedFilters.length > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm inline cursor-pointer relative text-red-600 hover:text-red-800 transition-colors duration-150 group"
                >
                  Clear All
                  <span className="absolute w-full h-0.5 bottom-[-2px] left-0 bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-150 ease-out origin-left" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="px-4 sm:px-6 md:px-20 md:pb-28 pt-0">
        <div className="max-w-none">
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
              {
                filteredImages.filter(img => !img.fullWidth).slice(0, 177).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                    <div className="relative" style={{ aspectRatio: image.aspectRatio || '1' }}>
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 