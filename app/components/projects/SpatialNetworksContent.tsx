import React from 'react';
import { H1, H2, H3, Overline } from '../Typography';
import Image from 'next/image';
import { projectDetails } from '../../data/projectDetails';

const SpatialNetworksContent: React.FC = () => {

  const stats = [
    { name: 'Organizations', stat: '3,000+' },
    { name: 'Users', stat: '50,000+' },
    { name: 'Countries', stat: '100+' },
  ]

  return (
    <>
      <div className="p-8 pt-24 pb-10 md:p-20 md:pb-28">
        <div className="flex flex-wrap mb-8">
          <Overline className="!text-lg mr-8">Branding</Overline>
          <Overline className="!text-lg mr-8">Product Design</Overline>
          <Overline className="!text-lg mr-8">Marketing Design</Overline>
        </div>
        <H1 className="mb-4">Spatial Networks<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Geospatial Intelligence Platform</span></H1>
        <p className="subheading">(2010 - 2019) Geospatial intelligence specializing in technology, analytics, and ground-truthing. I led design for all aspects of the company, including marketing, branding, and product design of its software products.</p>
      </div>
      <div className="bg-white border-b border-border">
        <div className="px-8 sm:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {/* First row */}
          
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-sni-logo.jpg"
                alt="SNI Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-sni-icon.jpg"
                alt="SNI Icon"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-sni-icon-fall.jpg"
                alt="SNI Icon Fall"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="cursor-default relative group overflow-hidden rounded-xl">
            <div className="relative" style={{ aspectRatio: '1' }}>
              <Image 
                src="/images/work/isolated/iso-sni-icon-fall-tshirt.jpg"
                alt="SNI Fall Tshirt"
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
                projectDetails["Spatial Networks"].images?.filter(img => !img.fullWidth).slice(4, 16).map((image, index) => (
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
    </>
  );
}

export default SpatialNetworksContent; 