import React from 'react';
import { H1, H3, Overline } from '../../components/Typography';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allinspections | Inspection Management Software | Tim Campbell',
  description: 'Inspection management software focused on the home inspections market. I led the design of the branding, marketing, web & mobile apps, and environmental/tradeshow materials.',
};

// All project data inlined directly in the page
interface ImageData {
  src: string;
  alt: string;
  aspectRatio?: string;
}

const images: ImageData[] = [
  { src: "/images/work/isolated/iso-allinspections-icon.jpg", alt: "Allinspections Icon" },
  { src: "/images/work/isolated/iso-allinspections-logo.jpg", alt: "Allinspections Logo" },
  { src: "/images/work/isolated/iso-allinspections-pullup-1.jpg", alt: "Allinspections Pullup 1" },
  { src: "/images/work/isolated/iso-allinspections-pullup-2-alt.jpg", alt: "Allinspections Pullup 2 Alt" },
  { src: "/images/work/isolated/iso-allinspections-pullup-3.jpg", alt: "Allinspections Pullup 3" },
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
  { src: "/images/work/full/full-allinspections-brochure.jpg", alt: "Allinspections Brochure" },
  { src: "/images/work/full/full-allinspections-double-ad.jpg", alt: "Allinspections Double Ad" },
  { src: "/images/work/full/full-allinspections-card-1.jpg", alt: "Allinspections Card 1" },
  { src: "/images/work/full/full-allinspections-card-2.jpg", alt: "Allinspections Card 2" }
];

const tags = ["UX/UI", "Branding", "Product Design", "Marketing Design"];
const description = "Field inspection management platform for quality control teams.";
const coverImage = "/images/work/index/work-index-allinspections.jpg";
const heading = "Allinspections";
const headingAlt = "Inspection Management Software";
const subheading = "Inspection management software focused on the home inspections market. I led the design of the branding, marketing, web & mobile apps, and environmental/tradeshow materials.";

export default function AllinspectionsPage() {
  return (
    <div className="project-page">
      {/* Allinspections page content inlined from AllinspectionsContent component */}
      <div className="px-4 sm:px-6 pb-10 md:px-20">
        <div className="flex flex-wrap mb-8">
          {tags.map((tag, index) => (
            <Overline key={index} className="!text-lg mr-8">{tag}</Overline>
          ))}
        </div>
        <H1 className="mb-4">Allinspections<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Inspection Management Software</span></H1>
        <p className="subheading">(2010 - 2012) Inspection management software focused on the home inspections market. As the sole designer, I created the branding, marketing, web & mobile apps, and environmental/tradeshow materials.</p>
      </div>
      <div>
        <div className="px-8 sm:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 lg:gap-6">
          {/* First row */}
          
          <div className="cursor-default md:col-start-2 md:col-span-2 relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-allinspections-icon.jpg"
                alt="Allinspections Icon"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="cursor-default md:col-start-4 md:col-span-2 relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-allinspections-logo.jpg"
                alt="Allinspections Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                images.slice(5, 15).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                    <div className="relative" style={{ aspectRatio: image.aspectRatio || '1' }}>
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
      <div className="w-full bg-[var(--mode-color)] border-[var(--color-border)]">
        <div className="vignette-container">
          {/* Left column - Full-bleed image */}
          <div className="vignette-image-container">
            <Image 
              src="/images/work/full/full-allinspections-double-ad.jpg"
              alt="Allinspections Double Ad"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
              />
          </div>
          
          {/* Right column - Text content */}
          <div className="p-10 md:p-16 lg:p-20">
            <Overline className="mb-4">Print Design | Advertising</Overline>
            <H3>2-Page Trade Publication Ad</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              One of the bolder ideas over my career, a simple concept for an ad for our home inspection software, Allinspections. Back when iPhones had "home" buttons, this made more sense. We encouraged home inspectors to take back their nights and weekends by streamlining their process with better software. "Go home" was a play on that concept. It didn't win any awards, but our CEO liked it so much he had it framed and put in the corporate office.
            </p>
          </div>
        </div>
      </div>

              
      {/* Gallery Section */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {
                images.slice(2, 5).map((image, index) => (
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
            <div className="grid grid-cols-1 gap-4 lg:gap-6">
              {
                images.slice(15, 16).map((image, index) => (
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
    </div>
  );
} 