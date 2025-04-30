import React from 'react';
import { H1, H2, H3, Overline } from '../Typography';
import Image from 'next/image';
import { projectDetails } from '../../data/projectDetails';

const BrandingContent: React.FC = () => {
  return (
    <>
      <div className="p-20 pb-28">
        <H1 className="mb-4">Branding</H1>
        <p className="subheading">A collection of logo and identity work, always executed with close collaboration and a tight communication loop with stakeholders. These are a mix of new brands, redesigns, and refreshes.</p>
      </div>

      {/* Gallery Section */}
      <div className="p-20 pb-28 pt-0">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 lg:gap-6">
              {
                projectDetails.Branding.images?.filter(img => !img.fullWidth).slice(0, 23).map((image, index) => (
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

export default BrandingContent; 