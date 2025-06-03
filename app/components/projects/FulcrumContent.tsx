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
      <div className="w-full -mt-36 bg-[#eb1300]">
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
        
        <div className="flex flex-wrap pt-16">
          <Overline className="!text-lg mr-8">Case Study</Overline>
        </div>
        <H1 className="mb-4">Fulcrum<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Field Operations Platform</span></H1>
        <div className="flex gap-12">
          <p className="!mb-10">Fulcrum allows users to collect data, media, and GPS locations in the field via mobile app, with everything synced to the cloud for centralized access, management, and reporting via the web. As the Lead Product Designer for Fulcrum, I was responsible for branding, marketing, UX, and visual design for the entire product. I was the sole designer for the first few years, ultimately growing the team to four designers. We were a tight group, proudly dubbed as the glue between product and engineering.</p>
        </div>
      </div>

      <div className="w-full bg-[#fdecee]">
        <div className="relative overflow-hidden">
          <Image 
            src="/images/work/browser/browser-fulcrum-app-builder-prototype.jpg"
            alt="Fulcrum Modern Builder Selected"
            width={1920}
            height={1080}
            sizes="100vw"
            className="rounded-t-xl mx-auto shadow-lg w-[96%] -mb-4"
            priority
          />
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left column - Overline */}
            <div className="md:col-span-4 flex items-center justify-start md:justify-center">
              <Overline className="!text-2xl mb-4 md:mb-0">Fulcrum Overview</Overline>
            </div>
            
            {/* Vertical divider */}
            <div className="hidden md:block md:col-span-1 flex justify-center">
              <div className="w-[1px] h-full bg-gray-300"></div>
            </div>
            
            {/* Right column - Paragraph */}
            <div className="md:col-span-7">
              <p className="text-base !mb-4">
                Fulcrum is a cloud-based platform for field data collection that lets teams use custom-built forms to capture field observations, media, GPS locations, and other structured inputs on mobile devices, with everything synced to a web app for viewing, organizing, and reporting. I joined the team shortly after version 0.5 debuted at the 2011 GEOINT Symposium, stepping in to elevate the product's visual identity, lead the design of its iOS, Android, and web applications, and establish consistent UX patterns that would form the foundation of the Fulcrum design system in the years that followed.
              </p>
              <p className="text-base !mb-0">
                What follows are some vignettes of a few key contributions I've made to Fulcrum over the years. 
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white pt-6">
        <div className="px-8 sm:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 lg:gap-6">
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
          <span className="text-center col-span-2 sm:col-span-3 md:col-span-6 text-sm !text-[var(--text-color-light)] mb-12">Our humble red triangle never left our side.</span>
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