import React from 'react';
import { H1, H2, H3, Overline } from '../../components/Typography';
import Image from 'next/image';
import TimelineStats from '../../components/ui/TimelineStats';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Lines & Polygons | GIS Feature Development | Tim Campbell',
  description: 'A shift in company focus back to our GIS roots - developing line and polygon geometry capabilities for Fulcrum\'s data collection platform.',
};

// Data constants inlined from FulcrumLinesAndPolygonsContent
const stats = [
  { name: 'Time to Customer - Initial Solution', stat: '4+ Q' },
  { name: 'Time to Customer - Ultimate Solution', stat: '1Q' },
];

const evolutionImages = [
  { src: "/images/work/browser/browser-fulcrum-modern-builder-empty.jpg", alt: "Modern App Builder", aspectRatio: "100/60" },
  { src: "/images/work/browser/browser-fulcrum-modern-builder-selected.jpg", alt: "App Builder with Selection", aspectRatio: "100/60" },
  { src: "/images/work/browser/browser-fulcrum-modern-apps-empty.jpg", alt: "Modern Apps Interface", aspectRatio: "100/60" },
  { src: "/images/work/browser/browser-fulcrum-modern-apps-context.jpg", alt: "Apps with Context Menu", aspectRatio: "100/60" },
];

const customerQuotes = [
  {
    quote: "The new interface completely transformed how our field teams create and manage data collection apps. What used to take our IT department hours now takes our field supervisors minutes.",
    author: "Sarah Chen",
    title: "Operations Director",
    company: "Environmental Solutions Inc."
  },
  {
    quote: "We went from dreading app updates to actually looking forward to them. The drag-and-drop builder is so intuitive that even our least tech-savvy team members are creating their own forms.",
    author: "Michael Rodriguez",
    title: "Field Operations Manager", 
    company: "Infrastructure Analytics"
  },
  {
    quote: "The evolution of Fulcrum has been remarkable. We've seen a 400% increase in user engagement since the redesign, and our data quality has never been better.",
    author: "Jennifer Walsh",
    title: "Director of Digital Transformation",
    company: "Municipal Services Group"
  }
];

