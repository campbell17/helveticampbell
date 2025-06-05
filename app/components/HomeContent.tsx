'use client'

import { H1, H2, H3, Overline } from './Typography'
import WorkItem from './WorkItem'
import UnifiedContentList from './UnifiedContentList'
import { useOpenProject } from '../hooks/useOpenProject'
import { essays } from '../data/essays'
import { config } from '../config/environment'
import { projectDetails } from '../data/projectDetails'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRightIcon, CalendarDateRangeIcon, CalendarIcon, DocumentTextIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { HomepageStructuredData } from './StructuredDataManager'

// Work images from Sidebar component
const workImages = [
  // Gallery 1: My Work
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum", gallery: 1 },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum Lines and Polygons", gallery: 1 },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum Data", gallery: 1 },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum Report Builder", gallery: 1 },
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
      <H1>I Help Software Teams Design, Build, and Evolve Their Products.</H1>
      
      <div className="subheading">
        Let's make something better together.
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
            priority={false}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col max-w-md"> 
          <p className="!mb-2 !leading-8">
            I'm a multi-disciplinary product designer with a builder's mindset. 
            <Link className="inline-block mt-2" href="/who">About me</Link>
          </p>
        </div>
      </div> */}

      {/* <div className="flex items-center justify-between mb-8">
        <H2 className="!mb-0">Featured Work</H2>
      </div>       */}
      {/* <div className="@container mb-16">
        <div className="h-full flex flex-col md:flex-row gap-6">
          <ul className="w-full h-full flex items-center flex-col gap-2 lg:flex-row mt-12 !mb-0 text-base">
            <li className="w-full h-full">
              <Link href="https://github.com/campbell17" target="_blank" rel="noopener noreferrer" className="rounded-md bg-neutral-400/10 border border-[var(--color-border)] w-full p-6 py-12 pane flex items-center justify-center transition-colors">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <Overline className="!text-lg">Hire me full-time</Overline>
              </Link>
            </li>
            <li className="w-full">
              <Link href="https://linkedin.com/in/campbell17" target="_blank" rel="noopener noreferrer" className="rounded-md bg-neutral-400/10 border border-[var(--color-border)] w-full p-6 py-12 pane flex items-center justify-center transition-colors">
                <CalendarDateRangeIcon className="h-5 w-5 mr-2" />
                <Overline className="!text-lg">Hire me for a project</Overline>
              </Link>
            </li>
            <li className="w-full">
              <Link href="https://linkedin.com/in/campbell17" target="_blank" rel="noopener noreferrer" className="rounded-md bg-neutral-400/10 border border-[var(--color-border)] w-full p-6 py-12 pane flex items-center justify-center transition-colors">
                <HandRaisedIcon className="h-5 w-5 mr-2" />
                <Overline className="!text-lg">Chat With Me</Overline>
              </Link>
            </li>
          </ul>
        </div>
      </div> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workImages.map((image, index) => {
            // Check if this project has a video to determine aspect ratio
            const hasVideo = projectDetails[image.projectKey]?.coverVideo;
            const aspectRatio = hasVideo ? "aspect-[21/12]" : "aspect-[21/12]";
            
            return (
              <WorkItem
                key={index}
                image={image}
                imageAspectRatio={aspectRatio}
              />
            );
          })}
          
          {/* <div className="flex flex-col transition-all duration-[var(--duration-300)]">
            <Overline className="flex items-center !text-lg mb-2">Hire me full-time</Overline>
            <Link 
              href="/work/fulcrum-lines-and-polygons"
              className="container-behavior-primary pane"
            >
              <div className="aspect-[21/12] w-full overflow-hidden">
                <video
                  src="/videos/fulcrum-evolution-hero.mp4"
                  poster="/images/work/full/full-fulcrum-evolution-hero.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
          </div>
          <div className="flex flex-col transition-all duration-[var(--duration-300)]">
            <Overline className="flex items-center !text-lg mb-2">Hire me for a project/contract</Overline>
            <Link 
              href="/work/fulcrum-lines-and-polygons"
              className="container-behavior-primary pane"
            >
              <div className="aspect-[21/12] w-full overflow-hidden">
                <video
                  src="/videos/fulcrum-evolution-hero.mp4"
                  poster="/images/work/full/full-fulcrum-evolution-hero.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
          </div> */}

        {/* </div> */}
      </div>
    </div>
  )
} 