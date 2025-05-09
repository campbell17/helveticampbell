'use client'

import React from 'react'
import Image from 'next/image'
import { Overline } from './Typography'
import { projectDetails } from '../data/projectDetails'

interface WorkItemProps { 
  image: { 
    src: string; 
    alt: string; 
    projectKey: string; 
    gallery: number; 
    fullWidth?: boolean;
    roles?: string;
    title?: string;
    description?: string;
    heading?: string;
    headingAlt?: string;
    subheading?: string;
  }; 
  onImageClick: (index: number) => void;
  index: number;
  imageAspectRatio?: string; // Custom aspect ratio class
}

export default function WorkItem({ image, onImageClick, index, imageAspectRatio = "aspect-video" }: WorkItemProps) {
  return (
    <div 
      className={`
        flex flex-col
        transition-all
        duration-[var(--duration-300)]        
        ${image.fullWidth ? 'md:col-span-2' : ''}
      `}
    >
      <div 
        className="cursor-pointer h-full rounded-[var(--container-radius)] overflow-hidden shadow-xl hover:shadow-xs shadow-[color:var(--color-shadow)] pane border border-[color:var(--color-border)] transition-all duration-transition-duration-normal"
        onClick={() => onImageClick(index)}
      >
        {/* Cover image with customizable aspect ratio */}
        {projectDetails[image.projectKey]?.coverImage && (
          <div className={`${imageAspectRatio} w-full overflow-hidden`}>
            <Image
              src={projectDetails[image.projectKey]?.coverImage || ''}
              alt={`Cover for ${image.alt}`}
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        {/* Content area */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-x-2 gap-y-1 mb-3">
            {projectDetails[image.projectKey]?.tags?.map((tag: string, i: number) => (
              <React.Fragment key={tag}>
                <Overline className="flex items-center text-xs uppercase font-medium text-secondary">{tag}</Overline>
                {i < (projectDetails[image.projectKey]?.tags?.length || 0) - 1 && (
                  <span className="text-xs mx-1 text-primary">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Title */}
          <h3 className="text-primary text-lg font-medium mb-2">{projectDetails[image.projectKey]?.heading}<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> {projectDetails[image.projectKey]?.headingAlt}</span></h3>
          
          {/* Description */}
          <p className="!mb-0 text-primary text-base">{projectDetails[image.projectKey]?.subheading || 'A comprehensive design solution that combines intuitive user experience with compelling visual identity and strategic marketing assets.'}</p>
        </div>
      </div>
    </div>
  )
} 