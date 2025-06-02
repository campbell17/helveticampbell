'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { H1, H2, H3, Overline } from '../Typography';
import ProjectNavigation from '../ProjectNavigation';
import { projectTags } from '../../data/projectTags';

const FulcrumReportBuilderContent: React.FC = () => {
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

  const pointOfContactImages = [
    { src: "/images/work/browser/browser-fulcrum-modern-builder-empty.jpg", alt: "Modern App Builder", aspectRatio: "100/60" },
    { src: "/images/work/browser/browser-fulcrum-modern-builder-selected.jpg", alt: "App Builder with Selection", aspectRatio: "100/60" },
    { src: "/images/work/browser/browser-fulcrum-modern-apps-empty.jpg", alt: "Modern Apps Interface", aspectRatio: "100/60" },
    { src: "/images/work/browser/browser-fulcrum-modern-apps-context.jpg", alt: "Apps with Context Menu", aspectRatio: "100/60" },
  ];

  const hybridImages = [
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
        <H1 className="mb-4">Custom Report Builder<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Fulcrum</span></H1>
        <p className="subheading">Plugging a hole in our hull.</p>
        
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
          <H2>Reporting in Fulcrum</H2>
          <p className="!mb-4">
            A significant part of Fulcrum's value is the ability not only to collect rich field data, but to generate PDF reports of that data for customers, company stakeholders, analysts, government officials, or any other "end consumers" who aren't the primary users of Fulcrum.  The ability to create reports was a long-requested feature, but it was never prioritized due to the complexity and team resources required.  
          </p>          
        </div>
      </div>

      {/* Solution Section */}
      <div className="w-full pt-16">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Problem</Overline>
          <H2 className="mb-8">&lsquo;Good Enough&rsquo; No Longer</H2>
          <p className="text-lg !mb-8">
            What began as a whisper of gripes about the lack of custom options in our reporting engine grew over time. Before long, the whispers turned into shouts as we begin to fall behind some market competitors whose reporting customizability outshined ours. <strong>How might we address this long-standing contention in a way that satisfies our customers without exceeding our engineering appetite?</strong>
          </p>
          <p className="text-lg">I teamed up with our product manager, CTO, and a senior front end engineer, and was responsible for designing an updated end-to-end experience including UX research, design & prototyping, as well as helping track down some gnarly css bugs in the template preview pane.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="!space-y-4">
              <H3>Constraint 1: Placement</H3>
              <p className="text-base text-[var(--text-color)]">
                While it could be considered desirable to make the report builder a global object, realistically we knew the complexity involved in scoping the work that way would add a costly amount of time to the project.
              </p>
            </div>
            
            <div className="!space-y-4">
              <H3>Constraint 2: Needs vs. Wants</H3>
              <p className="text-base text-[var(--text-color)]">
                How much is too much functionality? We needed to add the missing value our users desired without giving into the temptation of building in more than would solve the core pain our current solution caused.
              </p>
            </div>
            
          </div>
        </div>

        </div>
      <div className="w-full pb-20">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Solution</Overline>
          <H2 className="mb-8">The Point of Contact</H2>
          <p className="text-lg">
            What began as a whisper of gripes about the lack of custom options in our reporting engine grew over time. Before long, the whispers turned into shouts as we begin to fall behind some market competitors whose reporting customizability outshined ours. <strong>How might we address this long-standing contention in a way that satisfies our customers without exceeding our engineering appetite?</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {pointOfContactImages.map((image, index) => (
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

      <div className="w-full pb-20">
        <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
          <Overline className="!text-base mb-4">Solution</Overline>
          <H2 className="mb-8">A Hybrid Approach</H2>
          <p className="text-lg">
            What began as a whisper of gripes about the lack of custom options in our reporting engine grew over time. Before long, the whispers turned into shouts as we begin to fall behind some market competitors whose reporting customizability outshined ours. <strong>How might we address this long-standing contention in a way that satisfies our customers without exceeding our engineering appetite?</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {hybridImages.map((image, index) => (
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
      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] py-16 border-y border-[var(--color-border)]">
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
            
            <p className="text-sm text-[var(--text-color-light)] mt-4 !mb-4">
              The ultimate solution delivered the same functionality in 75% less time
            </p>
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

export default FulcrumReportBuilderContent; 