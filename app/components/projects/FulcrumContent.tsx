import React from 'react';
import Image from 'next/image';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { H1, H2, H3, Overline } from '../Typography';
import ProjectNavigation from '../ProjectNavigation';
import { projectTags } from '../../data/projectTags';

const FulcrumContent: React.FC = () => {
  const stats = [
    { name: 'Organizations', stat: '3,000+' },
    { name: 'Users', stat: '50,000+' },
    { name: 'Countries', stat: '100+' },
  ];

  // Get tags from project tags
  const fulcrumTags = projectTags["Fulcrum"] || [];

  // Images directly in the component
  const images = [
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
    { src: "/images/work/full/full-fulcrum-brochure-mini-mockup.jpg", alt: "Fulcrum Brochure Mini Mockup" },
    { src: "/images/work/full/full-fulcrum-ad-2.jpg", alt: "Fulcrum Ad 2" },
    { src: "/images/work/full/full-fulcrum-book-cover.jpg", alt: "Fulcrum Book Cover" },
    { src: "/images/work/full/full-fulcrum-book-fundamentals.jpg", alt: "Fulcrum Book Fundamentals" },
    { src: "/images/work/full/full-fulcrum-book-data.jpg", alt: "Fulcrum Book Data" },
    { src: "/images/work/isolated/iso-fulcrum-pullup-1.jpg", alt: "Fulcrum Pullup 1" },
    { src: "/images/work/snapshots/snapshot-fulcrum-cw-tradeshow.jpg", alt: "Fulcrum CW Tradeshow" },
    { src: "/images/work/snapshots/snapshot-fulcrum-cw-early-swag.jpg", alt: "Fulcrum CW Early Swag" },
    { src: "/images/work/isolated/iso-fulcrum-package.jpg", alt: "Fulcrum Package" },
    { src: "/images/work/isolated/iso-fulcrum-sticker-1.jpg", alt: "Fulcrum Sticker 1" },
    { src: "/images/work/isolated/iso-fulcrum-sticker-2.jpg", alt: "Fulcrum Sticker 2" },
    { src: "/images/work/isolated/iso-fulcrum-button.jpg", alt: "Fulcrum Button" },
    { src: "/images/work/isolated/iso-fulcrum-packaging-holidaybox.jpg", alt: "Fulcrum Holiday Box", aspectRatio: "100/50" },
    { src: "/images/work/full/full-fulcrum-handout.jpg", alt: "Fulcrum Handout", fullWidth: true, aspectRatio: "100/64" },
    { src: "/images/work/gridded/grid-fulcrum-buildericons-v3.jpg", alt: "Fulcrum Builder Icons v3" },
  ];

  return (
    <>
      {/* Hero Image */}
      <div className="w-full -mt-36" style={{ backgroundColor: '#eb1300' }}>
        <div className="relative overflow-hidden">
          <div className="relative">
            <Image 
              src="/images/work/hero/hero-fulcrum.png"
              alt="Fulcrum Hero"
              width={1920}
              height={757}
              sizes="100vw"
              className=""
              priority
            />
          </div>
        </div>
      </div>
      
      <div className="bg-[#fdecee] px-4 sm:px-6 pb-10 md:px-20">
        <H1 className="mb-4 pt-16">Fulcrum<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Field Operations Platform</span></H1>
        <div className="flex gap-12">
          <p className="!mb-10">Fulcrum allows users to collect data, media, and GPS locations in the field via mobile app, with everything synced to the cloud for centralized access, management, and reporting via the web. As the Lead Product Designer for Fulcrum, I was responsible for branding, marketing, UX, and visual design for the entire product. I was the sole designer for the first few years, ultimately growing the team to four designers. We were a tight group and proudly staked our claim as the glue between product and engineering.</p>
        </div>
      </div>
      {/* <div className="p-20 pt-0"> */}
      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] pt-12 pb-16 px-4 sm:px-6 md:px-20 border-y border-[var(--color-border)]">
        <div className="w-full 2xl:max-w-7xl mx-auto">
          <Overline className="mb-4">Company Overview</Overline>
          <H2>From Startup to Enterprise Platform</H2>
          <p className="text-lg max-w-3xl mb-8">
            Fulcrum evolved from a small Florida startup to a global leader in field operations software, serving thousands of organizations across diverse industries.
          </p>
          
          <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 font-sans">
              {stats.map((item) => (
                <div key={item.name} className="overflow-hidden bg-white/50 gametime:bg-[var(--theme-color)] dark:bg-[var(--pane-bg-color)] rounded-lg px-4 py-5 shadow shadow-[var(--color-shadow)] sm:p-6">
                  <dt className="truncate text-sm font-medium">{item.name}</dt>
                  <dd className="mt-1 text-xl md:text-3xl font-semibold">{item.stat}</dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </div>      
      {/* <div className="mt-20 px-4 sm:px-6 pb-10 md:px-20">
        <H2>Case Studies</H2> */}
        
        {/* Feature Case Studies Disclosures */}
        {/* <div className="mt-8"> */}
          
          {/* Data Viewer Redesign Case Study */}
          {/* <Disclosure>
            <DisclosureButton className="!bg-red-400 pane w-full flex items-center justify-between p-6 text-left">
              <span className="text-lg font-medium">Data Viewer Redesign</span>
              <ChevronDownIcon className="w-5 h-5 group-data-open:rotate-180 transition-transform duration-200" />
            </DisclosureButton>
            <DisclosurePanel className="mt-4 !bg-yellow-400">
              <div className="pane p-8">
                <p className="text-base text-slate-700 mb-6">
                  A comprehensive redesign of Fulcrum's data viewing interface to improve usability and performance for large datasets. This project involved reimagining how users interact with their collected field data.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                      Before: Legacy Data Viewer
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                      After: Modern Data Viewer
                    </div>
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure> */}

          {/* Groups Case Study */}
          {/* <Disclosure>
            <DisclosureButton className="pane w-full flex items-center justify-between p-6 text-left">
              <span className="text-lg font-medium">Groups</span>
              <ChevronDownIcon className="w-5 h-5 group-data-open:rotate-180 transition-transform duration-200" />
            </DisclosureButton>
            <DisclosurePanel className="mt-4">
              <div className="pane p-8">
                <p className="text-base text-slate-700 mb-6">
                  Implementation of a flexible grouping system that allows organizations to structure their data collection workflows hierarchically. This feature enables better organization and permissions management across large teams.
                </p>
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                      Groups Feature Implementation
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/50 p-4 rounded-lg">
                      <strong>Challenge:</strong> Managing permissions across complex organizational structures
                    </div>
                    <div className="bg-white/50 p-4 rounded-lg">
                      <strong>Solution:</strong> Hierarchical group system with inherited permissions
                    </div>
                    <div className="bg-white/50 p-4 rounded-lg">
                      <strong>Impact:</strong> 40% reduction in setup time for new organizations
                    </div>
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure> */}

          {/* Lines & Polygons Case Study */}
          {/* <Disclosure>
            <DisclosureButton className="pane w-full flex items-center justify-between p-6 text-left">
              <span className="text-lg font-medium">Lines & Polygons</span>
              <ChevronDownIcon className="w-5 h-5 group-data-open:rotate-180 transition-transform duration-200" />
            </DisclosureButton>
            <DisclosurePanel className="mt-4">
              <div className="pane p-8">
                <p className="text-base text-slate-700 mb-6">
                  Development of advanced geometry collection tools allowing field teams to capture complex spatial data including linear features (roads, pipelines) and area features (plots, boundaries) with precision GPS tracking.
                </p>
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                      Geometry Collection Interface
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Features:</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Real-time GPS tracking with sub-meter accuracy</li>
                        <li>• Complex polygon creation with hole support</li>
                        <li>• Line snapping and editing capabilities</li>
                        <li>• Automatic area and distance calculations</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Use Cases:</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Infrastructure mapping</li>
                        <li>• Environmental monitoring</li>
                        <li>• Agricultural plot management</li>
                        <li>• Emergency response planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

        </div>
        
      </div> */}

      <div className="mt-10">
        <div className="px-8 sm:px-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 lg:gap-6">
          {/* First row */}
          
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
                src="/images/work/isolated/iso-fulcrum-logo-live.jpg"
                alt="Fulcrum Logo Live"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          {/* <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-fulcrum-icon-og.jpg"
                alt="Fulcrum Icon OG"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div> */}
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
                src="/images/work/isolated/iso-fulcrum-sticker-1.jpg"
                alt="Fulcrum Sticker 1"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-fulcrum-sticker-2.jpg"
                alt="Fulcrum Sticker 2"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-fulcrum-button.jpg"
                alt="Fulcrum Button"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          
          {/* <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-fulcrum-icon.jpg"
                alt="Fulcrum Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div> */}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(0, 6).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                    <div className="relative" style={{ aspectRatio: image.aspectRatio || '10/6' }}>
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          

        </div>
      </div>

      {/* Vignette Section 1 */}
      <div className="w-full bg-[var(--mode-color)] border-y border-[var(--color-border)]">
        <div className="vignette-container">
          {/* Left column - Full-bleed image */}
          <div className="vignette-image-container">
            <Image 
              src="/images/work/gridded/grid-fulcrum-buildericons-v3.jpg"
              alt="Fulcrum App Builder Icons v3"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
              />
          </div>
          
          {/* Right column - Text content */}
          <div className="p-10 md:p-16 lg:p-20">
            <Overline className="mb-4">Icons</Overline>
            <H3>App Builder Icons v3</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              A custom icon set I created for Fulcrum's drag & drop App Builder. One of the constraints for v3 was for each icon to be identical in width and height, leading to some unique design choices (see: the flattened mailbox icon for the Address Field).
            </p>
          </div>
        </div>
      </div>

              
      {/* Gallery Section */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:col-start-2 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(6, 10).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                    <div className="relative" style={{ aspectRatio: image.aspectRatio || '4/4' }}>
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          
    
          </div>
        </div>


          {/* Vignette Section 2 */}
          <div className="w-full bg-[var(--mode-color)] border-y border-[var(--color-border)]">
            <div className="vignette-container">
              {/* Left column - Full-bleed image */}
              <div className="vignette-image-container">
                <Image 
                  src="/images/work/full/full-fulcrum-brochure-mini-mockup-cool.jpg"
                  alt="Fulcrum Brochure Mini Mockup"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full"
                  />
              </div>
              
              {/* Right column - Text content */}
              <div className="p-10 md:p-16 lg:p-20">
                <Overline className="mb-4">Illustration</Overline>
                <H3>Mini Brochure</H3>
                <p className="text-base text-slate-700 max-w-xl mt-4">I created custom illustrations for the Features section of the website. Each was unique enough to conceptually stand on its own, and the striking visuals left such an impression on the team, we decided to create a 4-panel brochure to hand out at trade shows and industry events. </p>
              </div>
            </div>
          </div>

      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">

          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(10, 12).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                    <div className="relative" style={{ aspectRatio: image.aspectRatio || '4/4' }}>
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(13,15).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                    <div className="relative" style={{ aspectRatio: image.aspectRatio || '4/4' }}>
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(15, 17).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                    <div className="relative" style={{ aspectRatio: image.aspectRatio || '4/4' }}>
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(17, 19).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                    <div className="relative" style={{ aspectRatio: image.aspectRatio || '4/4' }}>
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>  

          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(19, 21).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                    <div className="relative" style={{ aspectRatio: image.aspectRatio || '4/4' }}>
                      <Image 
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>            

        </div>
      </div>

      {/* Project Navigation */}
      {/* <ProjectNavigation currentProject="Fulcrum" /> */}
    </>
  );
}

export default FulcrumContent; 