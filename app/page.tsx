'use client'

import { H1, H2, H3 } from './components/Typography'
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
        
        <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm overflow-hidden shadow-md">
            {essays.map(essay => (
              <EssayItem key={essay.id} essay={essay} />
            ))}
        </div>
      </div>
      
      {/* About Section */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <H2>Who</H2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="aspect-[4/4] -scale-x-100 relative rounded-[var(--container-radius)] overflow-hidden bg-white/30 min-w-[180px]">
            <Image
              src="/images/tim.jpg"
              alt="Tim Campbell"
              width={1000}
              height={1000}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex flex-col"> 
            <H3 className="!mb-0">Hi, I'm Tim.</H3>
            <p className="!mb-2 !leading-8">
              Currently designing, making art, writing, and solving problems. Adding clarity wherever possible. <Link href="/who">Learn more</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
} 