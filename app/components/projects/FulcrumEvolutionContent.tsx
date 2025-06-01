'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { H1, H2, H3, Overline } from '../Typography';
import ProjectNavigation from '../ProjectNavigation';
import { projectTags } from '../../data/projectTags';

const FulcrumEvolutionContent: React.FC = () => {
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTimelineVisible(true);
          observer.disconnect(); // Stop observing once animation is triggered
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { name: 'Time to Customer - Initial Solution', stat: '4+ Q' },
    { name: 'Time to Customer - Ultimate Solution', stat: '1Q' },
  ];

  // Get tags from project tags
  const fulcrumTags = projectTags["Fulcrum"] || [];

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

  return (
    <>
      <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0 pb-10">
        {/* <div className="flex flex-wrap mb-8">
          {fulcrumTags.map((tag, index) => (
            <Overline key={index} className="!text-lg mr-8">{tag}</Overline>
          ))}
        </div> */}
        <H1 className="mb-4">Lines & Polygons<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Fulcrum</span></H1>
        <p className="subheading">A shift in company focus back to our GIS roots.</p>
        
        {/* Hero Video */}
        <div className="mt-12 mb-16">
          <div className="aspect-[21/11.8] w-full overflow-hidden rounded-xl shadow-md">
            <video
              src="/images/work/index/lines-and-polygons.webm"
              poster="/images/work/index/lines-and-polygons-fallback.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
          </div>
        </div>
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
          <p className="text-lg mb-12">
            One of the reasons we passed on adding this capability over the years was due to the complexity and team resources required. <strong>How might we finally tackle this problem without incurring the opportunity cost of ceasing work on other priorities?</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="!space-y-4">
              <H3>Initial Solution</H3>
              <p className="text-base text-[var(--text-color)]">
                Integrate with the well-established Esri SDK and add the new geometry capability to our existing map editor. i.e., build the controls and UI functionality ourselves.
              </p>
              <ul className="!text-base list-disc list-inside">
                <strong>Benefits</strong>
                <li>Full customizability of the implementation/design patterns</li>
              </ul>
              <ul className="!text-base list-disc list-inside">
                <strong>Tradeoffs</strong>
                <li>Requires longer than desirable design / development time</li>
              </ul>
            </div>
            
            <div className="!space-y-4">
              <H3>Ultimate Solution</H3>
              <p className="text-base text-[var(--text-color)]">
              After a number of weeks, the progress was slower than anticipated. Being familiar with how robust and thorough their documentation, I performed additional research to see if the Esri SDK offered a standalone version of the capability to draw line & polygon geometry, which they did, allowing us to integrate a more out-of-the-box solution and keep us from "reinventing the wheel".
              </p>
              <ul className="!text-base list-disc list-inside">
                <strong>Benefits</strong>
                <li>Significantly cut down the delivery time by not having to design/develop the building blocks in-house</li>
              </ul>
              <ul className="!text-base list-disc list-inside">
                <strong>Tradeoffs</strong>
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

      {/* Vignette Section */}
      {/* <div className="w-full bg-[var(--mode-color)] border-y border-[var(--color-border)]">
        <div className="vignette-container">
          <div className="vignette-image-container">
            <Image 
              src="/images/work/browser/browser-fulcrum-modern-builder-selected.jpg"
              alt="Fulcrum App Builder Evolution"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
            />
          </div>
          
          <div className="p-10 md:p-16 lg:p-20">
            <Overline className="mb-4">Key Innovation</Overline>
            <H3>Visual App Builder</H3>
            <p className="text-base text-[var(--text-color)] max-w-xl mt-4">
              The centerpiece of our redesign: a drag-and-drop app builder that allows users to create sophisticated data collection applications without any technical knowledge, while maintaining full access to advanced configuration options.
            </p>
          </div>
        </div>
      </div> */}

      {/* Impact Section */}
      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] py-12 border-y border-[var(--color-border)]">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Impact</Overline>
          <H2>A tradeoff worth making</H2>
          <p className="text-lg mb-8">
            The mantra I chanted to the team about the tradeoff of using the fully-integrated Esri widget was "Time-To-Customer". Yes, our customers had already waited years for this, and yes, some could argue "they can just wait a bit longer, can't they?". However, the estimates for completion of our internal version kept growing with every check-in, and in the end they were approaching 4+ quarters. In the end, the standalone solution ended up taking just over 1Q.
          </p>
          

          {/* Timeline Comparison */}
          <div className="mt-12" ref={timelineRef}>
            <H3 className="mb-6">Timeline Comparison</H3>
            <div className="space-y-4">
              {/* Initial Solution */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Initial Solution</span>
                  <span className="text-sm text-[var(--text-color-light)]">4+ Quarters</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
                  <div 
                    className={`bg-rose-500 h-3 rounded-full ${isTimelineVisible ? 'animate-[timeline-grow_0.75s_ease-out_0.25s_both]' : 'w-0'}`}
                    style={{ '--final-width': '100%' } as React.CSSProperties}
                  ></div>
                </div>
              </div>
              
              {/* Ultimate Solution */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Ultimate Solution</span>
                  <span className="text-sm text-[var(--text-color-light)]">1 Quarter</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
                  <div 
                    className={`bg-lime-500 h-3 rounded-full ${isTimelineVisible ? 'animate-[timeline-grow_0.75s_ease-out_0.5s_both]' : 'w-0'}`}
                    style={{ '--final-width': '25%' } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-[var(--text-color-light)] mt-4">
              The ultimate solution delivered the same functionality in 75% less time
            </p>
          </div>

        </div>
      </div>

      {/* Problem Section 2 */}
      <div className="w-full pt-16 pb-20">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Problem</Overline>
          <H2 className="mb-8">A Hidden Wrinkle</H2>
          <p className="text-lg mb-12">
            In trying to solve the resource allocation problem, The team put any ideas about altering the map on the back burner due to the intensity of the primary objective, i.e., adding the new GIS functionality. In testing out initial prototypes, however, it became clear to me that keeping our existing map would make the experience of the new functionality unacceptably cumbersome, which may have a sizable negative impact on first impressions and overall adoption. In addition, and this is a major reason for the hesitance to address the map layout, the record editor was one in a series of features developed in the early days of the product, and the team had grown hesitant to make changes to the legacy code. <strong>How might we address this issue without a) interrupting the team's focus on the primary objective of adding new functionality, and b) the risk of breaking the existing functionality of a legacy feature?</strong>
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
      <div className="w-full pt-12 pb-16">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Post Mortem</Overline>
          <H2>But...What could we have done better?</H2>
          <p className="text-lg mb-8">
            While we were able to avoid disaster, building this feature exposed some holes in our early discovery process. We used this feature as an example of a near miss in future shaping sessions, increasing our thoughtfulness and our rigor as we de-risked our feature requests.
          </p>
          
        </div>
      </div>

      {/* Project Navigation */}
      <ProjectNavigation currentProject="Fulcrum" />

      <style jsx>{`
        @keyframes timeline-grow {
          from {
            width: 0%;
          }
          to {
            width: var(--final-width);
          }
        }
      `}</style>
    </>
  );
}

export default FulcrumEvolutionContent; 