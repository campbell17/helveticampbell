import React from 'react';
import Image from 'next/image';
import { H1, H2, H3, Overline } from '../Typography';
import ProjectNavigation from '../ProjectNavigation';
import { projectTags } from '../../data/projectTags';

const FulcrumBrandingContent: React.FC = () => {
  const stats = [
    { name: 'Logo Iterations', stat: '50+' },
    { name: 'Marketing Materials', stat: '200+' },
    { name: 'Brand Guidelines', stat: '3' },
  ];

  // Get tags from project tags
  const fulcrumTags = projectTags["Fulcrum"] || [];

  const brandingImages = [
    { src: "/images/work/isolated/iso-fulcrum-logo-og.jpg", alt: "Original Fulcrum Logo" },
    { src: "/images/work/isolated/iso-fulcrum-logo-live.jpg", alt: "Live Fulcrum Logo" },
    { src: "/images/work/isolated/iso-fulcrum-logo.jpg", alt: "Current Fulcrum Logo" },
    { src: "/images/work/full/full-fulcrum-brochure-mini-1.jpg", alt: "Mini Brochure Page 1" },
    { src: "/images/work/full/full-fulcrum-brochure-mini-2.jpg", alt: "Mini Brochure Page 2" },
    { src: "/images/work/full/full-fulcrum-ad-2.jpg", alt: "Fulcrum Advertisement" },
    { src: "/images/work/full/full-fulcrum-book-cover.jpg", alt: "Fulcrum Book Cover" },
    { src: "/images/work/full/full-fulcrum-book-fundamentals.jpg", alt: "Book Fundamentals Page" },
    { src: "/images/work/full/full-fulcrum-book-data.jpg", alt: "Book Data Page" },
    { src: "/images/work/isolated/iso-fulcrum-package.jpg", alt: "Fulcrum Package Design" },
    { src: "/images/work/isolated/iso-fulcrum-packaging-holidaybox.jpg", alt: "Holiday Box Packaging", aspectRatio: "100/50" },
    { src: "/images/work/full/full-fulcrum-handout.jpg", alt: "Fulcrum Handout", aspectRatio: "100/64" },
  ];

  const swagImages = [
    { src: "/images/work/isolated/iso-fulcrum-sticker-1.jpg", alt: "Fulcrum Sticker 1" },
    { src: "/images/work/isolated/iso-fulcrum-sticker-2.jpg", alt: "Fulcrum Sticker 2" },
    { src: "/images/work/isolated/iso-fulcrum-button.jpg", alt: "Fulcrum Button" },
    { src: "/images/work/isolated/iso-fulcrum-pullup-1.jpg", alt: "Fulcrum Pull-up Banner" },
    { src: "/images/work/snapshots/snapshot-fulcrum-cw-tradeshow.jpg", alt: "Trade Show Setup" },
    { src: "/images/work/snapshots/snapshot-fulcrum-cw-early-swag.jpg", alt: "Early Swag Collection" },
  ];

  return (
    <>
      <div className="px-4 sm:px-6 pb-10 md:px-20">
        <div className="flex flex-wrap mb-8">
          {fulcrumTags.map((tag, index) => (
            <Overline key={index} className="!text-lg mr-8">{tag}</Overline>
          ))}
        </div>
        <H1 className="mb-4">Fulcrum Branding<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Visual Identity & Marketing</span></H1>
        <p className="subheading">Developing a cohesive visual identity that evolved with the company from startup to enterprise platform, including logos, marketing materials, and brand guidelines.</p>
      </div>

      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] pt-12 pb-16 px-4 sm:px-6 md:px-20 border-y border-[var(--color-border)]">
        <div className="w-full 2xl:max-w-7xl mx-auto">
          <Overline className="mb-4">Brand Evolution</Overline>
          <H2>From Startup to Enterprise Brand</H2>
          <p className="text-lg max-w-3xl mb-8">
            Over 13 years, Fulcrum's brand evolved from a simple startup logo to a comprehensive enterprise identity system, reflecting the company's growth and maturation.
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

      {/* Logo Evolution */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Logo Evolution</H2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-12">
            <div className="cursor-default relative group overflow-hidden rounded-xl">
              <div className="relative" style={{ aspectRatio: '1' }}>
                <Image 
                  src="/images/work/isolated/iso-fulcrum-logo-og.jpg"
                  alt="Original Fulcrum Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                <p className="text-sm font-medium">Original (2012)</p>
              </div>
            </div>
            
            <div className="cursor-default relative group overflow-hidden rounded-xl">
              <div className="relative" style={{ aspectRatio: '1' }}>
                <Image 
                  src="/images/work/isolated/iso-fulcrum-logo-live.jpg"
                  alt="Live Fulcrum Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                <p className="text-sm font-medium">Refined (2015)</p>
              </div>
            </div>
            
            <div className="cursor-default relative group overflow-hidden rounded-xl">
              <div className="relative" style={{ aspectRatio: '1' }}>
                <Image 
                  src="/images/work/isolated/iso-fulcrum-logo.jpg"
                  alt="Current Fulcrum Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                <p className="text-sm font-medium">Current (2020)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vignette Section */}
      <div className="w-full bg-[var(--mode-color)] border-y border-[var(--color-border)]">
        <div className="vignette-container">
          <div className="vignette-image-container">
            <Image 
              src="/images/work/full/full-fulcrum-brochure-mini-mockup-cool.jpg"
              alt="Fulcrum Mini Brochure Mockup"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
            />
          </div>
          
          <div className="p-10 md:p-16 lg:p-20">
            <Overline className="mb-4">Marketing Materials</Overline>
            <H3>Custom Illustrations</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              I created custom illustrations for the Features section of the website. Each was unique enough to conceptually stand on its own, and the striking visuals left such an impression on the team, we decided to create a 4-panel brochure to hand out at trade shows and industry events.
            </p>
          </div>
        </div>
      </div>

      {/* Marketing Materials Gallery */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Marketing Materials</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8">
            {brandingImages.slice(3, 9).map((image, index) => (
              <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: image.aspectRatio || '4/5' }}>
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Full-width handout */}
          <div className="mb-8">
            <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
              <div className="relative" style={{ aspectRatio: '100/64' }}>
                <Image 
                  src="/images/work/full/full-fulcrum-handout.jpg"
                  alt="Fulcrum Handout"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Package designs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {brandingImages.slice(9, 11).map((image, index) => (
              <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: image.aspectRatio || '4/3' }}>
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Swag & Trade Shows */}
      <div className="w-full bg-[var(--mode-color)] border-y border-[var(--color-border)]">
        <div className="p-8 pb-10 md:p-20 md:pb-28">
          <div className="max-w-none">
            <H2 className="mb-8">Swag & Trade Shows</H2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {swagImages.map((image, index) => (
                <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                  <div className="relative" style={{ aspectRatio: '1' }}>
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Guidelines */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Brand Guidelines</H2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <H3>Typography</H3>
              <p className="text-base text-slate-700">
                Established a clear typographic hierarchy using modern sans-serif fonts that maintain readability across digital and print applications.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Color Palette</H3>
              <p className="text-base text-slate-700">
                Developed a cohesive color system that evolved from the original orange and blue to a more sophisticated palette suitable for enterprise clients.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Logo Usage</H3>
              <p className="text-base text-slate-700">
                Created comprehensive guidelines for logo placement, sizing, and usage across various media, ensuring consistent brand representation.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Visual Language</H3>
              <p className="text-base text-slate-700">
                Established illustration styles, photography guidelines, and iconography standards that support the brand's professional yet approachable personality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <ProjectNavigation currentProject="Fulcrum" />
    </>
  );
}

export default FulcrumBrandingContent; 