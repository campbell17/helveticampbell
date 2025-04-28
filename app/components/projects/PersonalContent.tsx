import React from 'react';
import { H1, H2, H3, Overline } from '../Typography';
import Image from 'next/image';
import { projectDetails } from '../../data/projectDetails';

const PersonalContent: React.FC = () => {
  return (
    <>
      <div className="p-20 pb-28">
        <H1 className="mb-4">Personal</H1>
        <p className="subheading">As the primary designer for Fulcrum's first decade, I led the product's visual and user experience evolution, helping build it into a comprehensive enterprise field operations platform used by thousands of organizations worldwide.</p>
      </div>

      <div className="bg-white border-b border-border">
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
      <div className="p-20 pb-28">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                projectDetails.Fulcrum.images?.filter(img => !img.fullWidth).slice(0, 6).map((image, index) => (
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
      <div className="w-full bg-slate-100 border-y border-slate-200">
        <div className="grid md:grid-cols-2 items-center">
          {/* Left column - Full-bleed image */}
          <div className="relative h-60 md:h-full min-h-[320px] aspect-square">
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
            <Overline>Icons</Overline>
            <H3>App Builder Icons v3</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              A custom icon set I created for Fulcrum's drag & drop App Builder. One of the constraints for v3 was for each icon to be identical in width and height, leading to some unique design choices (see: the flattened mailbox icon for the Address Field).
            </p>
          </div>
        </div>
      </div>

              
      {/* Gallery Section */}
      <div className="p-20 pb-28">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                projectDetails.Fulcrum.images?.filter(img => !img.fullWidth).slice(6, 8).map((image, index) => (
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
                projectDetails.Fulcrum.images?.filter(img => !img.fullWidth).slice(8, 10).map((image, index) => (
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
          <div className="w-full bg-stone-100 border-y border-slate-200">
            <div className="grid md:grid-cols-2 items-center">
              {/* Left column - Full-bleed image */}
              <div className="relative h-60 md:h-full min-h-[320px] aspect-square">
                <Image 
                  src="/images/work/full/full-fulcrum-brochure-mini-mockup.jpg"
                  alt="Fulcrum Brochure Mini Mockup"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full"
                  />
              </div>
              
              {/* Right column - Text content */}
              <div className="p-10 md:p-16 lg:p-20">
                <Overline>Print | Illustration</Overline>
                <H3>Features Mini Brochure</H3>
                <p className="text-base text-slate-700 max-w-xl mt-4">
                  A custom icon set I created for Fulcrum's drag & drop App Builder. One of the constraints for v3 was for each icon to be identical in width and height, leading to some unique design choices (see: the flattened mailbox icon for the Address Field).
                </p>
              </div>
            </div>
          </div>

      <div className="p-20 pb-28">
        <div className="max-w-none">

          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                projectDetails.Fulcrum.images?.filter(img => !img.fullWidth).slice(10, 12).map((image, index) => (
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
                projectDetails.Fulcrum.images?.filter(img => !img.fullWidth).slice(13,15).map((image, index) => (
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
                projectDetails.Fulcrum.images?.filter(img => !img.fullWidth).slice(15, 17).map((image, index) => (
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
                projectDetails.Fulcrum.images?.filter(img => !img.fullWidth).slice(17, 19).map((image, index) => (
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
                projectDetails.Fulcrum.images?.filter(img => !img.fullWidth).slice(19, 21).map((image, index) => (
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
    </>
  );
}

export default PersonalContent; 