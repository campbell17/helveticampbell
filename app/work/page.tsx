'use client'

import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { H1 } from '../components/Typography'
import ProjectSidebar from '../components/ProjectSidebar'
import { useState } from 'react'
import Image from 'next/image'

// Work images from Sidebar component
const workImages = [
  // Gallery 1: My Work
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum", gallery: 1, fullWidth: false },
  { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks", projectKey: "Spatial Networks", gallery: 1, fullWidth: false },
  { src: "/images/work/isolated/iso-allinspections-icon-alt.jpg", alt: "Allinspections", projectKey: "Allinspections", gallery: 1, fullWidth: false },
  { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide for PS4", projectKey: "Divide", gallery: 1, fullWidth: false },
  { src: "/images/work/gridded/grid-icons-all.jpg", alt: "Branding", projectKey: "Branding", gallery: 1, fullWidth: false },
  { src: "/images/work/full/full-personal-painting-1.jpg", alt: "Personal/Misc", projectKey: "Personal", gallery: 1, fullWidth: false },
];

function WorkItem({ image, onImageClick, index }: { 
  image: typeof workImages[0]; 
  onImageClick: (index: number) => void;
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '50px'
  })

  return (
    <div 
      ref={ref}
      className={`
        flex flex-col gap-2 
        transition-all
        duration-[var(--duration-300)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${image.fullWidth ? 'md:col-span-2' : ''}
      `}
    >
      <div 
        className="cursor-pointer relative group overflow-hidden rounded-[var(--container-radius)]" 
        onClick={() => onImageClick(index)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1000}
          height={1000}
          className="transition-all duration-200"
        />
        
        {/* Simple hover overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
        
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
      <p className="text-sm text-[hsl(var(--color-text-secondary))]">{image.alt}</p>
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

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <H1 className="mb-4">Work</H1>
      
      {/* Page header */}
      <div className="mb-12">
        <p className="text-[hsl(var(--color-text-secondary))] text-lg">
          A collection of selected projects and experiments. Click on any item to see more details.
        </p>
      </div>

      {/* Work gallery grid */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workImages.map((image, index) => (
            <WorkItem
              key={index}
              image={image}
              index={index}
              onImageClick={handleImageClick}
            />
          ))}
        </div>
        
        {/* Additional text from "My Work" tile content */}
        <div className="mt-12 max-w-2xl mx-auto">
          <p className="text-2xl font-serif text-gray-600 leading-relaxed mb-4">
            I knew I wanted to be a designer when I realized I wasn't afraid to get paid.
          </p>

          <p className="text-2xl font-serif text-gray-600 leading-relaxed mb-4">
            I'll explain...
          </p>

          <p className="text-2xl font-serif text-gray-600 leading-relaxed mb-4">
            I went to art school where I majored in illustration and photography. Needless to say, after graduation I worked in sporting goods fitting people for running shoes (I was damn good, by the way). I never dug into how to make money with my art because I never felt comfortable with the idea of something so subjective being scrutinized in that way. Like how people who know they're about to get ripped off scrutinize the gleam in their car salesman's eye.
          </p>

          <p className="text-2xl font-serif text-gray-600 leading-relaxed mb-4">
            But I was always technically sharp and to me, design was more technical. If someone needed a logo, no problem. Logos cost this much. I fell in love with design because it was the perfect combination of drawing a sublime portrait and troubleshooting my neighbor's Dell. It always starts with logos, flyers, posters, brochures... so many brochures. In the beginning it was mostly print. When I started, web design was still young. But I kept my eye on it and dabbled where I could and eventually, it's all I did.
          </p>

          <p className="text-2xl font-serif text-gray-600 leading-relaxed mb-4">
            If design called to my logical side, the web called to my preternatural lust for improvement. When I sent that file entitled "business-card-CEO-front_FINAL-FINAL2.pdf" to the printer for that run of 10,000, the mouse-up event on the send button to his hotmail.com business address was what the racing instructors used to call a Pampers™ moment. On the web, however, I could fix a typo faster than that same PDF would load in Adobe Acrobat. I'm not condoning sloppiness, of course. Diapers are expensive.
          </p>
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
      />
    </div>
  )
} 