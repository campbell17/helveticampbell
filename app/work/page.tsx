'use client'

import Link from 'next/link'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { H1, Caption, H2, H3 } from '../components/Typography'
import ProjectSidebar from '../components/ProjectSidebar'
import { useState } from 'react'
import Image from 'next/image'
import Testimonials from '../components/Testimonials'
// Work images from Sidebar component
const workImages = [
  // Gallery 1: My Work
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum", gallery: 1 },
  { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks", projectKey: "Spatial Networks", gallery: 1 },
  { src: "/images/work/isolated/iso-allinspections-icon-alt.jpg", alt: "Allinspections", projectKey: "Allinspections", gallery: 1 },
  { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide for PS4", projectKey: "Divide", gallery: 1 },
  { src: "/images/work/gridded/grid-icons-all.jpg", alt: "Branding", projectKey: "Branding", gallery: 1 },
  { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Personal/Misc", projectKey: "Personal", gallery: 1 },
];

function WorkItem({ image, onImageClick, index }: { 
  image: { src: string; alt: string; projectKey: string; gallery: number; fullWidth?: boolean }; 
  onImageClick: (index: number) => void;
  index: number;
}) {
  
  return (
    <div 
      className={`
        flex flex-col gap-2 
        transition-all
        duration-[var(--duration-300)]        
        ${image.fullWidth ? 'md:col-span-2' : ''}
      `}
    >
      <div 
        className="cursor-pointer relative group shadow-2xl hover:shadow-xs shadow-slate-900/20 overflow-hidden rounded-[var(--container-radius)]" 
        onClick={() => onImageClick(index)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-all duration-200"
        />
        
        {/* Simple hover overlay */}
        <div className="absolute inset-0 bg-slate-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
        
        {/* Project icon indicator */}
        {image.projectKey && (
          <div className="absolute bottom-2 left-2">
            <div className="p-2 text-gray-300/90">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <Caption className="text-sm text-text-secondary">{image.alt}</Caption>
    </div>
  )
}

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const [currentGallery, setCurrentGallery] = useState<string | null>(null);

  // Handler for image clicks
  const handleImageClick = (index: number) => {
    const clickedImage = workImages[index];
    if (clickedImage.projectKey) {
      setSelectedProject(clickedImage.projectKey);
    } else {
      // For images without a project key, show in lightbox
      setCurrentGallery(`gallery-${clickedImage.gallery}`);
      setLightboxImageIndex(index);
    }
  };

  // Handler for navigating between projects
  const handleNavigateToProject = (projectKey: string) => {
    setSelectedProject(projectKey);
  };

  return (
    <div>
      <H1>Work</H1>

      <div className="subheading">
        See a few examples of my work, learn about how I got started, and hear what it's like to work with me.
      </div>

      <div className="flex flex-col gap-20">

        <div>
          {/* Work gallery grid */}
          <div className="@container mb-16">
            <div className="grid grid-cols-1 @lg:grid-cols-2 gap-8">
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
            <p>If design called to my logical side, the web as a medium called to my preternatural lust for improvement. When I sent that file entitled "business-card-CEO-front_final-final2.pdf" to the printer for that run of 10,000, the click-event on the send button in Outlook was (popover: what the racing instructors used to call) a Pampers™ moment. On the web, however, I could fix a typo faster than that same PDF would load in Adobe Acrobat. I'm not condoning sloppiness, of course. Pampers™ are expensive. <Link href="/who">Get the full working history.</Link></p>            
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
      {/* Project Sidebar component */}
      <ProjectSidebar
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        projectKey={selectedProject}
        lightboxImageIndex={lightboxImageIndex}
        setLightboxImageIndex={setLightboxImageIndex}
        currentGallery={currentGallery}
        setCurrentGallery={setCurrentGallery}
        onNavigateToProject={handleNavigateToProject}
      />
    </div>
  )
} 