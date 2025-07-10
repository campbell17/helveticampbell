'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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
  const [lightboxImage, setLightboxImage] = useState<ImageData | null>(null);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const filters = [
    { id: 'web', label: 'Web', count: images.filter(img => img.categories?.includes('web')).length },
    { id: 'print', label: 'Print', count: images.filter(img => img.categories?.includes('print')).length },
    { id: 'photo', label: 'Photo', count: images.filter(img => img.categories?.includes('photo')).length },
    { id: 'branding', label: 'Branding', count: images.filter(img => img.categories?.includes('branding')).length },
    { id: 'art', label: 'Art', count: images.filter(img => img.categories?.includes('art')).length },
    { id: 'gaming', label: 'Gaming', count: images.filter(img => img.categories?.includes('gaming')).length },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? [] // If already selected, deselect it
        : [filterId] // Otherwise, select only this filter
    );
  };

  const clearSelection = () => {
    setSelectedFilters([]);
  };

  const openLightbox = (image: ImageData, index: number) => {
    setLightboxImage(image);
    setCurrentImageIndex(index);
    setShowCloseButton(false);
    // Show close button after a short delay
    setTimeout(() => {
      setShowCloseButton(true);
    }, 300);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setShowCloseButton(false);
  };

  const navigateToImage = (index: number) => {
    const displayedImages = filteredImages.filter(img => !img.fullWidth).slice(0, 177);
    if (index >= 0 && index < displayedImages.length) {
      setCurrentImageIndex(index);
      setLightboxImage(displayedImages[index]);
    }
  };

  const goToPrevious = () => {
    const displayedImages = filteredImages.filter(img => !img.fullWidth).slice(0, 177);
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : displayedImages.length - 1;
    navigateToImage(newIndex);
  };

  const goToNext = () => {
    const displayedImages = filteredImages.filter(img => !img.fullWidth).slice(0, 177);
    const newIndex = currentImageIndex < displayedImages.length - 1 ? currentImageIndex + 1 : 0;
    navigateToImage(newIndex);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxImage) return;
      
      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
      }
    };

    if (lightboxImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage, currentImageIndex]);

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
            <div className="text-base flex flex-wrap gap-4 mb-6">
              <span className="!text-[var(--theme)]">Filter:</span> 
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`text-base inline cursor-pointer relative transition-colors duration-150 group ${
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
                  onClick={clearSelection}
                  className="inline cursor-pointer relative !text-[var(--text-color-light)] hover:!text-[var(--text-color)] transition-colors duration-150 group"
                >
                  Clear Selection
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
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 lg:gap-6">
              {
                filteredImages.filter(img => !img.fullWidth).slice(0, 177).map((image, index) => (
                  <div 
                    key={image.src || index} 
                    className="cursor-pointer relative group overflow-hidden rounded-xl shadow-md mb-4 lg:mb-6 break-inside-avoid hover:shadow-lg transition-shadow duration-200"
                    onClick={() => openLightbox(image, index)}
                  >
                    <div className="relative w-full" style={{ aspectRatio: image.aspectRatio || '1' }}>
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-180 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className={`absolute -top-2 -right-2 z-100 p-2 cursor-pointer bg-white/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/70 transition-all duration-300 text-white ${
                showCloseButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            
                         {/* Image Container */}
             <div 
               className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-2xl"
               style={{ height: 'calc(90vh - 48px)' }}
               onClick={(e) => e.stopPropagation()}
             >
               <Image
                 src={lightboxImage.src}
                 alt={lightboxImage.alt}
                 width={1200}
                 height={800}
                 className="w-full h-full object-contain"
                 priority
               />
             </div>
            
            {/* Image Caption */}
            {/* <div className="mt-4 text-center">
              <p className="text-white/80 text-sm">{lightboxImage.alt}</p>
            </div> */}
          </div>
          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-100 p-3 cursor-pointer bg-white/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/70 transition-all duration-300 text-white ${
              showCloseButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          
          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-100 p-3 cursor-pointer bg-white/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/70 transition-all duration-300 text-white ${
              showCloseButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
} 