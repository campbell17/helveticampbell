'use client'

import Link from 'next/link'
import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { H1, Caption, H2, H3, Overline } from '../components/Typography'
import Image from 'next/image'
import Testimonials from '../components/Testimonials'
import { useOpenProject } from '../hooks/useOpenProject'
import { useState } from 'react'
import { projectDetails } from '../data/projectDetails'

// Work images from Sidebar component
const workImages = [
  // Gallery 1: My Work
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum", gallery: 1 },
  { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks", projectKey: "Spatial Networks", gallery: 1 },
  { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide for PS4", projectKey: "Divide", gallery: 1 },
  { src: "/images/work/isolated/iso-allinspections-icon-alt.jpg", alt: "Allinspections", projectKey: "Allinspections", gallery: 1 },
  { src: "/images/work/gridded/grid-icons-all.jpg", alt: "Branding", projectKey: "Branding", gallery: 1 },
  { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Personal/Misc", projectKey: "Personal", gallery: 1 },
];

function WorkItem({ image, onImageClick, index }: { 
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
}) {
  
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
        className="cursor-pointer h-full rounded-[var(--container-radius)] overflow-hidden shadow-2xl hover:shadow-xs shadow-slate-900/20 bg-white/60"
        onClick={() => onImageClick(index)}
      >
        {/* Cover image - 16:9 aspect ratio */}
        {projectDetails[image.projectKey]?.coverImage && (
          <div className="aspect-video w-full overflow-hidden">
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

export default function WorkPage() {
  const { openProject } = useOpenProject();

  // Handler for image clicks - simplified to only open projects
  const handleImageClick = (index: number) => {
    const clickedImage = workImages[index];
    if (clickedImage.projectKey) {
      openProject(clickedImage.projectKey);
    }
  };

  return (
    <div>
      <H1>Work</H1>

      <div className="subheading">
        See a few examples of my work, learn how I got my start, and hear what it's like to work with me from the people who have.
      </div>

      <div className="flex flex-col gap-20">

        <div>
          {/* Work gallery grid */}
          <div className="@container mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
              {workImages.map((image, index) => (
                <WorkItem
                  key={index}
                  image={image}
                  index={index}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <H2 className="mb-8">How It All Started</H2>
          {/* Additional text from "My Work" tile content */}
          <div className="mt-12">
            {/* <p>I knew I wanted to be a designer when I realized I wasn't afraid to get paid. Let me explain...</p> */}
            <p>I went to art school where I majored in illustration and photography.</p>
            <p>After graduation I worked in sporting goods. A great start, I know.</p>
            <p>I spent my days fitting people for running shoes (I was damn good, by the way) and my nights working on my design portfolio. Despite the BFA(popover) in my posession and my love for making beautiful images, I never felt comfortable pursuing how to make money with my art. The idea of something so personal and subjective being scrutinized by someone else never squared with me.</p>
            <p>But I was always technically sharp, and to me design was more technical. If someone needed a logo, no problem. &ldquo;Logos cost this much&rdquo;. I fell in love with design because it was the perfect combination of drawing a sublime portrait and troubleshooting my neighbor's Dell. </p>
            <p>Design careers of the early 2000's always kicked off with logos, flyers, posters, and brochures... so many brochures. In the beginning it was mostly print, with some corporate Powerpoint decks(popover/footnote) thrown in. When I started, web design was still young. But I kept my eye on it and dabbled where I could and eventually, it's all I did.</p>
            <p>If design called to my logical side, the web as a medium called to my preternatural lust for improvement. When I sent that file entitled "business-card-CEO-front_final-final2.pdf" to the printer for that run of 10,000, the click-event on the send button in Outlook was (popover: what the racing instructors used to call) a Pampers™ moment. On the web, however, I could fix a typo faster than that same PDF would load in Adobe Acrobat. I'm not condoning sloppiness, of course. Pampers™ are expensive. <Link href="/who">Read more about my work history.</Link></p>            
          </div>
        </div>
        <div>
          {/* Working with Tim */}
          <div className="flex flex-col">
            <H2>What It's Like to Work With Me</H2>
            <Testimonials className="mt-12"/>
          </div>
        </div>
      </div>
    </div>
  )
} 