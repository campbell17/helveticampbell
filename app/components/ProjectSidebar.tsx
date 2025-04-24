import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { H1, H2, H3, Overline } from './Typography';
import { MagnifyingGlassPlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Animation timing constants
const ANIMATION_TIMING = {
  exit: {
    duration: 0.3,
    ease: "easeOut"
  },
  cleanup: 350, // Slightly longer than exit duration to ensure animations complete
  enter: {
    duration: 0.2,
    ease: "easeOut"
  },
};

// Separate timing for PreTransition component
const PRE_TRANSITION_TIMING = {
  enter: {
    duration: 0.15,
    ease: "easeInOut"
  },
  exit: {
    duration: 0.15,
    ease: "easeOut",
    delay: 0.25 // Delay exit until main sidebar is closed
  }
};

// Separate timing for main sidebar component
const SIDEBAR_TIMING = {
  enter: {
    duration: 0.75,
    ease: [
      [0.25, 0.1, 0.25, 1], // initial movement
      [0.03, -0.00003, 0.01, 1], // slower bounce
      [1, 0, 0.01, 1] // modified ease for dramatic finish
    ],
    times: [0, 0.2, 0.4, 1]
  },
  exit: {
    duration: 0.3,
    ease: "easeOut"
  },
};

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
  gallery?: number;
  aspectRatio?: string;
}

interface CalloutData {
  overline: string;
  title: string;
  description: string;
  stats: {
    value: string;
    label: string;
  }[];
}

