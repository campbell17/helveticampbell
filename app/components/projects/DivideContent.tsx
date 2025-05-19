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

const DivideContent: React.FC = () => {
  // Images directly in the component
  const images: ImageData[] = [
    { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide Logo" },
    { src: "/images/work/isolated/iso-divide-vestige-sticker.jpg", alt: "Divide Vestige Sticker" },
    { src: "/images/work/full/full-divide-ingame-world-1.jpg", alt: "Divide In-Game World 1", aspectRatio: "10/5" },
    { src: "/images/work/full/full-divide-ingame-world-2.jpg", alt: "Divide In-Game World 2", aspectRatio: "10/5" },
    { src: "/images/work/full/full-divide-ingame-world-3.jpg", alt: "Divide In-Game World 3", aspectRatio: "10/5" },
    { src: "/images/work/full/full-divide-ingame-UI-1.jpg", alt: "Divide In-Game UI 1", aspectRatio: "10/5" },
    { src: "/images/work/full/full-divide-ingame-UI-2.jpg", alt: "Divide In-Game UI 2", aspectRatio: "10/5" },
    { src: "/images/work/full/full-divide-ingame-codex-1.jpg", alt: "Divide In-Game Codex 1", aspectRatio: "10/5" },
    { src: "/images/work/full/full-divide-ingame-codex-2.jpg", alt: "Divide In-Game Codex 2", aspectRatio: "10/5" },
    { src: "/images/work/full/full-divide-ingame-codex-3.jpg", alt: "Divide In-Game Codex 3", aspectRatio: "10/5" },
    { src: "/images/work/full/full-divide-ingame-codex-4.jpg", alt: "Divide In-Game Codex 4", aspectRatio: "10/5" },
    { src: "/images/work/full/full-divide-brochure-1.jpg", alt: "Divide Brochure 1" },
    { src: "/images/work/full/full-divide-brochure-2.jpg", alt: "Divide Brochure 2" },
    { src: "/images/work/full/full-divide-ps4.jpg", alt: "Divide PS4" },
    { src: "/images/work/gridded/grid-divide-icons.jpg", alt: "Divide Icons" },
    { src: "/images/work/full/full-divide-soundtrack.jpg", alt: "Divide Soundtrack" },
    { src: "/images/work/full/full-divide-soundtrack-deluxe.jpg", alt: "Divide Soundtrack Deluxe" },
    { src: "/images/work/full/full-divide-soundtrack-ep.jpg", alt: "Divide Soundtrack EP" },
    { src: "/images/work/snapshots/snapshot-divide-recording-1.jpg", alt: "Divide Recording Session" }
  ];

  return (
    <>
      <div className="p-8 pt-24 pb-10 md:p-20 md:pb-28">
        <div className="flex flex-wrap mb-8">
          <Overline className="!text-lg mr-8">UI</Overline>
          <Overline className="!text-lg mr-8">Branding</Overline>
          <Overline className="!text-lg mr-8">Game Design</Overline>
          <Overline className="!text-lg mr-8">Icon Design</Overline>
          <Overline className="!text-lg mr-8">Marketing Design</Overline>
        </div>
        <H1 className="mb-4">Divide<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Action / Adventure Game (PS4)</span></H1>
        <p className="subheading">(2014) A character-driven, science fiction action/adventure game with a modern take on isometric adventures of the past. I designed the logo, UI assets, icons, menus, HUD, and map, as well as posters and branding for the in-game world.</p>
      </div>


      {/* Gallery Section */}
      <div className="p-8 pb-10 md:p-20 md:pb-28 pt-0">
        <div className="max-w-none">
          
          {/* Row */}
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(0, 2).map((image, index) => (
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
                images.filter(img => !img.fullWidth).slice(2, 11).map((image, index) => (
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
                images.filter(img => !img.fullWidth).slice(11, 13).map((image, index) => (
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
      <div className="w-full bg-[var(--mode-color)] border-y border-[var(--color-border)]">
        <div className="vignette-container">
          {/* Left column - Full-bleed image */}
          <div className="vignette-image-container">
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
            <Overline className="mb-4">Icons</Overline>
            <H3>Divide In-Game Icons</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              We needed a custom icon set that matched the futuristic setting for Divide and the 'Vestige' corporation. These were used in-game as waypoints and item markers.
            </p>
          </div>
        </div>
      </div>

      {/* Vignette Section 2 */}
      <div className="w-full bg-[var(--mode-color)] border-b border-[var(--color-border)]">
        <div className="vignette-container">
          {/* Left column - Full-bleed image */}
          <div className="vignette-image-container">
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
            <Overline className="mb-4">Sony Playstation</Overline>
            <H3>Divide Playstation Assets</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              One of the highlights of the project was knowing it would be released on the Playstation, allowing me to create the menu assets like the background poster and trophy icons I'd seen in so many other games I played.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          
          {/* Row */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {
                images.filter(img => !img.fullWidth).slice(15, 18).map((image, index) => (
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
      <div className="w-full bg-[var(--mode-color)] border-y mb-28 border-[var(--color-border)]">
        <div className="vignette-container">
          {/* Left column - Full-bleed image */}
          <div className="vignette-image-container">
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
            <Overline className="mb-4">Soundtrack</Overline>
            <H3>Divide Sountrack Cover</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              In addition to the game design, Divide creator and musical composer Chris Tilton asked me to design the cover for the soundtrack and its EP and Deluxe Edition variants. This was toward the end of the project and it was rewarding to pull in some well-established design elements to tie everything together. This photo was captured during one of the recording sessions for the game's soundtrack (<Link href="https://open.spotify.com/album/7dxKI9RCXe3tL9WrmLknPe" rel="noopener noreferrer" target="_blank">check it out on Spotify</Link>).
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DivideContent; 