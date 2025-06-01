import React from 'react';
import Image from 'next/image';
import { H1, H2, H3, Overline } from '../Typography';
import ProjectNavigation from '../ProjectNavigation';
import { projectTags } from '../../data/projectTags';

const FulcrumReportBuilderContent: React.FC = () => {
  const stats = [
    { name: 'Custom Reports', stat: '10,000+' },
    { name: 'Active Users', stat: '2,500+' },
    { name: 'Data Points Visualized', stat: '50M+' },
  ];

  // Get tags from project tags
  const fulcrumTags = projectTags["Fulcrum Report Builder"] || [];

  const reportBuilderImages = [
    { src: "/images/work/browser/browser-fulcrum-modern-dataviewer.jpg", alt: "Fulcrum Data Viewer Interface" },
    { src: "/images/work/browser/browser-fulcrum-modern-apps-list.jpg", alt: "Fulcrum Apps Dashboard" },
    { src: "/images/work/browser/browser-fulcrum-modern-apps-context.jpg", alt: "Fulcrum Context Menu" },
    { src: "/images/work/browser/browser-fulcrum-modern-builder-selected.jpg", alt: "Fulcrum Form Builder" },
  ];

  return (
    <>
      <div className="px-4 sm:px-6 pb-10 md:px-20">
        <div className="flex flex-wrap mb-8">
          {fulcrumTags.map((tag, index) => (
            <Overline key={index} className="!text-lg mr-8">{tag}</Overline>
          ))}
        </div>
        <H1 className="mb-4">Fulcrum Report Builder<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Data Visualization Platform</span></H1>
        <p className="subheading">Designing an intuitive report builder that enables users to create custom reports and visualizations from their field data.</p>
      </div>

      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] pt-12 pb-16 px-4 sm:px-6 md:px-20 border-y border-[var(--color-border)]">
        <div className="w-full 2xl:max-w-7xl mx-auto">
          <Overline className="mb-4">Data Visualization</Overline>
          <H2>Powerful Report Creation Tools</H2>
          <p className="text-lg max-w-3xl mb-8">
            Fulcrum Report Builder empowers users to create sophisticated reports and visualizations from their field data, making complex analytics accessible to non-technical team members.
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

      {/* Interface Gallery */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Report Builder Interface</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {reportBuilderImages.map((image, index) => (
              <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '16/10' }}>
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
              src="/images/work/browser/browser-fulcrum-modern-dataviewer.jpg"
              alt="Fulcrum Data Viewer Interface"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
            />
          </div>
          
          <div className="p-10 md:p-16 lg:p-20">
            <Overline className="mb-4">Data Analytics</Overline>
            <H3>Intuitive Report Creation</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              Designed to make complex data analysis accessible to all team members, regardless of their technical background or data visualization experience.
            </p>
          </div>
        </div>
      </div>

      {/* Report Builder Features */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Report Builder Features</H2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <H3>Drag & Drop Interface</H3>
              <p className="text-base text-slate-700">
                Intuitive drag-and-drop interface makes it easy for users to create complex reports without any technical knowledge or coding skills.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Real-time Data</H3>
              <p className="text-base text-slate-700">
                Reports automatically update with the latest field data, ensuring stakeholders always have access to current information for decision-making.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Multiple Export Formats</H3>
              <p className="text-base text-slate-700">
                Export reports in various formats including PDF, Excel, and interactive web views to meet different organizational needs and workflows.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Custom Visualizations</H3>
              <p className="text-base text-slate-700">
                Create charts, graphs, maps, and other visualizations to help teams understand patterns and insights hidden in their field data.
              </p>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-[var(--pane-bg-color)] rounded-lg p-8 shadow shadow-[var(--color-shadow)]">
            <H3 className="mb-4">Success Stories</H3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Infrastructure Management</h4>
                <p className="text-base text-slate-700">
                  Municipal engineering teams use Fulcrum Report Builder to create automated infrastructure reports, reducing manual reporting time by 75% while improving data accuracy.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Environmental Monitoring</h4>
                <p className="text-base text-slate-700">
                  Environmental consultants generate custom compliance reports that automatically update with new field measurements, streamlining regulatory reporting processes.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Asset Tracking</h4>
                <p className="text-base text-slate-700">
                  Facilities management teams create dynamic asset reports that help track maintenance schedules, equipment status, and budget allocations across multiple properties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        <div className="lg:col-span-2">
          <p>
            Fulcrum Report Builder provides organizations with powerful data visualization tools, enabling them to create custom reports and gain insights from their field operations data.
          </p>
          <p>
            The challenge was designing an interface that made complex report creation accessible to non-technical users while maintaining the flexibility needed for advanced analytics.
          </p>
        </div>
        <div className="flex items-center">
          <div className="p-6 bg-white/5 border border-[var(--color-border)] rounded-lg w-full">
            <div className="text-sm text-secondary uppercase tracking-wide mb-2">Role</div>
            <div className="text-primary mb-4">UX/UI Design, Product Design</div>
            <div className="text-sm text-secondary uppercase tracking-wide mb-2">Timeline</div>
            <div className="text-primary">6 months</div>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <ProjectNavigation currentProject="Fulcrum" />
    </>
  );
}

export default FulcrumReportBuilderContent; 