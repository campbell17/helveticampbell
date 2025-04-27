import React from 'react';
import Image from 'next/image';
import { H1, H2, H3, Overline } from '../Typography';

export default function FulcrumContent() {
  return (
    <>
      {/* Stats Callout */}
      <div className="w-full bg-indigo-50 pt-12 pb-16 px-20 border-y border-indigo-100">
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
      <div className="bg-white border-b border-border">
        <div className="px-4 grid grid-cols-1 sm:grid-cols-4 gap-4 lg:gap-6">
          {/* First row */}
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-fulcrum-icon-og.jpg"
                alt="Fulcrum Icon OG"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-fulcrum-logo-og.jpg"
                alt="Fulcrum Logo OG"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-fulcrum-logo.jpg"
                alt="Fulcrum Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-fulcrum-icon.jpg"
                alt="Fulcrum Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
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
      
      {/* Vignette Section 1 */}
      <div className="w-full bg-slate-100 border-t border-slate-200">
        <div className="grid md:grid-cols-2 items-center">
          {/* Left column - Text content */}
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
          
          {/* Right column - Full-bleed image */}
          <div className="p-10 md:p-16 lg:p-20">
            <Overline>Documentation & Training</Overline>
            <H3>Teaching Complex Concepts Simply</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              I led the creation of Fulcrum's documentation and training materials, translating technical capabilities into clear, accessible guides. The Fulcrum Field Guide became an essential resource for users, combining practical tutorials with visual examples to help organizations maximize their investment in the platform.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-100 border-t border-slate-200">
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
      <div className="p-20 pb-28">
        <div className="max-w-none">
          
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
  );
} 