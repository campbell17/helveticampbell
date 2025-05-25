'use client'

import { H1, H2, H3, Overline } from './Typography'
import WorkItem from './WorkItem'
import UnifiedContentList from './UnifiedContentList'
import { useOpenProject } from '../hooks/useOpenProject'
import { essays } from '../data/essays'
import { config } from '../config/environment'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { HomepageStructuredData } from './StructuredDataManager'

// Work images from Sidebar component
const workImages = [
  // Gallery 1: My Work
  // { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum", gallery: 1 },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum Branding", gallery: 1 },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum Data", gallery: 1 },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum Community", gallery: 1 },
  // { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide for PS4", projectKey: "Divide", gallery: 1 },
  // { src: "/images/work/isolated/iso-allinspections-icon-alt.jpg", alt: "Allinspections", projectKey: "Allinspections", gallery: 1 },
  // { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks", projectKey: "Spatial Networks", gallery: 1 },
  // { src: "/images/work/gridded/grid-icons-all.jpg", alt: "Branding", projectKey: "Branding", gallery: 1 },
  // { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Personal/Misc", projectKey: "Personal", gallery: 1 },
];

export default function HomeContent() {
  const { openProject } = useOpenProject();
  
  const [showDebug, setShowDebug] = useState(false);

  // Debug output
  // useEffect(() => {
  //   if (posts && posts.length > 0) {
  //     console.log('Posts available for rendering:', posts.length);
  //     console.log('First post sample:', posts[0]);
  //   }

  //   if (rawResponse) {
  //     console.log('Raw API response stored:', rawResponse);
  //   }
  // }, [posts, rawResponse]);

  // Handler for image clicks - simplified to only open projects
  const handleImageClick = (index: number) => {
    const clickedImage = workImages[index];
    if (clickedImage.projectKey) {
      openProject(clickedImage.projectKey);
    }
  };

  return (
    <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
      <HomepageStructuredData />
      {/* <Overline className="!text-xl">This is</Overline> */}
      <H1 className="">Here's a nice headline. It might go to two lines.</H1>
      
      <div className="subheading">
        If you want this could be snappy, or it could be a long thing that no one will ever read.
      </div>
      
      {/* <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-16">
        <div className="aspect-[4/4] -scale-x-100 relative rounded-full overflow-hidden bg-white/30 min-w-[60px] max-w-[100px]">
          <Image
            src="/images/tim.jpg"
            alt="Tim Campbell"
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover h-full w-full"
            priority={true}
            loading="eager"
          />
        </div>
        <div className="flex flex-col max-w-md"> 
          <p className="!mb-2 !leading-8">
            I'm a multi-disciplinary product designer with a builder's mindset. 
            <Link className="inline-block mt-2" href="/who">About me</Link>
          </p>
        </div>
      </div> */}

      <div className="flex items-center justify-between mb-8">
        <H2 className="!mb-0">Featured Work</H2>
      </div>      
      <div className="@container mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {workImages.map((image, index) => (
            <WorkItem
              key={index}
              image={image}
              imageAspectRatio="aspect-[21/11]" // Custom wider aspect ratio for homepage
            />
          ))}
        </div>
      </div>
    </div>
  )
} 