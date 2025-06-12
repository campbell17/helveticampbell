import 'nprogress/nprogress.css'
import './globals.css'
import './theme.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import BackToTop from './components/BackToTop'
import { cn } from './lib/utils'
import { fontVariables } from './lib/fonts'
import { LoadingProvider } from './contexts/LoadingContext'
import { NavigationEvents } from './components/NavigationEvents'
import { Suspense } from 'react'
import Footer from './components/Footer'
import TopNav from './components/TopNav'
import DotGridBackground from './components/DotGridBackground'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';


// Use environment variables if available, or default to localhost during development
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://helveticampbell.com';

export const metadata: Metadata = {
  title: 'Helveticampbell',
  description: 'I Help Software Teams Design, Build, and Evolve Their Products',
  keywords: ['portfolio', 'creative', 'design', 'product design', 'web design'],
  authors: [{ name: 'Tim Campbell' }],
  creator: 'Tim Campbell',
  publisher: 'Tim Campbell',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Helveticampbell',
    description: 'Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up',
    url: siteUrl,
    siteName: 'Helveticampbell',
    images: [
      {
        url: `${siteUrl}/images/social/og-default.png`,
        width: 1200,
        height: 630,
        alt: 'Helveticampbell Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Helveticampbell',
    description: 'Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up',
    images: [`${siteUrl}/images/social/og-default.png`],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'KPqruPwJRTNLAO0juM2JU-k6-KEYfJjvvJSnVyavFJo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'relative min-h-screen bg-white font-sans antialiased',
        fontVariables.bitter,
        fontVariables.merriweather,
        fontVariables.lato,
        fontVariables.latoSans,
        fontVariables.mono,
        fontVariables.lobster
      )}>
        <ThemeProvider 
          attribute="data-theme" 
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          forcedTheme={undefined}
          themes={['light', 'dark', 'fun', 'gametime', 'grove', 'woking', 'maranello']}
          value={{
            light: 'light',
            dark: 'dark',
            fun: 'fun',
            gametime: 'gametime',
            grove: 'grove',
            woking: 'woking',
            maranello: 'maranello'
          }}
        >
          <LoadingProvider>
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>

            <div className="relative min-h-screen grid grid-rows-[min-content_1fr_min-content]">
              <DotGridBackground />
              <TopNav />

              <main className="mx-auto overflow-visible content-center">
                <div className="grid grid-cols-12 gap-4 overflow-visible">
                  <div className="grid-wide-content overflow-visible">
                    {children}
                    <Analytics />
                    <SpeedInsights />
                  </div>
                </div>
              </main>
              
              <Footer />
            </div>

            <BackToTop />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 