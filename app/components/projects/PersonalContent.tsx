import React from 'react';
import { H1, H2, H3, Overline } from '../Typography';
import Image from 'next/image';
import { projectDetails } from '../../data/projectDetails';
import Link from 'next/link';
const PersonalContent: React.FC = () => {
  return (
    <>
      <div className="p-20 pb-28">
        <div className="flex flex-wrap mb-8">
          <Overline className="!text-lg mr-8">Drawing</Overline>
          <Overline className="!text-lg mr-8">Painting</Overline>
          <Overline className="!text-lg mr-8">Photography</Overline>
        </div>
        <H1 className="mb-4">Traditional Art</H1>
        <p className="subheading">I studied traditional illustration and photography before I became a designer and I still practice when I can. My macro photography pulls double-duty as the cover images for my <Link href="https://campbellseventeen.substack.com" target="_blank" rel="noreferrer noopener">Substack essays</Link>. I write fresh ones weekly and publish on Fridays.</p>
      </div>

      {/* Gallery Section */}
      <div className="p-20 pb-28 pt-0">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {
                projectDetails.Personal.images?.filter(img => !img.fullWidth).slice(0, 34).map((image, index) => (
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

export default PersonalContent; 