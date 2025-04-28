import React from 'react';
import { H1, H2, H3, Overline } from '../Typography';
import Image from 'next/image';
import { projectDetails } from '../../data/projectDetails';

const DivideContent: React.FC = () => {
  return (
    <>
      <div className="p-20 pb-28">
        <div className="flex flex-wrap mb-8">
          <Overline className="!text-lg mr-8">UI</Overline>
          <Overline className="!text-lg mr-8">Branding</Overline>
          <Overline className="!text-lg mr-8">Game Design</Overline>
          <Overline className="!text-lg mr-8">Icon Design</Overline>
          <Overline className="!text-lg mr-8">Marketing Design</Overline>
        </div>
        <H1 className="mb-4">Divide</H1>
        <p className="subheading">A character-driven, science fiction action/adventure game with a modern take on isometric adventures of the past.</p>
      </div>


      {/* Gallery Section */}
      <div className="p-20 pb-28 pt-0">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                projectDetails.Divide.images?.filter(img => !img.fullWidth).slice(0, 2).map((image, index) => (
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

          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-4 lg:gap-6">
              {
                projectDetails.Divide.images?.filter(img => !img.fullWidth).slice(2, 11).map((image, index) => (
                  <div key={image.src || index} className="cursor-default relative md:col-start-2 md:col-span-6 group overflow-hidden rounded-xl shadow-md">
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
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                projectDetails.Divide.images?.filter(img => !img.fullWidth).slice(11, 13).map((image, index) => (
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
      <div className="w-full bg-slate-100 border-y border-slate-200">
        <div className="grid md:grid-cols-2 items-center">
          {/* Left column - Full-bleed image */}
          <div className="relative h-60 md:h-full min-h-[320px] aspect-square">
            <Image 
              src="/images/work/gridded/grid-divide-icons.jpg"
              alt="Divide Icons"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
              />
          </div>
          
          {/* Right column - Text content */}
          <div className="p-10 md:p-16 lg:p-20">
            <Overline>Icons</Overline>
            <H3>Divide In-Game Icons</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              A custom icon set I created for Fulcrum's drag & drop App Builder. One of the constraints for v3 was for each icon to be identical in width and height, leading to some unique design choices (see: the flattened mailbox icon for the Address Field).
            </p>
          </div>
        </div>
      </div>

      {/* Vignette Section 2 */}
      <div className="w-full bg-slate-100 border-b border-slate-200">
        <div className="grid md:grid-cols-2 items-center">
          {/* Left column - Full-bleed image */}
          <div className="relative h-60 md:h-full min-h-[320px] aspect-square">
            <Image 
              src="/images/work/full/full-divide-ps4.jpg"
              alt="Divide for Playstation"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
              />
          </div>
          
          {/* Right column - Text content */}
          <div className="p-10 md:p-16 lg:p-20">
            <Overline>Sony Playstation</Overline>
            <H3>Divide Playstation Assets</H3>
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {
                projectDetails.Divide.images?.filter(img => !img.fullWidth).slice(15, 18).map((image, index) => (
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
      <div className="w-full bg-slate-100 border-y mb-28 border-slate-200">
        <div className="grid md:grid-cols-2 items-center">
          {/* Left column - Full-bleed image */}
          <div className="relative h-60 md:h-full min-h-[320px] aspect-square">
            <Image 
              src="/images/work/snapshots/snapshot-divide-recording-1.jpg"
              alt="Divide Recording Session"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
              />
          </div>
          
          {/* Right column - Text content */}
          <div className="p-10 md:p-16 lg:p-20">
            <Overline>Soundtrack</Overline>
            <H3>Divide Sountrack Cover</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              A custom icon set I created for Fulcrum's drag & drop App Builder. One of the constraints for v3 was for each icon to be identical in width and height, leading to some unique design choices (see: the flattened mailbox icon for the Address Field).
            </p>
          </div>
        </div>
      </div>


              
          
    </>
  );
}

export default DivideContent; 