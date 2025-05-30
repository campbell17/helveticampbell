import React from 'react';
import Image from 'next/image';
import { H1, H2, H3, Overline } from '../Typography';
import ProjectNavigation from '../ProjectNavigation';
import { projectTags } from '../../data/projectTags';

const FulcrumEvolutionContent: React.FC = () => {
  const stats = [
    { name: 'Years of Development', stat: '13+' },
    { name: 'Major Releases', stat: '50+' },
    { name: 'Features Shipped', stat: '200+' },
  ];

  // Get tags from project tags
  const fulcrumTags = projectTags["Fulcrum"] || [];

  const evolutionImages = [
    { src: "/images/work/browser/browser-fulcrum-modern-builder-empty.jpg", alt: "Modern App Builder", aspectRatio: "100/60" },
    { src: "/images/work/browser/browser-fulcrum-modern-builder-selected.jpg", alt: "App Builder with Selection", aspectRatio: "100/60" },
    { src: "/images/work/browser/browser-fulcrum-modern-apps-empty.jpg", alt: "Modern Apps Interface", aspectRatio: "100/60" },
    { src: "/images/work/browser/browser-fulcrum-modern-apps-context.jpg", alt: "Apps with Context Menu", aspectRatio: "100/60" },
    { src: "/images/work/browser/browser-fulcrum-modern-apps-list.jpg", alt: "Apps List View", aspectRatio: "100/60" },
  ];

  return (
    <>
      <div className="px-4 sm:px-6 pb-10 md:px-20">
        <div className="flex flex-wrap mb-8">
          {fulcrumTags.map((tag, index) => (
            <Overline key={index} className="!text-lg mr-8">{tag}</Overline>
          ))}
        </div>
        <H1 className="mb-4">Fulcrum Evolution<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Product Development Journey</span></H1>
        <p className="subheading">From a simple data collection tool to a comprehensive enterprise platform - the 13-year evolution of Fulcrum's user experience and feature set.</p>
      </div>

      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] pt-12 pb-16 px-4 sm:px-6 md:px-20 border-y border-[var(--color-border)]">
        <div className="w-full 2xl:max-w-7xl mx-auto">
          <Overline className="mb-4">Product Evolution</Overline>
          <H2>Continuous Innovation & Growth</H2>
          <p className="text-lg max-w-3xl mb-8">
            Over 13 years, Fulcrum has evolved from a startup MVP to an enterprise-grade platform, with each iteration building upon user feedback and emerging technology trends.
          </p>
          
          <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 font-sans">
              {stats.map((item) => (
                <div key={item.name} className="overflow-hidden bg-white/50 gametime:bg-[var(--theme-color)] dark:bg-[var(--pane-bg-color)] rounded-lg px-4 py-5 shadow shadow-[var(--color-shadow)] sm:p-6">
                  <dt className="truncate text-sm font-medium">{item.name}</dt>
                  <dd className="mt-1 text-xl md:text-3xl font-semibold">{item.stat}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Modern Interface Gallery */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Modern Interface Design</H2>
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
      <div className="w-full bg-[var(--mode-color)] border-y border-[var(--color-border)]">
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
            <Overline className="mb-4">App Builder Evolution</Overline>
            <H3>Drag & Drop Simplicity</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              The evolution from complex form builders to an intuitive drag-and-drop interface that allows non-technical users to create sophisticated data collection apps in minutes, not hours.
            </p>
          </div>
        </div>
      </div>

      {/* Evolution Timeline */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Key Milestones</H2>
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <Overline>2012-2014</Overline>
                <H3>Foundation</H3>
                <p className="text-base text-slate-700">
                  Initial platform launch with basic data collection, photo capture, and GPS functionality. Focus on mobile-first design and offline capabilities.
                </p>
              </div>
              
              <div className="space-y-4">
                <Overline>2015-2017</Overline>
                <H3>Enterprise Features</H3>
                <p className="text-base text-slate-700">
                  Introduction of user management, advanced permissions, API integrations, and the first version of the visual app builder.
                </p>
              </div>
              
              <div className="space-y-4">
                <Overline>2018-2020</Overline>
                <H3>Platform Maturity</H3>
                <p className="text-base text-slate-700">
                  Major UI/UX overhaul, introduction of Groups, advanced geometry collection, and enterprise-grade security features.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Overline>2021-2023</Overline>
                <H3>Modern Platform</H3>
                <p className="text-base text-slate-700">
                  Complete redesign with modern React architecture, improved performance, advanced analytics, and enhanced collaboration tools.
                </p>
              </div>
              
              <div className="space-y-4">
                <Overline>2024-Present</Overline>
                <H3>AI Integration</H3>
                <p className="text-base text-slate-700">
                  Integration of AI-powered features for data analysis, automated workflows, and intelligent form suggestions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <ProjectNavigation currentProject="Fulcrum" />
    </>
  );
}

export default FulcrumEvolutionContent; 