'use client'

import { H1, H2 } from './components/Typography'
import WorkItem from './components/WorkItem'
import EssayItem from './components/EssayItem'
import { useOpenProject } from './hooks/useOpenProject'
import { essays } from './data/essays'
import Link from 'next/link'
import Image from 'next/image'

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

export default function HomePage() {
  const { openProject } = useOpenProject();

  // Handler for image clicks - simplified to only open projects
  const handleImageClick = (index: number) => {
    const clickedImage = workImages[index];
    if (clickedImage.projectKey) {
      openProject(clickedImage.projectKey);
    }
  };

  return (
    <>
      <H1>This is <span className="font-helveticampbell tracking-normal">Helveticampbell</span>.</H1>
      
      <div className="subheading">
        Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up.
      </div>
      
      <H2 className="mb-8">Work</H2>
      <div>
          {/* Work gallery grid */}
          <div className="@container mb-16">
            <div className="grid grid-cols-1 gap-4 md:gap-8">
              {workImages.map((image, index) => (
                <WorkItem
                  key={index}
                  image={image}
                  index={index}
                  onImageClick={handleImageClick}
                  imageAspectRatio="aspect-[21/6]" // Custom wider aspect ratio for homepage
                />
              ))}
            </div>
          </div>
      </div>
      
      {/* Writing Section */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <H2>Recent Writing</H2>
          <Link 
            href="/writing" 
            className="text-secondary hover:text-primary transition-colors duration-300"
          >
            View all
          </Link>
        </div>
        
        <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm p-6 shadow-md">
          <div className="divide-primary/10 -mt-6">
            {essays.map(essay => (
              <EssayItem key={essay.id} essay={essay} />
            ))}
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <H2>About</H2>
          <Link 
            href="/who" 
            className="text-secondary hover:text-primary transition-colors duration-300"
          >
            Learn more
          </Link>
        </div>
        
        <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm p-6 shadow-md">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-32 h-32 -scale-x-100 relative rounded-[var(--container-radius)] overflow-hidden bg-white/30">
              <Image
                src="/images/tim.jpg"
                alt="Tim Campbell"
                width={250}
                height={250}
                sizes="(max-width: 768px) 100vw, 250px"
                className="object-cover h-full w-full"
              />
            </div>
            <p className="text-base">
              I was the sole designer on Fulcrum for its first 10 years while it grew from an idea on a whiteboard to $12M+ in ARR with 2,000+ customers. I'm comfortable working with Rails, HTML, CSS, as well as JS/React to speed up development and deliver complete solutions.
            </p>
          </div>
        </div>
      </div>
    </>
  )
} 