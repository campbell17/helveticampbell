import React from 'react';
import Image from 'next/image';
import { H1, H2, H3, Overline } from '../Typography';
import ProjectNavigation from '../ProjectNavigation';
import { projectTags } from '../../data/projectTags';

const FulcrumCommunityContent: React.FC = () => {
  const stats = [
    { name: 'Crisis Responses', stat: '500+' },
    { name: 'Emergency Organizations', stat: '150+' },
    { name: 'Lives Impacted', stat: '1M+' },
  ];

  // Get tags from project tags
  const fulcrumTags = projectTags["Fulcrum"] || [];

  const communityImages = [
    { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-1.jpg", alt: "FEMA Field Operations 1" },
    { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-2.jpg", alt: "FEMA Field Operations 2" },
    { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-1.jpg", alt: "Crisis Response Office 1" },
    { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-2.jpg", alt: "Crisis Response Office 2" },
  ];

  return (
    <>
      <div className="px-4 sm:px-6 pb-10 md:px-20">
        <div className="flex flex-wrap mb-8">
          {fulcrumTags.map((tag, index) => (
            <Overline key={index} className="!text-lg mr-8">{tag}</Overline>
          ))}
        </div>
        <H1 className="mb-4">Fulcrum Community<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Crisis Response Platform</span></H1>
        <p className="subheading">Designing tools that help emergency response teams coordinate effectively during natural disasters, humanitarian crises, and community emergencies.</p>
      </div>

      <div className="w-full bg-neutral-500/10 dark:bg-[var(--pane-bg-color)] backdrop-blur-[1px] pt-12 pb-16 px-4 sm:px-6 md:px-20 border-y border-[var(--color-border)]">
        <div className="w-full 2xl:max-w-7xl mx-auto">
          <Overline className="mb-4">Crisis Response</Overline>
          <H2>Technology for Emergency Response</H2>
          <p className="text-lg max-w-3xl mb-8">
            Fulcrum Community provides emergency response organizations with real-time coordination tools, enabling faster response times and better resource allocation during critical situations.
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

      {/* Field Operations Gallery */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Field Operations</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {communityImages.map((image, index) => (
              <div key={image.src || index} className="cursor-default relative group overflow-hidden rounded-xl shadow-md">
                <div className="relative" style={{ aspectRatio: '4/3' }}>
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
              src="/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-1.jpg"
              alt="FEMA Crisis Response Operations"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
            />
          </div>
          
          <div className="p-10 md:p-16 lg:p-20">
            <Overline className="mb-4">FEMA Partnership</Overline>
            <H3>Disaster Response Coordination</H3>
            <p className="text-base text-slate-700 max-w-xl mt-4">
              Working directly with FEMA and other emergency response agencies to provide real-time data collection and coordination tools during natural disasters and humanitarian crises.
            </p>
          </div>
        </div>
      </div>

      {/* Community Features */}
      <div className="p-8 pb-10 md:p-20 md:pb-28">
        <div className="max-w-none">
          <H2 className="mb-8">Community Response Features</H2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <H3>Real-time Coordination</H3>
              <p className="text-base text-slate-700">
                Live updates and notifications ensure all team members have access to the latest information, critical for time-sensitive emergency response operations.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Offline Capabilities</H3>
              <p className="text-base text-slate-700">
                Robust offline functionality ensures data collection continues even when cellular networks are compromised during disasters.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Resource Tracking</H3>
              <p className="text-base text-slate-700">
                Track personnel, equipment, and supplies in real-time to optimize resource allocation and ensure efficient response operations.
              </p>
            </div>
            
            <div className="space-y-4">
              <H3>Multi-Agency Collaboration</H3>
              <p className="text-base text-slate-700">
                Secure data sharing between multiple agencies and organizations while maintaining appropriate access controls and privacy protections.
              </p>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-[var(--pane-bg-color)] rounded-lg p-8 shadow shadow-[var(--color-shadow)]">
            <H3 className="mb-4">Impact Stories</H3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Hurricane Response</h4>
                <p className="text-base text-slate-700">
                  During Hurricane Harvey, Fulcrum Community enabled FEMA teams to coordinate rescue operations across Houston, helping process over 10,000 rescue requests and coordinate resources for displaced families.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Wildfire Management</h4>
                <p className="text-base text-slate-700">
                  California fire departments use Fulcrum Community to track evacuation zones, coordinate firefighting resources, and communicate with residents during wildfire emergencies.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Pandemic Response</h4>
                <p className="text-base text-slate-700">
                  Public health departments leveraged the platform for contact tracing, vaccine distribution coordination, and testing site management during the COVID-19 pandemic.
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

export default FulcrumCommunityContent; 