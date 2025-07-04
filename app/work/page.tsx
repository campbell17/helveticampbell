import { Metadata } from 'next'
import Link from 'next/link'
import { H1, H2, Overline } from '../components/Typography'
import ContactButton from '../components/ContactButton'
import { DocumentTextIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

// Use static OG image
const ogImageUrl = '/images/social/og-default.png';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Work',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'About Tim Campbell',
    description: 'Work',
    url: 'https://helveticampbell.com/work',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Tim Campbell'
      }
    ],
    type: 'website'
  }
}

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Tim Campbell',
            description: 'Designer with extensive experience in web and mobile applications.',
            url: 'https://helveticampbell.com/who',
            image: 'https://helveticampbell.com/images/tim.jpg',
            jobTitle: 'Product Designer',
            sameAs: [
              'https://campbellseventeen.substack.com/'
            ]
          })
        }}
      />
      <div className="container-wide px-4 sm:px-6 md:px-8 xl:px-0 py-48">
        {/* Person structured data inlined */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Tim Campbell',
              url: 'https://helveticampbell.com/work',
              jobTitle: 'Product Designer',
              description: 'I Help Software Teams Design, Build, and Evolve Their Products.',
              sameAs: [
                'https://github.com/helveticampbell',
                'https://linkedin.com/in/helveticampbell',
              ],
              image: 'https://helveticampbell.com/images/tim.jpg'
            })
          }}
        />
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <H1>Work</H1>
        </div>
        
        <div className="subheading">
          A brief snapshot. Always in progress.
        </div>

        <div className="flex flex-col gap-32">
          <div>
            <Overline className="!text-base mb-2">2010-2025</Overline>
            <a className="mb-6 group inline-flex items-center hover:text-primary" href="/work/fulcrum">
              <H2 className="text-2xl lg:text-5xl font-bold text-text-heading font-display !mb-0">Fulcrum</H2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-6 h-6 ml-2 group-hover:text-[var(--color-link)] group-hover:translate-x-2 transition-translate duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
              </svg>
            </a>            
            <p>I joined the Fulcrum team as the founding designer after working on another internal project, stepping in to elevate the product's visual identity, lead the design of its iOS, Android, and web apps, and establish consistent UX patterns that would form the foundation of the Fulcrum design system in the years that followed. <Link href="/work/fulcrum">Read the full case study</Link></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Image 
                  src="/images/work/browser/browser-fulcrum-app-builder-prototype.jpg"
                  alt="Fulcrum Modern Builder Selected"
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  className="rounded-xl shadow-lg"
                  priority
                />
              </div>
              <div className="relative">
                <Image 
                  src="/images/work/browser/browser-fulcrum-app-dashboard-prototype.jpg"
                  alt="Fulcrum Modern Builder Selected"
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  className="rounded-xl shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
          <div>
            <Overline className="!text-base mb-2">2012-2014</Overline>
            <a className="mb-6 group inline-flex items-center hover:text-primary" href="/work/divide">
              <H2 className="text-2xl lg:text-5xl font-bold text-text-heading font-display !mb-0">Divide</H2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-6 h-6 ml-2 group-hover:text-[var(--color-link)] group-hover:translate-x-2 transition-translate duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
              </svg>
            </a>            
            <p>I teamed up with Exploding Tuba Studios on their debut game, Divide. I helped shape the branding & marketing, worked on the game menus, combat HUD, and a ton of in-game assets. <Link href="/work/divide">View project</Link></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Image 
                  src="/images/work/full/full-divide-screenshot-1.jpg"
                  alt="Fulcrum Modern Builder Selected"
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  className="rounded-xl shadow-lg"
                  priority
                />
              </div>
              <div className="relative">
                <Image 
                  src="/images/work/full/full-divide-screenshot-2.jpg"
                  alt="Fulcrum Modern Builder Selected"
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  className="rounded-xl shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
          <div>
            <Overline className="!text-base mb-2">Alpha-Omega</Overline>
            <span className="mb-6 group inline-flex items-center hover:text-primary">
              <H2 className="text-2xl lg:text-5xl font-bold text-text-heading font-display !mb-0">Archive</H2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-6 h-6 ml-2 group-hover:text-red-500 transition-all duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path>
              </svg>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm !text-red-500 -mt-0.5">not yet!</span>
            </span>            
            <p>An unsortable cacaphony of screenshots, logos, sketches, paintings, photos, and other abomonations unsuitable for human consumption. <span className="highlighter px-1">coming soon...</span></p>
          </div>
        </div>
      </div>
    </>
  )
}