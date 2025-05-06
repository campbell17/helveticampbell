import { Metadata } from 'next'
import WhoContent from '../components/WhoContent'

// For debugging - let's build the OG URL in a more explicit way
const ogTitle = 'About Tim Campbell';
const ogSubtitle = 'A history of my design career, two ways.';
const ogImage = '/images/tim.jpg';
const ogImageUrl = `/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}&image=${encodeURIComponent(ogImage)}`;

export const metadata: Metadata = {
  title: 'About Tim Campbell',
  description: 'A history of my design career, two ways.',
  alternates: {
    canonical: '/who',
  },
  openGraph: {
    title: 'About Tim Campbell',
    description: 'A history of my design career, two ways.',
    url: 'https://helveticampbell.com/who',
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

export default function WhoPage() {
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
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'Fulcrum',
              url: 'https://www.fulcrumapp.com'
            }
          })
        }}
      />
      <WhoContent />
    </>
  )
}