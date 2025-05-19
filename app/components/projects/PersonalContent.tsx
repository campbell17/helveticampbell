import React from 'react';
import { H1, H2, H3, Overline } from '../Typography';
import Image from 'next/image';
import Link from 'next/link';

interface ImageData {
  src: string;
  alt: string;
  aspectRatio?: string;
  fullWidth?: boolean;
}

const PersonalContent: React.FC = () => {
  // Images directly in the component
  const images: ImageData[] = [
    { src: "/images/work/full/full-personal-painting-1.jpg", alt: "Painting 1" },
    { src: "/images/work/full/full-personal-painting-2.jpg", alt: "Painting 2" },
    { src: "/images/work/full/full-personal-painting-3.jpg", alt: "Painting 3" },
    { src: "/images/work/full/full-personal-painting-4.jpg", alt: "Painting 4" },
    { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Drawing 1" },
    { src: "/images/work/full/full-personal-drawing-2.jpg", alt: "Drawing 2" },
    { src: "/images/work/full/full-personal-drawing-3.jpg", alt: "Drawing 3" },
    { src: "/images/work/full/full-personal-drawing-4.jpg", alt: "Drawing 4" },
    { src: "/images/work/full/full-personal-photo-12.png", alt: "Photo 12", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-13.png", alt: "Photo 13", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-16.jpg", alt: "Photo 16", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-19.png", alt: "Photo 19", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-21.jpg", alt: "Photo 21", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-22.jpg", alt: "Photo 22", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-23.png", alt: "Photo 23", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-25.jpg", alt: "Photo 25", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-31.jpg", alt: "Photo 31", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-32.png", alt: "Photo 32", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-33.png", alt: "Photo 33", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-35.jpg", alt: "Photo 35", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-36.png", alt: "Photo 36", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-41.png", alt: "Photo 41", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-42.png", alt: "Photo 42", aspectRatio: "3/2" }, 
    { src: "/images/work/full/full-personal-photo-44.png", alt: "Photo 44", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-45.png", alt: "Photo 45", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-46.png", alt: "Photo 46", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-47.png", alt: "Photo 47", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-51.png", alt: "Photo 51", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-54.jpg", alt: "Photo 54", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-58.png", alt: "Photo 58", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-59.png", alt: "Photo 59", aspectRatio: "3/2" },
    { src: "/images/work/full/full-personal-photo-64.png", alt: "Photo 64", aspectRatio: "3/2" },
  ];

  return (
    <>
      <div className="px-4 sm:px-6 pb-10 md:px-20">
        <div className="flex flex-wrap mb-8">
          <Overline className="!text-lg mr-8">Drawing</Overline>
          <Overline className="!text-lg mr-8">Painting</Overline>
          <Overline className="!text-lg mr-8">Photography</Overline>
        </div>
        <H1 className="mb-4">Traditional Art</H1>
        <p className="subheading">I studied traditional illustration and photography before I became a designer and I still practice when I can. My macro photography pulls double-duty as the cover images for my <Link href="https://campbellseventeen.substack.com" target="_blank" rel="noreferrer noopener">Substack essays</Link>. I write fresh ones weekly and publish on Fridays.</p>
      </div>

      {/* Gallery Section */}
      <div className="p-8 pb-10 md:p-20 md:pb-28 pt-0">
        <div className="max-w-none flex flex-col gap-20">
          
          <div>
            <H2 className="mb-8">Drawing & Painting</H2>          
            
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(0, 8).map((image, index) => (
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

          <div>

          <H2 className="mb-8">Photography</H2>          

          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(8, 33).map((image, index) => (
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
      </div>
    </>
  );
}

export default PersonalContent; 