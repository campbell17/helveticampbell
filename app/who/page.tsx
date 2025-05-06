import { Metadata } from 'next'
import WhoContent from '../components/WhoContent'

export const metadata: Metadata = {
  title: 'About Tim Campbell',
  description: 'A history of my design career, two ways.',
  openGraph: {
    title: 'About Tim Campbell',
    description: 'A history of my design career, two ways.',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('About Tim Campbell')}&subtitle=${encodeURIComponent('A history of my design career, two ways.')}&image=${encodeURIComponent('/images/tim.jpg')}`,
        width: 1200,
        height: 630,
        alt: 'Tim Campbell'
      }
    ],
    type: 'website'
  }
}

export default function WhoPage() {
  return <WhoContent />
}