interface VignetteData {
  overline: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

// Define content block types for a more flexible content structure
type ContentBlockType = 'text' | 'callout' | 'vignette' | 'image-grid' | 'full-width-image';

interface ContentBlock {
  type: ContentBlockType;
  id: string;
  data: any; // Will be typed based on the block type
}

interface TextBlock extends ContentBlock {
  type: 'text';
  data: {
    content: React.ReactNode;
  };
}

interface CalloutBlock extends ContentBlock {
  type: 'callout';
  data: CalloutData;
}

interface VignetteBlock extends ContentBlock {
  type: 'vignette';
  data: VignetteData;
}

interface ImageGridBlock extends ContentBlock {
  type: 'image-grid';
  data: {
    images: ImageData[];
    columns?: number;
  };
}

interface FullWidthImageBlock extends ContentBlock {
  type: 'full-width-image';
  data: {
    image: ImageData;
  };
}

interface ProjectDetails {
  title: string;
  description?: string;
  content?: React.ReactNode;
  images?: ImageData[];
}

// Project data from the original Sidebar component
const projectDetails: Record<string, ProjectDetails> = {
  "Fulcrum": {
    title: "Fulcrum: Designing a Field Operations Platform",
    description: "As the sole designer for Fulcrum from its early stages, I led the product's visual and user experience evolution over several years, helping build it into a comprehensive enterprise field operations platform used by thousands of organizations worldwide.",
    content: (
      <>
        {/* Stats Callout */}
        <div className="w-full bg-indigo-50 py-12 px-6 md:px-12 lg:px-16 xl:px-20 mb-8 border-y border-indigo-100">
          <div className="max-w-7xl mx-auto">
            <Overline>Company Overview</Overline>
            <H2>From Startup to Enterprise Platform</H2>
            <p className="text-lg text-indigo-900/80 max-w-3xl mb-8">
              Fulcrum evolved from a small Florida startup to a global leader in field operations software, serving thousands of organizations across diverse industries.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                <p className="text-4xl font-bold text-indigo-600 mb-1">190+</p>
                <p className="text-sm text-indigo-900/70">Countries with active users</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                <p className="text-4xl font-bold text-indigo-600 mb-1">3000+</p>
                <p className="text-sm text-indigo-900/70">Organizations worldwide</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                <p className="text-4xl font-bold text-indigo-600 mb-1">$12M+</p>
                <p className="text-sm text-indigo-900/70">Annual recurring revenue</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                <p className="text-4xl font-bold text-indigo-600 mb-1">60+</p>
                <p className="text-sm text-indigo-900/70">Team members</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Part 1 */}
        <div className="p-20">
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="project-content">
              <H2>Major Design Evolutions</H2>

              <H3>Complete Brand Redesign (2019)</H3>
              <p>After 8 years with the original logo, I led a complete brand refresh that unified Fulcrum (product) and Spatial Networks (company) under a consistent design language. This included redesigning the logo, website, and all marketing materials to create a cohesive ecosystem as the company expanded its product offerings.</p>
              <p><em>Reference: 2019-3-28-fulcrum-new-look.md</em></p>
              <p>The redesigned website featured improved navigation, stronger messaging, and more intuitive user flows, creating clearer paths for both prospective customers and existing users.</p>

              <H3>Figma Design System Implementation (2019)</H3>
              <p>I implemented Figma as our primary UI/UX design tool, developing a structured design and prototyping workflow that significantly improved our ability to design, test, and communicate with our development team.</p>
              <p><em>Reference: 2019-02-19-designing-with-figma.md</em></p>
              <p>This included creating reusable design components and establishing a collaborative design process that accelerated our product development lifecycle.</p>
            </div>
          </div>
        </div>
        
        {/* Vignette Section */}
        <div className="w-full bg-slate-100 mb-8 border-y border-slate-200">
          <div className="grid md:grid-cols-2 items-center">
            {/* Left column - Text content */}
            <div className="p-10 md:p-16 lg:p-20">
              <Overline>Documentation & Training</Overline>
              <H3>Teaching Complex Concepts Simply</H3>
              <p className="text-base text-slate-700 max-w-xl mt-4">
                I led the creation of Fulcrum's documentation and training materials, translating technical capabilities into clear, accessible guides. The Fulcrum Field Guide became an essential resource for users, combining practical tutorials with visual examples to help organizations maximize their investment in the platform.
              </p>
            </div>
            
            {/* Right column - Full-bleed image */}
            <div className="relative h-60 md:h-full min-h-[320px]">
              <Image 
                src="/images/work/full/full-fulcrum-book-data.jpg"
                alt="Fulcrum Book Data Page"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        
        {/* Main Content Part 2 */}
        <div className="p-20 pb-28">
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="project-content">
              <H3>New Editor Interface (2017)</H3>
              <p>I led the complete rebuild of our data viewing and editing tool, focusing on speed, performance, and usability. The new interface introduced advanced filtering and sorting capabilities, customizable column displays, and significant performance improvements for handling large datasets.</p>
              <p><em>Reference: 2017-04-18-introducing-the-new-editor.md</em></p>

              <H3>Multilingual Support (2014)</H3>
              <p>I designed the localization framework for Fulcrum, enabling the mobile application to function in multiple languages. This significant user experience enhancement made the platform accessible to international users, supporting Spanish, French, and Portuguese interfaces with a design that could scale to additional languages.</p>
              <p><em>Reference: 2014-03-04-fulcrum-mobile-in-spanish-french-portuguese.md</em></p>
            </div>
          </div>
        </div>
        
        {/* Image Grid */}
        <div className="px-20 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md shadow-slate-900/20">
              <div className="relative" style={{ aspectRatio: '100/60' }}>
                <Image 
                  src="/images/work/browser/browser-fulcrum-modern-builder-empty.jpg"
                  alt="Fulcrum Modern Builder Empty"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md shadow-slate-900/20">
              <div className="relative" style={{ aspectRatio: '100/60' }}>
                <Image 
                  src="/images/work/browser/browser-fulcrum-modern-builder-selected.jpg"
                  alt="Fulcrum Modern Builder Selected"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Part 3 */}
        <div className="p-20 pb-28">
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="project-content">
              <H2>Key Feature Additions</H2>

              <H3>Interactive Offline Maps (2014)</H3>
              <p>Designed the user experience for Fulcrum's interactive offline map capabilities, enhancing the MBTiles support with UTFGrid integration. This allowed users to access clickable offline map features with attribute viewing, significantly improving field usability in areas with poor connectivity.</p>
              <p><em>Reference: 2014-01-16-interactive-offline-maps.md</em></p>

              <H3>Photo Annotations (2018)</H3>
              <p>Designed the interface for our custom-built image annotation engine, enabling users to sketch graphics and add text to photos within the app. The intuitive mobile-first design simplified field documentation and communication.</p>
              <p><em>Reference: 2018-12-13-introducing-photo-annotations.md</em></p>
            </div>
          </div>
        </div>
        
        {/* Full Width Image
        <div className="w-full mb-8">
          <div className="relative cursor-default" style={{ aspectRatio: '100/64', minHeight: '240px' }}>
            <Image 
              src="/images/work/full/full-fulcrum-handout.jpg"
              alt="Fulcrum Handout"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              className="w-full"
            />
          </div>
        </div> */}
        
        {/* Features Section */}
        <div className="p-12 py-20">
          <div className="max-w-none mb-12 text-center">
            <H2>Key Elements</H2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Our comprehensive redesign addressed multiple aspects of the Fulcrum experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-50 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Responsive Design</h3>
              </div>
              <p className="text-slate-700">
                Implemented a fully responsive interface that works across desktop, tablet, and mobile devices, ensuring a consistent experience for field workers.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-slate-50 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Intuitive Controls</h3>
              </div>
              <p className="text-slate-700">
                Redesigned UI controls and workflows to reduce training time and increase efficiency for data collection teams working in challenging environments.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-slate-50 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Data Visualization</h3>
              </div>
              <p className="text-slate-700">
                Enhanced data visualization tools that transform complex field data into actionable insights through interactive charts, maps, and dashboards.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="p-6 rounded-xl bg-slate-50 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Integration Capabilities</h3>
              </div>
              <p className="text-slate-700">
                Developed comprehensive API connections and workflow automations to seamlessly integrate with enterprise systems and third-party applications.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-slate-50 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Enterprise Security</h3>
              </div>
              <p className="text-slate-700">
                Implemented industry-leading security protocols to protect sensitive field data, including encryption, role-based access controls, and compliance features.
              </p>
            </div>
          </div>
        </div>
                
        {/* Gallery Section */}
        <div className="p-20 pt-8 pb-20">
          <div className="max-w-none">
            <div className="mb-12">
              <H2>Project Gallery</H2>
              <p className="text-lg text-slate-700 max-w-3xl">
                A comprehensive collection of design artifacts from the Fulcrum project, showcasing the breadth of work across branding, web, mobile, and marketing materials.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* First row */}
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src="/images/work/isolated/iso-fulcrum-icon-og.jpg"
                    alt="Fulcrum Icon OG"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src="/images/work/isolated/iso-fulcrum-logo.jpg"
                    alt="Fulcrum Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src="/images/work/isolated/iso-fulcrum-logo-og.jpg"
                    alt="Fulcrum Logo OG"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src="/images/work/browser/browser-fulcrum-modern-builder-empty.jpg"
                    alt="Fulcrum Modern Builder Empty"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src="/images/work/browser/browser-fulcrum-modern-builder-selected.jpg"
                    alt="Fulcrum Modern Builder Selected"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src="/images/work/browser/browser-fulcrum-modern-apps-empty.jpg"
                    alt="Fulcrum Modern Apps Empty"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Second row with full width */}
              <div className="md:col-span-2 lg:col-span-3 cursor-default relative rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '21/9' }}>
                  <Image 
                    src="/images/work/isolated/iso-fulcrum-packaging-holidaybox.jpg"
                    alt="Fulcrum Holiday Box"
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src="/images/work/full/full-fulcrum-book-cover.jpg"
                    alt="Fulcrum Book Cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src="/images/work/full/full-fulcrum-book-fundamentals.jpg"
                    alt="Fulcrum Book Fundamentals"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src="/images/work/full/full-fulcrum-book-data.jpg"
                    alt="Fulcrum Book Data"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    // These images are used both in the gallery grid above and for the lightbox
    images: [
      { src: "/images/work/isolated/iso-fulcrum-icon-og.jpg", alt: "Fulcrum Icon OG" },
      { src: "/images/work/isolated/iso-fulcrum-logo.jpg", alt: "Fulcrum Logo" },
      { src: "/images/work/isolated/iso-fulcrum-logo-og.jpg", alt: "Fulcrum Logo OG" },
      { src: "/images/work/isolated/iso-fulcrum-logo-live.jpg", alt: "Fulcrum Logo Live" },
      { src: "/images/work/browser/browser-fulcrum-modern-builder-empty.jpg", alt: "Fulcrum Modern Builder Empty", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-builder-selected.jpg", alt: "Fulcrum Modern Builder Selected", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-apps-empty.jpg", alt: "Fulcrum Modern Apps Empty", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-apps-context.jpg", alt: "Fulcrum Modern Apps Context", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-apps-list.jpg", alt: "Fulcrum Modern Apps List", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-dataviewer.jpg", alt: "Fulcrum Modern Dataviewer", aspectRatio: "100/60" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-1.jpg", alt: "Fulcrum CW Office 1" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-2.jpg", alt: "Fulcrum CW Office 2" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-1.jpg", alt: "Fulcrum CW Onsite FEMA 1" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-2.jpg", alt: "Fulcrum CW Onsite FEMA 2" },
      { src: "/images/work/full/full-fulcrum-brochure-mini-1.jpg", alt: "Fulcrum Brochure Mini 1" },
      { src: "/images/work/full/full-fulcrum-brochure-mini-2.jpg", alt: "Fulcrum Brochure Mini 2" },
      { src: "/images/work/full/full-fulcrum-brochure-mini-mockup.jpg", alt: "Fulcrum Brochure Mini Mockup", fullWidth: true },
      { src: "/images/work/full/full-fulcrum-ad-2.jpg", alt: "Fulcrum Ad 2" },
      { src: "/images/work/full/full-fulcrum-book-cover.jpg", alt: "Fulcrum Book Cover" },
      { src: "/images/work/full/full-fulcrum-book-fundamentals.jpg", alt: "Fulcrum Book Fundamentals" },
      { src: "/images/work/full/full-fulcrum-book-data.jpg", alt: "Fulcrum Book Data" },
      { src: "/images/work/full/full-fulcrum-handout.jpg", alt: "Fulcrum Handout", fullWidth: true, aspectRatio: "100/64" },
      { src: "/images/work/gridded/grid-fulcrum-buildericons-v3.jpg", alt: "Fulcrum Builder Icons v3" },
      { src: "/images/work/isolated/iso-fulcrum-package.jpg", alt: "Fulcrum Package" },
      { src: "/images/work/isolated/iso-fulcrum-packaging-holidaybox.jpg", alt: "Fulcrum Holiday Box", fullWidth: true, aspectRatio: "100/50" },
      { src: "/images/work/isolated/iso-fulcrum-pullup-1.jpg", alt: "Fulcrum Pullup 1" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-tradeshow.jpg", alt: "Fulcrum CW Tradeshow" },
      { src: "/images/work/isolated/iso-fulcrum-sticker-1.jpg", alt: "Fulcrum Sticker 1" },
      { src: "/images/work/isolated/iso-fulcrum-sticker-2.jpg", alt: "Fulcrum Sticker 2" },
      { src: "/images/work/isolated/iso-fulcrum-button.jpg", alt: "Fulcrum Button" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-early-swag.jpg", alt: "Fulcrum CW Early Swag" },
    ]
  },
  "Spatial Networks": {
    title: "Spatial Networks",
    description: "Our parent company and Fulcrum's first customer.",
    content: (
      <>
        <p>
          Fourteen years ago, a geospatial technology company named Spatial Networks hired me as their 12th employee and first designer. They needed... everything. My title was UI Designer, but I did it all, online and in print. But we&apos;ll come back to that.
        </p>

        <p>
          Before that, I founded a design agency called Whiteshark Creations with an engineering colleague. We worked with some great clients in our first year, but I realized agency life wasn&apos;t my calling and I left for other design pursuits.
        </p>

        <p>
          Prior to going solo, my design career began its infancy, when Macromedia was still a household name and Web 2.0 was hitting it&apos;s bubbly prime. I started as a web designer and this is where I first clapped eyes on naked HTML & CSS - No WYSIWYG editor to hide all the crimes. We had dedicated developers to write all the code, so my exposure and practice only came in fits and starts. I wouldn&apos;t feel the power of `git push origin master` until my first year working at Spatial Networks.
        </p>

        <p>
          When you&apos;re the only designer for a company with big ambitions, becoming a generalist is a matter of survival. I have sketchbooks with pages chock full of logos, mobile app screens, mobile app icons, and trade show pull-up banners for offshoots of ideas that didn&apos;t (and never would) exist.
        </p>

        <p>
          I loved it.
        </p>

        <p>
          But what I loved most was working on the web apps and the marketing websites. Since we were so small, everyone had to be trusted to make what they were doing count without much (or any) oversight. This was the first time I was encouraged to simply address the customer problem and build. There was no time for hand-wringing. 
        </p>

        <p>
          We took a few cracks at different product ideas. Allinspections, the product I was actually hired to help create, couldn&apos;t find its niche and had to be sunsetted after 18 months. The CEO called me into his office. I was proud of the work we did, but when he told me we had to shut it down, I worried that would be my final meeting at Spatial Networks. Instead, he offered me the opportunity to head up something new: Fulcrum.
        </p>

        <p>
          Since 2012, this has been the flagship product of Spatial Networks and my number one source of design activity. Unlike prior attempts, Fulcrum struck just the right balance of utility, ease of use, customizability, and extensibility. We were still super lean back then, but now we had people counting on our product. It felt so good to talk to customers about their issues and ideas and be able to mesh them with ours to give their companies leverage just from using our software.
        </p>

        <p>
          Since then, we grew every month, steady as a rock. We found product market fit. Our founders understood the importance of keeping the team tight. People who didn&apos;t perform didn&apos;t last. I was responsible the strategy and design for the marketing website, the web app, and the mobile app, all while continuing to support the corporate design materials and marketing for our parent company. It&apos;s wild to compare how we operate now with what we achieved back then with so little, but what I learned about the importance of shipping fast to keep the feedback loop tight was invaluable.
        </p>

      </>
    ),
    images: [
      { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks Icon" },
      { src: "/images/work/isolated/iso-sni-logo.jpg", alt: "Spatial Networks Logo" },
      { src: "/images/work/browser/browser-sni-2011.jpg", alt: "Spatial Networks 2011 Site", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2013.jpg", alt: "Spatial Networks 2013 Site", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2017.jpg", alt: "Spatial Networks 2017 Site", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2019-1.jpg", alt: "Spatial Networks 2019 Site 1", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2019-3.jpg", alt: "Spatial Networks 2019 Site 3", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2019-4.jpg", alt: "Spatial Networks 2019 Site 4", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2019-5.jpg", alt: "Spatial Networks 2019 Site 5", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-foresight-1.jpg", alt: "Spatial Networks Foresight", aspectRatio: "1440/1261" },
      { src: "/images/work/isolated/iso-sni-icon-fall.jpg", alt: "Spatial Networks Icon fall" },
      { src: "/images/work/isolated/iso-sni-icon-fall-tshirt.jpg", alt: "Spatial Networks Icon fall tshirt" },
      { src: "/images/work/full/full-sni-ad-1.jpg", alt: "Spatial Networks Ad 1" },
      { src: "/images/work/full/full-sni-ad-2.jpg", alt: "Spatial Networks Ad 2" },
      { src: "/images/work/isolated/iso-sni-tradeshow-booth.jpg", alt: "Spatial Networks Tradeshow booth" },
      { src: "/images/work/snapshots/snapshot-sni-tradeshow-1.jpg", alt: "Spatial Networks Tradeshow" },
    ]
  },
  "Allinspections": {
    title: "Allinspections",
    description: "Precursor to Fulcrum and my first product at Spatial Networks.",
    content: (
      <>
        <p>
          Fourteen years ago, a geospatial technology company named Spatial Networks hired me as their 12th employee and first designer. They needed... everything. My title was UI Designer, but I did it all, online and in print. But we&apos;ll come back to that.
        </p>

        <p>
          Before that, I founded a design agency called Whiteshark Creations with an engineering colleague. We worked with some great clients in our first year, but I realized agency life wasn&apos;t my calling and I left for other design pursuits.
        </p>

        <p>
          Prior to going solo, my design career began its infancy, when Macromedia was still a household name and Web 2.0 was hitting it&apos;s bubbly prime. I started as a web designer and this is where I first clapped eyes on naked HTML & CSS - No WYSIWYG editor to hide all the crimes. We had dedicated developers to write all the code, so my exposure and practice only came in fits and starts. I wouldn&apos;t feel the power of `git push origin master` until my first year working at Spatial Networks.
        </p>

        <p>
          When you&apos;re the only designer for a company with big ambitions, becoming a generalist is a matter of survival. I have sketchbooks with pages chock full of logos, mobile app screens, mobile app icons, and trade show pull-up banners for offshoots of ideas that didn&apos;t (and never would) exist.
        </p>

        <p>
          I loved it.
        </p>

        <p>
          But what I loved most was working on the web apps and the marketing websites. Since we were so small, everyone had to be trusted to make what they were doing count without much (or any) oversight. This was the first time I was encouraged to simply address the customer problem and build. There was no time for hand-wringing. 
        </p>

        <p>
          We took a few cracks at different product ideas. Allinspections, the product I was actually hired to help create, couldn&apos;t find its niche and had to be sunsetted after 18 months. The CEO called me into his office. I was proud of the work we did, but when he told me we had to shut it down, I worried that would be my final meeting at Spatial Networks. Instead, he offered me the opportunity to head up something new: Fulcrum.
        </p>

        <p>
          Since 2012, this has been the flagship product of Spatial Networks and my number one source of design activity. Unlike prior attempts, Fulcrum struck just the right balance of utility, ease of use, customizability, and extensibility. We were still super lean back then, but now we had people counting on our product. It felt so good to talk to customers about their issues and ideas and be able to mesh them with ours to give their companies leverage just from using our software.
        </p>

        <p>
          Since then, we grew every month, steady as a rock. We found product market fit. Our founders understood the importance of keeping the team tight. People who didn&apos;t perform didn&apos;t last. I was responsible the strategy and design for the marketing website, the web app, and the mobile app, all while continuing to support the corporate design materials and marketing for our parent company. It&apos;s wild to compare how we operate now with what we achieved back then with so little, but what I learned about the importance of shipping fast to keep the feedback loop tight was invaluable.
        </p>

      </>
    ),    
    images: [
      { src: "/images/work/isolated/iso-allinspections-icon.jpg", alt: "Allinspections Icon" },
      { src: "/images/work/isolated/iso-allinspections-logo.jpg", alt: "Allinspections Logo" },
      { src: "/images/work/isolated/iso-allinspections-pullup-1.jpg", alt: "Allinspections Pullup 1", fullWidth: true },
      { src: "/images/work/isolated/iso-allinspections-pullup-2-alt.jpg", alt: "Allinspections Pullup 2 Alt", fullWidth: true },
      { src: "/images/work/isolated/iso-allinspections-pullup-3.jpg", alt: "Allinspections Pullup 3", fullWidth: true },
      { src: "/images/work/browser/browser-allinspections-0.jpg", alt: "Allinspections Site 1", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-1.jpg", alt: "Allinspections Site 2", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-2.jpg", alt: "Allinspections Site 3", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-3.jpg", alt: "Allinspections Site 4", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-1.jpg", alt: "Allinspections Site 5", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-2.jpg", alt: "Allinspections Site 6", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-3.jpg", alt: "Allinspections Site 7", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-4.jpg", alt: "Allinspections Site 8", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-5.jpg", alt: "Allinspections Site 9", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-5.jpg", alt: "Allinspections Site 11", aspectRatio: "1440/1261" },
      { src: "/images/work/full/full-allinspections-brochure.jpg", alt: "Allinspections Brochure", fullWidth: true },
      { src: "/images/work/full/full-allinspections-double-ad.jpg", alt: "Allinspections Double Ad", fullWidth: true },
      { src: "/images/work/full/full-allinspections-card-1.jpg", alt: "Allinspections Card 1" },
      { src: "/images/work/full/full-allinspections-card-2.jpg", alt: "Allinspections Card 2" }
    ]
  },
  "Divide": {
    title: "Divide",
    description: "Branding, UI, game menus, HUD, icons, AR assets, world-building design.",
    content: (
      <>
        <p>
          Fourteen years ago, a geospatial technology company named Spatial Networks hired me as their 12th employee and first designer. They needed... everything. My title was UI Designer, but I did it all, online and in print. But we&apos;ll come back to that.
        </p>

        <p>
          Before that, I founded a design agency called Whiteshark Creations with an engineering colleague. We worked with some great clients in our first year, but I realized agency life wasn&apos;t my calling and I left for other design pursuits.
        </p>

        <p>
          Prior to going solo, my design career began its infancy, when Macromedia was still a household name and Web 2.0 was hitting it&apos;s bubbly prime. I started as a web designer and this is where I first clapped eyes on naked HTML & CSS - No WYSIWYG editor to hide all the crimes. We had dedicated developers to write all the code, so my exposure and practice only came in fits and starts. I wouldn&apos;t feel the power of `git push origin master` until my first year working at Spatial Networks.
        </p>

        <p>
          When you&apos;re the only designer for a company with big ambitions, becoming a generalist is a matter of survival. I have sketchbooks with pages chock full of logos, mobile app screens, mobile app icons, and trade show pull-up banners for offshoots of ideas that didn&apos;t (and never would) exist.
        </p>

        <p>
          I loved it.
        </p>

        <p>
          But what I loved most was working on the web apps and the marketing websites. Since we were so small, everyone had to be trusted to make what they were doing count without much (or any) oversight. This was the first time I was encouraged to simply address the customer problem and build. There was no time for hand-wringing. 
        </p>

        <p>
          We took a few cracks at different product ideas. Allinspections, the product I was actually hired to help create, couldn&apos;t find its niche and had to be sunsetted after 18 months. The CEO called me into his office. I was proud of the work we did, but when he told me we had to shut it down, I worried that would be my final meeting at Spatial Networks. Instead, he offered me the opportunity to head up something new: Fulcrum.
        </p>

        <p>
          Since 2012, this has been the flagship product of Spatial Networks and my number one source of design activity. Unlike prior attempts, Fulcrum struck just the right balance of utility, ease of use, customizability, and extensibility. We were still super lean back then, but now we had people counting on our product. It felt so good to talk to customers about their issues and ideas and be able to mesh them with ours to give their companies leverage just from using our software.
        </p>

        <p>
          Since then, we grew every month, steady as a rock. We found product market fit. Our founders understood the importance of keeping the team tight. People who didn&apos;t perform didn&apos;t last. I was responsible the strategy and design for the marketing website, the web app, and the mobile app, all while continuing to support the corporate design materials and marketing for our parent company. It&apos;s wild to compare how we operate now with what we achieved back then with so little, but what I learned about the importance of shipping fast to keep the feedback loop tight was invaluable.
        </p>

      </>
    ),    
    images: [
      { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide Logo" },
      { src: "/images/work/isolated/iso-divide-vestige-sticker.jpg", alt: "Divide Vestige Sticker" },
      { src: "/images/work/full/full-divide-ingame-world-1.jpg", alt: "Divide In-Game World 1", fullWidth: true, aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-world-2.jpg", alt: "Divide In-Game World 2", fullWidth: true, aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-world-3.jpg", alt: "Divide In-Game World 3", fullWidth: true, aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ps4.jpg", alt: "Divide PS4" },
      { src: "/images/work/gridded/grid-divide-icons.jpg", alt: "Divide Icons" },
      { src: "/images/work/full/full-divide-ingame-UI-1.jpg", alt: "Divide In-Game UI 1", fullWidth: true, aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-UI-2.jpg", alt: "Divide In-Game UI 2", fullWidth: true, aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-codex-1.jpg", alt: "Divide In-Game Codex 1", fullWidth: true, aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-codex-2.jpg", alt: "Divide In-Game Codex 2", fullWidth: true, aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-codex-3.jpg", alt: "Divide In-Game Codex 3", fullWidth: true, aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-codex-4.jpg", alt: "Divide In-Game Codex 4", fullWidth: true, aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-brochure-1.jpg", alt: "Divide Brochure 1", fullWidth: true },
      { src: "/images/work/full/full-divide-brochure-2.jpg", alt: "Divide Brochure 2", fullWidth: true },
      { src: "/images/work/full/full-divide-soundtrack.jpg", alt: "Divide Soundtrack" },
      { src: "/images/work/full/full-divide-soundtrack-deluxe.jpg", alt: "Divide Soundtrack Deluxe" },
      { src: "/images/work/full/full-divide-soundtrack-ep.jpg", alt: "Divide Soundtrack EP" },
      { src: "/images/work/snapshots/snapshot-divide-recording-1.jpg", alt: "Divide Recording Session" }
    ]
  },
  "Branding": {
    title: "Branding",
    description: "Various logos and identity work.",
    content: (
      <>
        <p>
          Fourteen years ago, a geospatial technology company named Spatial Networks hired me as their 12th employee and first designer. They needed... everything. My title was UI Designer, but I did it all, online and in print. But we&apos;ll come back to that.
        </p>

        <p>
          Before that, I founded a design agency called Whiteshark Creations with an engineering colleague. We worked with some great clients in our first year, but I realized agency life wasn&apos;t my calling and I left for other design pursuits.
        </p>

        <p>
          Prior to going solo, my design career began its infancy, when Macromedia was still a household name and Web 2.0 was hitting it&apos;s bubbly prime. I started as a web designer and this is where I first clapped eyes on naked HTML & CSS - No WYSIWYG editor to hide all the crimes. We had dedicated developers to write all the code, so my exposure and practice only came in fits and starts. I wouldn&apos;t feel the power of `git push origin master` until my first year working at Spatial Networks.
        </p>

        <p>
          When you&apos;re the only designer for a company with big ambitions, becoming a generalist is a matter of survival. I have sketchbooks with pages chock full of logos, mobile app screens, mobile app icons, and trade show pull-up banners for offshoots of ideas that didn&apos;t (and never would) exist.
        </p>

        <p>
          I loved it.
        </p>

        <p>
          But what I loved most was working on the web apps and the marketing websites. Since we were so small, everyone had to be trusted to make what they were doing count without much (or any) oversight. This was the first time I was encouraged to simply address the customer problem and build. There was no time for hand-wringing. 
        </p>

        <p>
          We took a few cracks at different product ideas. Allinspections, the product I was actually hired to help create, couldn&apos;t find its niche and had to be sunsetted after 18 months. The CEO called me into his office. I was proud of the work we did, but when he told me we had to shut it down, I worried that would be my final meeting at Spatial Networks. Instead, he offered me the opportunity to head up something new: Fulcrum.
        </p>

        <p>
          Since 2012, this has been the flagship product of Spatial Networks and my number one source of design activity. Unlike prior attempts, Fulcrum struck just the right balance of utility, ease of use, customizability, and extensibility. We were still super lean back then, but now we had people counting on our product. It felt so good to talk to customers about their issues and ideas and be able to mesh them with ours to give their companies leverage just from using our software.
        </p>

        <p>
          Since then, we grew every month, steady as a rock. We found product market fit. Our founders understood the importance of keeping the team tight. People who didn&apos;t perform didn&apos;t last. I was responsible the strategy and design for the marketing website, the web app, and the mobile app, all while continuing to support the corporate design materials and marketing for our parent company. It&apos;s wild to compare how we operate now with what we achieved back then with so little, but what I learned about the importance of shipping fast to keep the feedback loop tight was invaluable.
        </p>

      </>
    ),    
    images: [
      { src: "/images/work/isolated/iso-allinspections-icon.jpg", alt: "Allinspections Icon" },
      { src: "/images/work/isolated/iso-allinspections-logo.jpg", alt: "Allinspections Logo" },
      { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks Icon" },
      { src: "/images/work/isolated/iso-sni-logo.jpg", alt: "Spatial Networks Logo" },
      { src: "/images/work/isolated/iso-foresight-icon.jpg", alt: "Foresight Icon" },
      { src: "/images/work/isolated/iso-foresight-logo.jpg", alt: "Foresight Logo" },
      { src: "/images/work/isolated/iso-fulcrum-icon.jpg", alt: "Fulcrum Icon" },
      { src: "/images/work/isolated/iso-fulcrum-logo.jpg", alt: "Fulcrum Logo" },
      { src: "/images/work/isolated/iso-fulcrum-icon-og.jpg", alt: "Fulcrum Icon OG" },
      { src: "/images/work/isolated/iso-fulcrum-logo-og.jpg", alt: "Fulcrum Logo OG" },
      { src: "/images/work/isolated/iso-fulcrum-logo-live.jpg", alt: "Fulcrum Logo Live" },
      { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide Logo" },
      { src: "/images/work/isolated/iso-liminallab-icon.jpg", alt: "Liminal Lab mark" },
      { src: "/images/work/isolated/iso-liminallab-logo.jpg", alt: "Liminal Lab Logo" },
      { src: "/images/work/isolated/iso-cercana-icon.jpg", alt: "Cercana Systems mark" },
      { src: "/images/work/isolated/iso-cercana-logo.jpg", alt: "Cercana Systems Logo" },
      { src: "/images/work/isolated/iso-exploding-tuba-icon.jpg", alt: "Exploding Tuba Studios mark" },
      { src: "/images/work/isolated/iso-exploding-tuba-logo.jpg", alt: "Exploding Tuba Studios Logo" },      
    ]
  },
  "Personal": {
    title: "Personal",
    description: "Drawing, painting, photography, creative side projects, and the like.",
    content: (
      <>
        <p>
          Fourteen years ago, a geospatial technology company named Spatial Networks hired me as their 12th employee and first designer. They needed... everything. My title was UI Designer, but I did it all, online and in print. But we&apos;ll come back to that.
        </p>

        <p>
          Before that, I founded a design agency called Whiteshark Creations with an engineering colleague. We worked with some great clients in our first year, but I realized agency life wasn&apos;t my calling and I left for other design pursuits.
        </p>

        <p>
          Prior to going solo, my design career began its infancy, when Macromedia was still a household name and Web 2.0 was hitting it&apos;s bubbly prime. I started as a web designer and this is where I first clapped eyes on naked HTML & CSS - No WYSIWYG editor to hide all the crimes. We had dedicated developers to write all the code, so my exposure and practice only came in fits and starts. I wouldn&apos;t feel the power of `git push origin master` until my first year working at Spatial Networks.
        </p>

        <p>
          When you&apos;re the only designer for a company with big ambitions, becoming a generalist is a matter of survival. I have sketchbooks with pages chock full of logos, mobile app screens, mobile app icons, and trade show pull-up banners for offshoots of ideas that didn&apos;t (and never would) exist.
        </p>

        <p>
          I loved it.
        </p>

        <p>
          But what I loved most was working on the web apps and the marketing websites. Since we were so small, everyone had to be trusted to make what they were doing count without much (or any) oversight. This was the first time I was encouraged to simply address the customer problem and build. There was no time for hand-wringing. 
        </p>

        <p>
          We took a few cracks at different product ideas. Allinspections, the product I was actually hired to help create, couldn&apos;t find its niche and had to be sunsetted after 18 months. The CEO called me into his office. I was proud of the work we did, but when he told me we had to shut it down, I worried that would be my final meeting at Spatial Networks. Instead, he offered me the opportunity to head up something new: Fulcrum.
        </p>

        <p>
          Since 2012, this has been the flagship product of Spatial Networks and my number one source of design activity. Unlike prior attempts, Fulcrum struck just the right balance of utility, ease of use, customizability, and extensibility. We were still super lean back then, but now we had people counting on our product. It felt so good to talk to customers about their issues and ideas and be able to mesh them with ours to give their companies leverage just from using our software.
        </p>

        <p>
          Since then, we grew every month, steady as a rock. We found product market fit. Our founders understood the importance of keeping the team tight. People who didn&apos;t perform didn&apos;t last. I was responsible the strategy and design for the marketing website, the web app, and the mobile app, all while continuing to support the corporate design materials and marketing for our parent company. It&apos;s wild to compare how we operate now with what we achieved back then with so little, but what I learned about the importance of shipping fast to keep the feedback loop tight was invaluable.
        </p>

      </>
    ),    
    images: [
      { src: "/images/work/full/full-personal-painting-1.jpg", alt: "Painting 1" },
      { src: "/images/work/full/full-personal-painting-2.jpg", alt: "Painting 2" },
      { src: "/images/work/full/full-personal-painting-3.jpg", alt: "Painting 3" },
      { src: "/images/work/full/full-personal-painting-4.jpg", alt: "Painting 4" },
      { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Drawing 1" },
      { src: "/images/work/full/full-personal-drawing-2.jpg", alt: "Drawing 2" },
      { src: "/images/work/full/full-personal-drawing-3.jpg", alt: "Drawing 3" },
      { src: "/images/work/full/full-personal-drawing-4.jpg", alt: "Drawing 4" },
      { src: "/images/work/full/full-personal-photo-12.png", alt: "Photo 12", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-13.png", alt: "Photo 13", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-16.jpg", alt: "Photo 16", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-19.png", alt: "Photo 19", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-21.jpg", alt: "Photo 21", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-22.jpg", alt: "Photo 22", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-23.png", alt: "Photo 23", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-25.jpg", alt: "Photo 25", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-31.jpg", alt: "Photo 31", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-32.png", alt: "Photo 32", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-33.png", alt: "Photo 33", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-35.jpg", alt: "Photo 35", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-36.png", alt: "Photo 36", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-41.png", alt: "Photo 41", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-42.png", alt: "Photo 42", aspectRatio: "3/2" }, 
      { src: "/images/work/full/full-personal-photo-44.png", alt: "Photo 44", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-45.png", alt: "Photo 45", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-46.png", alt: "Photo 46", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-47.png", alt: "Photo 47", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-51.png", alt: "Photo 51", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-54.jpg", alt: "Photo 54", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-58.png", alt: "Photo 58", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-59.png", alt: "Photo 59", aspectRatio: "3/2" },
      { src: "/images/work/full/full-personal-photo-64.png", alt: "Photo 64", aspectRatio: "3/2" },
      { src: "/images/work/isolated/iso-personal-murphys-garage.jpg", alt: "Murphy's Garage sticker" },
      { src: "/images/work/isolated/iso-personal-helmet-concept.jpg", alt: "Helmet design concept" },
    ]
  },
};

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projectKey: string | null;
  currentGallery: string | null;
  setCurrentGallery: (gallery: string | null) => void;
  onNavigateToProject?: (projectKey: string) => void;
}

// Pre-transition component with its own lifecycle
const PreTransition = ({ 
  show, 
  onComplete, 
  isExiting,
  onExitComplete
}: { 
  show: boolean; 
  onComplete: () => void; 
  isExiting: boolean;
  onExitComplete?: () => void;
}) => {
  useEffect(() => {
    if (show && !isExiting) {
      // Only trigger the callback during entrance, not exit
      const timer = setTimeout(onComplete, 200);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete, isExiting]);

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {show && (
        <motion.div
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 0 100%)" }}
          transition={{
            duration: 0.15,
            ease: "easeInOut",
            exit: PRE_TRANSITION_TIMING.exit
          }}
          className="fixed inset-0 bg-black z-sidebar flex items-center justify-center"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="text-white text-4xl md:text-6xl font-helveticampbell tracking-tight"
          >
            Helveticampbell
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ProjectSidebar({ 
  isOpen, 
  onClose, 
  projectKey,
  currentGallery,
  setCurrentGallery,
  onNavigateToProject
}: ProjectSidebarProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const project = projectKey ? projectDetails[projectKey] : null;
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  
  // State for sticky header
  const [isScrolled, setIsScrolled] = useState(false);

  // Animation state management
  const [showPreTransition, setShowPreTransition] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  // State for project transitions
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionalProject, setTransitionalProject] = useState<string | null>(null);

  // Handle opening sequence
  useEffect(() => {
    if (isOpen && !showSidebar && !isExiting) {
      // Start with pre-transition (will auto-trigger sidebar via callback)
      setShowPreTransition(true);
    }
  }, [isOpen, showSidebar, isExiting]);

  // Handle transition from pre-transition to sidebar
  const handlePreTransitionComplete = () => {
    setShowSidebar(true);
  };

  // Handle pre-transition exit complete
  const handlePreTransitionExitComplete = () => {
    if (isExiting) {
      // Final cleanup after pre-transition has fully exited
      onClose();
      setIsExiting(false);
    }
  };

  // Custom close handler to manage exit animations
  const handleClose = () => {
    // Start exit sequence
    setIsExiting(true);
    
    // First, slide out the sidebar
    setShowSidebar(false);
    
    // Then show the PreTransition which will handle its own exit
    setShowPreTransition(true);
    
    // For exit - handle after a delay
    setTimeout(() => {
      // Trigger the exit animation after delay
      setShowPreTransition(false);
    }, PRE_TRANSITION_TIMING.exit.delay * 1000);
  };

  // Handle project transition
  const handleProjectTransition = (nextProjectKey: string) => {
    if (!nextProjectKey || nextProjectKey === projectKey) return;
    
    // Start transition sequence
    setIsTransitioning(true);
    setTransitionalProject(nextProjectKey);
    
    // Completely fade out the current content before changing projects
    setTimeout(() => {
      // Scroll to top for the new project
      if (sidebarContentRef.current) {
        sidebarContentRef.current.scrollTop = 0;
      }
      
      // Change to the new project
      if (onNavigateToProject) {
        onNavigateToProject(nextProjectKey);
      }
      
      // Allow a moment for the DOM to update with new content, then start fade-in
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionalProject(null);
      }, 100); // Short delay to ensure content has updated
    }, 500); // Ensure this is longer than the fade-out animation (400ms)
  };

  // Handle scroll for sticky header and back-to-top button
  useEffect(() => {
    // Only set up the scroll handler when the sidebar is actually visible
    // and the DOM element is available
    if (!showSidebar || !sidebarContentRef.current) {
      return;
    }
    
    const sidebar = sidebarContentRef.current;
    
    const handleScroll = () => {
      if (sidebar) {
        const scrollPosition = sidebar.scrollTop;
        setShowBackToTop(scrollPosition > 300);
        setIsScrolled(scrollPosition > 100);
      }
    };

    if (sidebar) {
      sidebar.addEventListener('scroll', handleScroll);
      
      // Trigger an initial check
      handleScroll();
      
      return () => {
        sidebar.removeEventListener('scroll', handleScroll);
      };
    }
  }, [showSidebar]); 

  const scrollToTop = () => {
    if (sidebarContentRef.current) {
      sidebarContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset scroll position when opening new project
  useEffect(() => {
    if (isOpen && projectKey && showSidebar && sidebarContentRef.current) {
      const timer = setTimeout(() => {
        if (sidebarContentRef.current) {
          sidebarContentRef.current.scrollTop = 0;
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, projectKey, showSidebar]);

  // Handle escape key to close sidebar
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen && !isExiting || !project) return null;

  return (
    <>
      {/* Pre-transition as separate component */}
      <PreTransition 
        show={showPreTransition} 
        onComplete={handlePreTransitionComplete}
        isExiting={isExiting}
        onExitComplete={handlePreTransitionExitComplete}
      />

      {/* Top Container */}
      <AnimatePresence mode="sync">
        {showSidebar && (
          <motion.div
            key="main-sidebar"
            initial={{ x: "100%", opacity: 1 }}
            animate={{
              x: ["100%", "90%", "92%", "0%"],
              opacity: 1
            }}
            // Single exit prop with its own transition
            exit={{ 
              x: "100%", // Slide to the right on exit
              opacity: 1, // Keep opacity at 1 during slide
              transition: { 
                duration: 0.25, // Explicit hardcoded value
                ease: "easeOut" 
              }
            }}
            // Main transition only for entrance
            transition={{
              // Only applied to entrance animation
              duration: SIDEBAR_TIMING.enter.duration,
              times: SIDEBAR_TIMING.enter.times,
              ease: SIDEBAR_TIMING.enter.ease,
              delay: 0, // No delay for entrance
            }}
            className="fixed inset-0 bg-[#f7f8fa] backdrop-blur-xs shadow-xl z-sidebar overflow-hidden"
          >
            {/* Simple grid background pattern */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundSize: '50px 50px',
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                `,
                zIndex: -1,
                pointerEvents: 'none'
              }}
            />

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0, ease: "easeOut" }}
              onClick={handleClose}
              className={`cursor-pointer fixed right-6 text-black/60 hover:text-black transition-all z-[1000] flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10 ${isScrolled ? 'top-3.5 w-10 h-10' : ' top-6 w-12 h-12'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Sticky Header - with data attributes for debugging */}
            {/* <div
              data-scrolled={isScrolled ? "true" : "false"}
              data-testid="sticky-header"
              className={`fixed top-0 left-0 right-0 z-modal transition-all duration-500 ease-in-out container-glass backdrop-blur-md py-4 px-6 border-b border-gray-200 shadow-sm ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
              style={{
                // Force important styles to ensure visibility if needed
                zIndex: 110,
                opacity: isTransitioning ? 0 : (isScrolled ? 1 : 0)
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <span style={{ marginBottom: '0px' }} className="font-semibold text-gray-900 text-3xl font-merriweather">{project?.title}</span>
                  {project?.description && (
                    <p className="hidden md:block text-sm text-text-secondary truncate" style={{ marginBottom: '0px' }}>{project.description}</p>
                  )}
                </div>
              </div>
            </div> */}

            <motion.div 
              ref={sidebarContentRef}
              className="h-full w-full overflow-y-auto project-sidebar-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: SIDEBAR_TIMING.enter.duration / 3,
                delay: 0.85,
                ease: "easeOut"
              }}
            >
              {/* Hero section with title and intro */}
              <div className={`p-20 pb-28`}>
                <div className="mx-auto">
                  {/* Project Title */}
                  <motion.div 
                    key={`title-${projectKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isTransitioning ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeInOut"
                    }}
                  >
                    <H1>{project?.title}</H1>
                  </motion.div>

                  {/* Project Description */}
                  {project?.description && (
                    <motion.p 
                      key={`description-${projectKey}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isTransitioning ? 0 : 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                      className="subheading"
                    >
                      {project.description}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Main Content */}
              {project?.content && (
                <motion.div 
                  key={`content-${projectKey}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isTransitioning ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                >
                  {project.content}
                </motion.div>
              )}

              {/* Fallback for projects without content - just show images in a grid */}
              {!project?.content && project?.images && (
                <div className="p-20">
                  <div className="max-w-7xl mx-auto">
                    <motion.div
                      key={`grid-${projectKey}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isTransitioning ? 0 : 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                      {project.images?.map((image, index) => (
                        <div 
                          key={index} 
                          className={`${image.fullWidth ? 'md:col-span-2 lg:col-span-3' : ''}`}
                        >
                          <div className="relative rounded-xl shadow-md">
                            <div 
                              className="relative" 
                              style={{ aspectRatio: image.aspectRatio || '4/4' }}
                            >
                              <Image 
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                          </div>
                          {image.caption && (
                            <p className="mt-3 text-sm text-gray-500">{image.caption}</p>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Previous Project Button - Fixed positioned */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isTransitioning ? 0.5 : 1,
                x: 0
              }}
              transition={{ 
                duration: 0.3,
                delay: isTransitioning ? 0 : 0.6 // Delay initial appearance after content loads
              }}
              onClick={() => {
                if (!projectKey || isTransitioning) return;
                
                const projectKeys = Object.keys(projectDetails);
                const currentIndex = projectKeys.indexOf(projectKey);
                const prevIndex = (currentIndex - 1 + projectKeys.length) % projectKeys.length;
                const prevProjectKey = projectKeys[prevIndex];
                
                // Navigate to previous project with transition
                handleProjectTransition(prevProjectKey);
              }}
              className="cursor-pointer fixed left-6 top-1/2 -translate-y-1/2 text-black/60 hover:text-black transition-colors z-[1000] w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10"
              aria-label="Previous Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Next Project Button - Fixed positioned */}
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ 
                opacity: isTransitioning ? 0.5 : 1,
                x: 0
              }}
              transition={{ 
                duration: 0.3,
                delay: isTransitioning ? 0 : 0.6 // Delay initial appearance after content loads
              }}
              onClick={() => {
                if (!projectKey || isTransitioning) return;
                
                const projectKeys = Object.keys(projectDetails);
                const currentIndex = projectKeys.indexOf(projectKey);
                const nextIndex = (currentIndex + 1) % projectKeys.length;
                const nextProjectKey = projectKeys[nextIndex];
                
                // Navigate to next project with transition
                handleProjectTransition(nextProjectKey);
              }}
              className="cursor-pointer fixed right-6 top-1/2 -translate-y-1/2 text-black/60 hover:text-black transition-colors z-[1000] w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10"
              aria-label="Next Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: ANIMATION_TIMING.enter }}
            exit={{ opacity: 0, y: 20, transition: ANIMATION_TIMING.exit }}
            onClick={scrollToTop}
            className="cursor-pointer fixed bottom-6 right-6 text-black/60 hover:text-black transition-colors z-modal w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
} 