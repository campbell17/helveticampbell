import { Metadata } from 'next'
import WorkContent from '../components/WorkContent'

// Define OG image parameters
const ogTitle = 'Work';
const ogSubtitle = 'See a few examples of my work, learn how I got my start, and hear what it\'s like to work with me from the people who have.';
const ogImageUrl = `/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}`;

export const metadata: Metadata = {
  title: 'Work | Helveticampbell',
  description: 'See a few examples of my work, learn how I got my start, and hear what it\'s like to work with me from the people who have.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Work | Helveticampbell',
    description: 'See a few examples of my work, learn how I got my start, and hear what it\'s like to work with me from the people who have.',
    url: 'https://helveticampbell.com/work',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Tim Campbell\'s Design Work'
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
            '@type': 'CollectionPage',
            name: 'Tim Campbell\'s Design Work',
            description: 'See a few examples of my work, learn how I got my start, and hear what it\'s like to work with me from the people who have.',
            url: 'https://helveticampbell.com/work',
            author: {
              '@type': 'Person',
              name: 'Tim Campbell',
              url: 'https://helveticampbell.com/who',
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@type': 'CreativeWork',
                    name: 'Fulcrum',
                    url: 'https://helveticampbell.com/work',
                    image: 'https://helveticampbell.com/images/work/isolated/iso-fulcrum-icon.png'
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'CreativeWork',
                    name: 'Spatial Networks',
                    url: 'https://helveticampbell.com/work',
                    image: 'https://helveticampbell.com/images/work/isolated/iso-sni-icon.jpg'
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@type': 'CreativeWork',
                    name: 'Divide for PS4',
                    url: 'https://helveticampbell.com/work',
                    image: 'https://helveticampbell.com/images/work/isolated/iso-divide-logo.jpg'
                  }
                }
              ]
            }
          })
        }}
      />
      <WorkContent />
    </>
  )
} 