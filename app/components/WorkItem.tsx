'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  imageAspectRatio?: string; // Custom aspect ratio class
}

export default function WorkItem({ image, imageAspectRatio = "aspect-video" }: WorkItemProps) {
  const [videoError, setVideoError] = useState(false);

  // Convert project key to URL-friendly format
  const getProjectUrl = (key: string) => {
    // Handle nested Fulcrum projects
    if (key === 'Fulcrum Lines and Polygons') {
      return '/work/fulcrum-lines-and-polygons';
    }
    if (key === 'Fulcrum Data') {
      return '/work/fulcrum/data';
    }
    if (key === 'Fulcrum Report Builder') {
      return '/work/fulcrum/report-builder';
    }
    
    // Default behavior for other projects
    return `/work/${key.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div 
      className={`
        flex flex-col
        transition-all
        duration-[var(--duration-300)]        
        ${image.fullWidth ? 'md:col-span-2' : ''}
      `}
    >
      <Overline className="flex items-center !text-lg mb-2">{projectDetails[image.projectKey]?.tags?.[0]}</Overline>
      <Link 
        href={getProjectUrl(image.projectKey)}
        className="container-behavior-primary pane"
      >
        {/* Cover video or image with customizable aspect ratio */}
        {projectDetails[image.projectKey]?.coverVideo && !videoError ? (
          <div className={`${imageAspectRatio} w-full overflow-hidden`}>
            <video
              src={projectDetails[image.projectKey]?.coverVideo || ''}
              poster={projectDetails[image.projectKey]?.coverImage || ''}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="object-cover w-full h-full"
            />
          </div>
        ) : projectDetails[image.projectKey]?.coverImage && (
          <div className={`${imageAspectRatio} w-full overflow-hidden`}>
            <Image
              src={projectDetails[image.projectKey]?.coverImage || ''}
              alt={`Cover for ${image.alt}`}
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority={true}
              loading="eager"
            />
          </div>
        )}
        
        {/* Content area */}
        {/* <div className="p-6"> */}
          {/* Tags */}
          {/* <div className="flex flex-wrap gap-x-2 gap-y-1 mb-1"> */}
            {/* {projectDetails[image.projectKey]?.tags?.map((tag: string, i: number) => (
              <React.Fragment key={tag}> */}
                {/* <Overline className="flex items-center text-xs uppercase font-medium text-secondary">{tag}</Overline> */}
                {/* {i < (projectDetails[image.projectKey]?.tags?.length || 0) - 1 && (
                  <span className="text-xs mx-1 text-primary">|</span>
                )}
              </React.Fragment>
            ))}
          </div> */}
          
          {/* Title */}
          {/* <h3 className="text-primary text-lg font-medium !mb-1">{projectDetails[image.projectKey]?.heading}<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> {projectDetails[image.projectKey]?.headingAlt}</span></h3> */}
          
          {/* Description */}
          {/* <p className="!mb-0 text-primary text-base">{projectDetails[image.projectKey]?.subheading || ''}</p> */}
        {/* </div> */}
      </Link>
    </div>
  )
} 