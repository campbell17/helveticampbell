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
        <div className="placement-center">
          <H1>I Help Software Teams Design, Build, and Evolve Their Products.</H1>
          <div className="subheading !mb-0">
            Let's make something better together.
          </div>
        </div>

        {/* <H2 className="mt-48">Work</H2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link href="/work/fulcrum" className="group block">
            <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/work/index/work-index-fulcrum.jpg"
                alt="Fulcrum B2B SaaS project"
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <Overline className="mb-2">Case study</Overline>
            <H3 className="mb-0">Fulcrum (B2B SaaS)</H3>
          </Link>

          <Link href="/work/divide" className="group block">
            <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/work/index/work-index-divide.jpg"
                alt="Divide PS4 project"
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <Overline className="mb-2">Visual Design</Overline>
            <H3 className="mb-0">Divide (PS4)</H3>
          </Link>

          <Link href="/work/panthers" className="group block">
            <div className="mb-4 overflow-hidden rounded-lg shadow-lg bg-red-700">
              <div className="w-full h-64 bg-red-700"></div>
            </div>
            <Overline className="mb-2">Experiment</Overline>
            <H3 className="mb-0">Panthers Logo Remix</H3>
          </Link>
        </div> */}

      </div>
    </>
  )
} 