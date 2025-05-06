import { Metadata } from 'next'
import HomeContent from './components/HomeContent'

// Define OG image parameters
const ogTitle = 'Helveticampbell';
const ogSubtitle = 'Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up';
const ogImageUrl = `/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}`;

export const metadata: Metadata = {
  title: "Helveticampbell",
  description: "Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Helveticampbell",
    description: "Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up.",
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
            description: 'Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up.',
            author: {
              '@type': 'Person',
              name: 'Tim Campbell',
              url: 'https://helveticampbell.com/who',
            },
            image: 'https://helveticampbell.com/images/social/og-default.png',
          })
        }}
      />
      <HomeContent />
    </>
  )
} 