export default function FulcrumLinesAndPolygonsPage() {
  return (
    <div className="project-page">
      {/* Fulcrum Lines and Polygons content inlined from FulcrumLinesAndPolygonsContent component */}
      
      {/* Hero Video */}
      <div className="-mt-6 md:-mt-12 mb-16">
        <div className="aspect-[21/11.8] w-full overflow-hidden shadow-md">
          <Image
            src="/images/work/index/lines-and-polygons-fallback.jpg"
            alt="Fulcrum Lines and Polygons Feature"
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
            priority={false}
            loading="lazy"
          />
        </div>
      </div>
      <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0 pb-10">
        <H1 className="mb-4">Lines & Polygons<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Fulcrum</span></H1>
      </div>
        
      {/* Problem/Context Section */}
      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] py-12 border-y border-[var(--color-border)]">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Context</Overline>
          <H2>A Shift in Priority</H2>
          <p className="!mb-4">
            After a long-term pivot toward dispatching and workforce management, the corporate objectives shifted back toward adding the long-requested capability of creating lines and polygons in Fulcrum records. 
          </p>          
        </div>
      </div>

      {/* Solution Section */}
      <div className="w-full pt-16 pb-20">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Problem</Overline>
          <H2 className="mb-8">Our Primary Challenge</H2>
          <p className="text-lg !mb-8">
            One of the reasons we passed on adding this capability over the years was due to the complexity and team resources required. Work behind the scenes at the corporate level generated a joint partnership with industry giant Esri, opening the door to an integration with their SDK. 
          </p>
          <p className="text-lg">Working with a product manager, a staff engineer, and a combination of mid-level and senior front-end and back-end engineers, I was responsible for creative direction, design, and prototyping the end-to-end experience.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="!space-y-4">
              <H3><em>A</em> Solution...</H3>
              <p className="text-base text-[var(--text-color)]">
                We aimed to integrate with the well-established Esri SDK and add the new geometry capability to our existing map editor. i.e., build the controls and UI functionality ourselves.
              </p>
              <ul className="!text-base list-disc list-inside">
                <strong>Benefit</strong>
                <li>Full customizability of the implementation/design patterns</li>
              </ul>
              <ul className="!text-base list-disc list-inside">
                <strong>Tradeoff</strong>
                <li>Requires longer than desirable design / development time - this is something that only emerged after digging in to the initial stages of a home-grown solution. I combed back through our initial research paths...</li>
              </ul>
            </div>
            
            <div className="!space-y-4">
              <H3><em>The</em> Solution</H3>
              <p className="text-base text-[var(--text-color)]">
                Digging back in to the SDK documentation, I found a standalone version of the capability to draw line & polygon geometry, which allowed us to integrate a more out-of-the-box solution and keep us from "reinventing the wheel".
              </p>
              <ul className="!text-base list-disc list-inside">
                <strong>Benefit</strong>
                <li>Significantly cut down the delivery time by not having to design/develop the building blocks in-house</li>
              </ul>
              <ul className="!text-base list-disc list-inside">
                <strong>Tradeoff</strong>
                <li>Lose customizability by having to adopt elements of Esri's design patterns in their out-of-the-box widget</li>
              </ul>
            </div>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {evolutionImages.map((image, index) => (
              <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: image.aspectRatio || '100/60' }}>
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

      {/* Impact Section with TimelineStats Client Component */}
      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] py-16 border-y border-[var(--color-border)]">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Impact</Overline>
          <H2>A tradeoff worth making</H2>
          <p className="text-lg mb-8">
            The mantra I chanted to the team about the tradeoff of using the fully-integrated Esri widget was "Time-To-Customer". Yes, our customers had already waited years for this, and yes, some could argue "they can just wait a bit longer, can't they?". However, the estimates for completion of our internal version kept growing with every check-in, and in the end they were approaching 4+ quarters. In the end, the standalone solution ended up taking just over 1Q.
          </p>
          
          {/* Timeline Comparison using Client Component */}
          <TimelineStats stats={stats} />
        </div>
      </div>

      {/* Problem Section 2 */}
      <div className="w-full pt-16 pb-20">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Problem</Overline>
          <H2 className="mb-8">A Hidden Wrinkle</H2>
          <p className="text-lg mb-12">
            In trying to solve the resource allocation problem, The team put any ideas about altering the map on the back burner due to the intensity of the primary objective, i.e., adding the new GIS functionality. In testing out initial prototypes, however, it became clear to me that keeping our existing map would make the experience of the new functionality unacceptably cumbersome, which may have a sizable negative impact on first impressions and overall adoption. In addition, and this is a major reason for the hesitance to address the map layout, the record editor was one in a series of features developed in the early days of the product, and the team had grown hesitant to make changes to the legacy code. <strong className="highlighter">How might we address this issue without a) interrupting the team's focus on the primary objective of adding new functionality, and b) the risk of breaking the existing functionality of a legacy feature?</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="!space-y-4">
              <H3>Fast-tracking The Approach</H3>
              <p className="text-base text-[var(--text-color)]">
                This was a problem that couldn't be solved with Figma prototypes alone. Being deeply familiar with the codebase gave me the advantage of being able to spin up a local dev branch and start experimenting with ways to alter our approach to layout using only the CSS, thereby alleviating concerns regarding the existing functionality of the legacy feature.
              </p>
            </div>
            
            <div className="!space-y-4">
              <H3>The Result</H3>
              <p className="text-base text-[var(--text-color)]">
                In less than a week, I had a working version available in a PR for the team to be able to pressure-test everything in the browser so we could be certain it would work in production. We also took this opportunity to run the updated layout through our beta testing customers to iterate on their feedback before going forward with a general release.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {evolutionImages.map((image, index) => (
              <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: image.aspectRatio || '100/60' }}>
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

      {/* Customer Quotes Section */}
      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] pt-16 pb-20 border-y border-[var(--color-border)]">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Customer Reception</Overline>
          <H2>In Short...they loved it.</H2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {customerQuotes.map((testimonial, index) => (
              <div key={index} className="bg-white/50 dark:bg-[var(--pane-bg-color)] rounded-lg p-6 shadow shadow-[var(--color-shadow)]">
                <blockquote className="text-base text-[var(--text-color)] mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-[var(--color-border)] pt-4">
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-sm text-[var(--text-color-light)]">{testimonial.title}</div>
                  <div className="text-sm text-[var(--text-color-light)]">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="w-full pt-16 pb-20">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Post Mortem</Overline>
          <H2>But...What could we have done better?</H2>
          <p className="text-lg mb-8">
            While we were able to avoid disaster, building this feature exposed some holes in our early discovery process. We used this feature as an example of a near miss in future shaping sessions, increasing our thoughtfulness and our rigor as we de-risked our feature requests.
          </p>
        </div>
      </div>
    </div>
  );
} 