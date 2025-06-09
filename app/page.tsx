import { Metadata } from 'next'
import { H1, H2, H3, Overline } from './components/Typography'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, CalendarDateRangeIcon, CalendarIcon, DocumentTextIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

// Use static OG image
const ogImageUrl = '/images/social/og-default.png';

export const metadata: Metadata = {
  title: "Tim Campbell",
  description: "I Help Software Teams Design, Build, and Evolve Their Products.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Tim Campbell",
    description: "I Help Software Teams Design, Build, and Evolve Their Products.",
    url: 'https://helveticampbell.com',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Tim Campbell's Portfolio"
      }
    ],
    type: 'website'
  }
}

// Minimal project data for home page
const projectData: Record<string, { tags: string[]; coverImage: string }> = {
  "Fulcrum": {
    tags: ["Fulcrum"],
    coverImage: "/images/work/index/work-index-fulcrum.jpg"
  },
  "Fulcrum Lines and Polygons": {
    tags: ["Lines & Polygons | Fulcrum"],
    coverImage: "/images/work/index/lines-and-polygons-fallback.jpg"
  },
  "Fulcrum Data": {
    tags: ["Fulcrum"],
    coverImage: "/images/work/index/work-index-fulcrum.jpg"
  },
  "Fulcrum Report Builder": {
    tags: ["Fulcrum"],
    coverImage: "/images/work/index/work-index-fulcrum.jpg"
  }
};

// Work images data inlined from HomeContent component
const workImages = [
  // Gallery 1: My Work
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum", gallery: 1 },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum Lines and Polygons", gallery: 1 },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum Data", gallery: 1 },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum Report Builder", gallery: 1 },
];

// WorkItem component functionality inlined
const getProjectUrl = (key: string) => {
  // Handle nested Fulcrum projects
  if (key === 'Fulcrum Lines and Polygons') {
    return '/work/fulcrum-lines-and-polygons';
  }
  if (key === 'Fulcrum Data') {
    return '/work/fulcrum/data';
  }
  if (key === 'Fulcrum Report Builder') {
    return '/work/fulcrum-report-builder';
  }
  
  // Default behavior for other projects
  return `/work/${key.toLowerCase().replace(/\s+/g, '-')}`;
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Helveticampbell',
            url: 'https://helveticampbell.com',
            description: 'I Help Software Teams Design, Build, and Evolve Their Products.',
            author: {
              '@type': 'Person',
              name: 'Tim Campbell',
              url: 'https://helveticampbell.com/who',
            },
            image: 'https://helveticampbell.com/images/social/og-default.png',
          })
        }}
      />
      {/* HomeContent component content inlined */}
      <div className="container-medium px-4 sm:px-6 md:px-8 xl:px-0">
        {/* Website structured data inlined */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: "Helveticampbell - Tim Campbell's Portfolio",
              url: "https://helveticampbell.com",
              description: "I Help Software Teams Design, Build, and Evolve Their Products.",
              author: {
                '@type': 'Person',
                name: 'Tim Campbell',
                url: 'https://helveticampbell.com/who',
                jobTitle: 'Product Designer',
                description: 'I Help Software Teams Design, Build, and Evolve Their Products.',
                sameAs: [
                  'https://github.com/helveticampbell',
                  'https://linkedin.com/in/helveticampbell',
                ],
                image: 'https://helveticampbell.com/images/tim.jpg'
              },
              image: "https://helveticampbell.com/images/og-image.jpg"
            })
          }}
        />
        <H1>I Help Software Teams Design, Build, and Evolve Their Products.</H1>
        
        <div className="subheading">
          Let's make something better together.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workImages.map((image, index) => (
            // WorkItem component content inlined
            <div 
              key={index}
              className="flex flex-col transition-all duration-[var(--duration-300)]"
            >
              <Overline className="flex items-center !text-lg mb-2">{projectData[image.projectKey]?.tags?.[0]}</Overline>
              <Link 
                href={getProjectUrl(image.projectKey)}
                className="container-behavior-primary pane"
              >
                {/* Cover image with customizable aspect ratio */}
                {projectData[image.projectKey]?.coverImage && (
                  <div className="aspect-[21/12] w-full overflow-hidden">
                    <Image
                      src={projectData[image.projectKey]?.coverImage || ''}
                      alt={`Cover for ${image.alt}`}
                      width={1920}
                      height={1080}
                      className="object-cover w-full h-full"
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
} 