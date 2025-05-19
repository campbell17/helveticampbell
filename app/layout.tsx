import 'nprogress/nprogress.css'
import './globals.css'
import './theme.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import SceneBackground from './components/SceneBackground'
import ThemeSwitcher from './components/ThemeSwitcher'
import Navigation from './components/Navigation'
import AnimatedLayout from './components/AnimatedLayout'
import CustomScrollbar from './components/CustomScrollbar'
import BackToTop from './components/BackToTop'
import { cn } from './lib/utils'
import { fontVariables } from './lib/fonts'
import { ProjectSidebarProvider } from './contexts/ProjectSidebarContext'
import { LoadingProvider } from './contexts/LoadingContext'
import { NavigationEvents } from './components/NavigationEvents'
import { Suspense } from 'react'
import Footer from './components/Footer'
import TopNav from './components/TopNav'

// Use environment variables if available, or default to localhost during development
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://helveticampbell.com';

export const metadata: Metadata = {
  title: 'Helveticampbell',
  description: 'Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up',
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
        url: `${siteUrl}/api/og?title=Helveticampbell&subtitle=Versatile%2C%20product-focused%20design.%20Building%2C%20shipping%2C%20and%20evolving%20digital%20experiences%20from%20the%20ground%20up`,
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
    images: [`${siteUrl}/api/og?title=Helveticampbell&subtitle=Versatile%2C%20product-focused%20design.%20Building%2C%20shipping%2C%20and%20evolving%20digital%20experiences%20from%20the%20ground%20up`],
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
          <ProjectSidebarProvider>
            <LoadingProvider>
              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
              <SceneBackground />
              
              {/* Global Top navigation bar */}
              {/* <ThemeSwitcher />               */}
              <div className="relative min-h-screen">
              <TopNav />
                {/* Mobile navigation */}
                {/* <div className="block top-0 left-0 right-0 z-50 md:hidden">
                  <nav className="p-6">
                    <Navigation />                    
                  </nav>
                </div> */}

                {/* Desktop sidebar navigation */}
                {/* <div className="fixed pt-12 ml-8 top-0 bottom-0 left-0 w-64 z-50 overflow-y-auto hidden md:block">
                  <nav className="rounded-[var(--container-radius)] p-6 pt-0 flex flex-col h-full">
                    <Navigation />
                    <div className="flex-none mt-6">
                      <ThemeSwitcher />
                    </div>
                  </nav>
                </div> */}

                {/* Main content area with grid layout */}
                <main className="py-20 mx-auto overflow-visible">
                  <div className="grid grid-cols-12 gap-4 overflow-visible">
                    <AnimatedLayout>
                      {children}
                    </AnimatedLayout>
                  </div>
                </main>
                
                {/* Footer */}
                <Footer />
              </div>
              <CustomScrollbar />
              <BackToTop />
            </LoadingProvider>
          </ProjectSidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 