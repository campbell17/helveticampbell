import React from 'react';
import { H1, H2, H3, Overline } from '../Typography';
import Image from 'next/image';

interface ImageData {
  src: string;
  alt: string;
  aspectRatio?: string;
  fullWidth?: boolean;
}

const BrandingContent: React.FC = () => {
  // Images directly in the component
  const images: ImageData[] = [
    { src: "/images/work/isolated/iso-liminallab-logo.jpg", alt: "Liminal Lab Logo" },
    { src: "/images/work/isolated/iso-cercana-logo.jpg", alt: "Cercana Systems Logo" },
    { src: "/images/work/isolated/iso-exploding-tuba-logo.jpg", alt: "Exploding Tuba Studios Logo" },      
    { src: "/images/work/isolated/iso-foresight-logo.jpg", alt: "Foresight Logo" },
    { src: "/images/work/isolated/iso-sni-logo.jpg", alt: "Spatial Networks Logo" },
    { src: "/images/work/isolated/iso-fulcrum-logo-og.jpg", alt: "Fulcrum Logo OG" },
    { src: "/images/work/isolated/iso-fulcrum-logo-live.jpg", alt: "Fulcrum Logo Live" },
    { src: "/images/work/isolated/iso-fulcrum-logo.jpg", alt: "Fulcrum Logo" },
    { src: "/images/work/isolated/iso-allinspections-logo.jpg", alt: "Allinspections Logo" },
    { src: "/images/work/isolated/iso-soteriqa-logo.jpg", alt: "Soteriqa Logo" },
    { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide Logo" },
    { src: "/images/work/isolated/iso-personal-murphys-garage.jpg", alt: "Murphy's Garage sticker" },
    { src: "/images/work/isolated/iso-liminallab-icon.jpg", alt: "Liminal Lab mark" },
    { src: "/images/work/isolated/iso-cercana-icon.jpg", alt: "Cercana Systems mark" },
    { src: "/images/work/isolated/iso-exploding-tuba-icon.jpg", alt: "Exploding Tuba Studios mark" },
    { src: "/images/work/isolated/iso-foresight-icon.jpg", alt: "Foresight Icon" },
    { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks Icon" },
    { src: "/images/work/isolated/iso-fulcrum-icon-og.jpg", alt: "Fulcrum Icon OG" },
    { src: "/images/work/isolated/iso-fulcrum-icon.jpg", alt: "Fulcrum Icon" },
    { src: "/images/work/isolated/iso-allinspections-icon.jpg", alt: "Allinspections Icon" },
    { src: "/images/work/isolated/iso-soteriqa-icon.jpg", alt: "Soteriqa Icon" },
    { src: "/images/work/isolated/iso-personal-helmet-concept.jpg", alt: "Helmet design concept" },
  ];

  return (
    <>
      <div className="p-8 pt-24 pb-10 md:p-20 md:pb-28">
        <H1 className="mb-4">Branding</H1>
        <p className="subheading">A collection of logo and identity work, always executed with close collaboration and a tight communication loop with stakeholders. These are a mix of new brands, redesigns, and refreshes.</p>
      </div>

      {/* Gallery Section */}
      <div className="p-8 pb-10 md:p-20 md:pb-28 pt-0">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(0, 23).map((image, index) => (
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