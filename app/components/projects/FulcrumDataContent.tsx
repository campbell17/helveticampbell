import React from 'react';
import Image from 'next/image';
import { H1, H2, H3, Overline } from '../Typography';
import ProjectNavigation from '../ProjectNavigation';
import { projectTags } from '../../data/projectTags';

const FulcrumDataContent: React.FC = () => {
  const stats = [
    { name: 'Records Processed', stat: '100M+' },
    { name: 'Data Exports', stat: '1M+' },
    { name: 'API Calls Daily', stat: '500K+' },
  ];

  // Get tags from project tags
  const fulcrumTags = projectTags["Fulcrum"] || [];

  return (
    <>
      <div className="px-4 sm:px-6 pb-10 md:px-20">
        <div className="flex flex-wrap mb-8">
          {fulcrumTags.map((tag, index) => (
            <Overline key={index} className="!text-lg mr-8">{tag}</Overline>
          ))}
        </div>
        <H1 className="mb-4">Fulcrum Data<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Data Management & Analytics</span></H1>
        <p className="subheading">Designing intuitive data management tools that help organizations make sense of millions of field records through powerful visualization, filtering, and export capabilities.</p>
      </div>

      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] pt-12 pb-16 px-4 sm:px-6 md:px-20 border-y border-[var(--color-border)]">
        <div className="w-full 2xl:max-w-7xl mx-auto">
          <Overline className="mb-4">Data Platform</Overline>
          <H2>Transforming Field Data into Insights</H2>
          <p className="text-lg max-w-3xl mb-8">
            The Fulcrum data platform processes millions of records daily, providing organizations with powerful tools to visualize, analyze, and export their field-collected information.
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

      {/* Data Viewer Interface */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <div className="mb-4 lg:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 lg:gap-6">
              <div className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '100/60' }}>
                  <Image 
                    src="/images/work/browser/browser-fulcrum-modern-dataviewer.jpg"
                    alt="Fulcrum Modern Data Viewer"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vignette Section */}
      <div className="w-full bg-[var(--mode-color)] border-y border-[var(--color-border)]">
        <div className="vignette-container">
          <div className="vignette-image-container">
            <Image 
              src="/images/work/browser/browser-fulcrum-modern-dataviewer.jpg"
              alt="Fulcrum Data Viewer Interface"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
            />
          </div>
          
          <div className="p-10 md:p-16 lg:p-20">
            <Overline className="mb-4">Data Viewer Redesign</Overline>
            <H3>Modern Data Management</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              A complete redesign of Fulcrum's data viewing interface, focusing on performance with large datasets and intuitive filtering. The new design supports real-time collaboration and advanced export options for enterprise workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Data Features */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Key Features</H2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <H3>Advanced Filtering</H3>
              <p className="text-base text-slate-700">
                Powerful query builder allowing users to filter millions of records by any field combination, with saved filter sets for common workflows.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Real-time Collaboration</H3>
              <p className="text-base text-slate-700">
                Multiple team members can view and work with the same dataset simultaneously, with live updates as new data is collected in the field.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Export & Integration</H3>
              <p className="text-base text-slate-700">
                Flexible export options including CSV, Excel, KML, and direct API integration with enterprise systems like Salesforce and ArcGIS.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Data Visualization</H3>
              <p className="text-base text-slate-700">
                Interactive charts and graphs that automatically update based on filtered data, helping teams identify trends and patterns quickly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <ProjectNavigation currentProject="Fulcrum" />
    </>
  );
}

export default FulcrumDataContent; 