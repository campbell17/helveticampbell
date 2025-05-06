'use client'

import { H1, H2, H3 } from './Typography'
import WorkItem from './WorkItem'
import EssayItem from './EssayItem'
import SubstackPostItem from './SubstackPostItem'
import { useOpenProject } from '../hooks/useOpenProject'
import { useSubstackPosts } from '../hooks/useSubstackPosts'
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
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum", gallery: 1 },
  { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks", projectKey: "Spatial Networks", gallery: 1 },
  { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide for PS4", projectKey: "Divide", gallery: 1 },
  { src: "/images/work/isolated/iso-allinspections-icon-alt.jpg", alt: "Allinspections", projectKey: "Allinspections", gallery: 1 },
  { src: "/images/work/gridded/grid-icons-all.jpg", alt: "Branding", projectKey: "Branding", gallery: 1 },
  { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Personal/Misc", projectKey: "Personal", gallery: 1 },
];

export default function HomeContent() {
  const { openProject } = useOpenProject();
  const { posts, isLoading, error, rawResponse } = useSubstackPosts({
    publicationUrl: config.substackUrl,
    limit: 5
  });
  
  const [showDebug, setShowDebug] = useState(false);

  // Debug output
  useEffect(() => {
    if (posts && posts.length > 0) {
      console.log('Posts available for rendering:', posts.length);
      console.log('First post sample:', posts[0]);
    }

    if (rawResponse) {
      console.log('Raw API response stored:', rawResponse);
    }
  }, [posts, rawResponse]);

  // Handler for image clicks - simplified to only open projects
  const handleImageClick = (index: number) => {
    const clickedImage = workImages[index];
    if (clickedImage.projectKey) {
      openProject(clickedImage.projectKey);
    }
  };

  return (
    <>
      <HomepageStructuredData />
      
      <H1>This is <span className="font-helveticampbell tracking-normal">Helveticampbell</span>.</H1>
      
      <div className="subheading">
        Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up.
      </div>

      <div className="flex items-center justify-between mb-8">
        <Link href="/work" className="group inline-flex items-center hover:text-primary transition-all duration-300">
          <H2 className="!mb-0 transition-all duration-300">Work</H2>
          <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:text-rose-400 group-hover:translate-x-2 transition-all duration-300" />
        </Link>
      </div>      
      <div className="@container mb-16">
        <div className="grid grid-cols-1 gap-4 md:gap-8">
          {workImages.map((image, index) => (
            <WorkItem
              key={index}
              image={image}
              index={index}
              onImageClick={handleImageClick}
              imageAspectRatio="aspect-[21/9] md:aspect-[21/7]" // Custom wider aspect ratio for homepage
            />
          ))}
        </div>
      </div>
      
      {/* Writing Section w/ Substack posts */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <Link href="/writing" className="group inline-flex items-center hover:text-primary transition-colors duration-300">
            <H2 className="!mb-0 transition-all duration-300">Writing</H2>
            <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:text-rose-400 group-hover:translate-x-2 transition-all duration-300" />
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && showDebug && (
          <div className="mb-4 p-4 bg-slate-800/50 rounded-lg overflow-auto max-h-96 text-xs font-mono">
            <h3 className="text-white mb-2">Debug Info</h3>
            <div>
              <p className="text-green-400">Publication URL: {config.substackUrl}</p>
              <p className="text-green-400">Loading: {isLoading ? 'true' : 'false'}</p>
              <p className="text-green-400">Error: {error || 'none'}</p>
              <p className="text-green-400">Posts: {posts?.length || 0}</p>
              {rawResponse && (
                <div className="mt-2">
                  <p className="text-yellow-400">Raw Response:</p>
                  <pre className="text-white mt-2 whitespace-pre-wrap">
                    {JSON.stringify(rawResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm overflow-hidden shadow-md">
          {isLoading ? (
            <div className="p-6 text-center">Loading posts...</div>
          ) : error ? (
            <>
              {/* Show error message in dev mode */}
              {process.env.NODE_ENV === 'development' && (
                <div className="p-6 mb-4 bg-red-500/10 text-red-400 rounded-md">
                  <p>Error loading Substack posts: {error}</p>
                  <p className="text-sm mt-2">Check the console for more details.</p>
                </div>
              )}
              {/* Always fall back to local essays data when there's an error */}
               {essays.map(essay => (
                <EssayItem key={essay.id} essay={essay} />
              ))}
            </>
          ) : posts && posts.length > 0 ? (
            // Show Substack posts if available
            <>
              {process.env.NODE_ENV === 'development' && (
                <div className="p-2 bg-green-500/10 text-green-400 text-xs">
                  {posts.length} posts loaded successfully
                </div>
              )}
              {posts.map(post => (
                <SubstackPostItem key={post.slug} post={post} />
              ))}
            </>
          ) : (
            // Fallback to local essays data if no posts
            <>
              {process.env.NODE_ENV === 'development' && (
                <div className="p-2 bg-yellow-500/10 text-yellow-400 text-xs">
                  No Substack posts found, showing fallback content
                </div>
              )}
              {essays.map(essay => (
                <EssayItem key={essay.id} essay={essay} />
              ))}
            </>
          )}
        </div>
      </div>
      
      {/* About Section */}
      <div className="mt-20 @container">
        <div className="flex items-center justify-between mb-8">
          <Link href="/who" className="group inline-flex items-center hover:text-primary transition-colors duration-300">
            <H2 className="!mb-0 transition-all duration-300">Who</H2>
            <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:text-rose-400 group-hover:translate-x-2 transition-all duration-300" />
          </Link>
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