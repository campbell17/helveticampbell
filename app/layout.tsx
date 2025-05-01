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
import { defaultMetadata } from './config/siteData'

export const metadata: Metadata = {
  metadataBase: new URL('https://helveticampbell.com'),
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ]
  },
  authors: [{ name: 'Tim Campbell' }],
  creator: 'Tim Campbell',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'relative min-h-screen bg-white font-sans antialiased overflow-x-hidden',
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
        >
          <ProjectSidebarProvider>
            <LoadingProvider>
              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
              <SceneBackground />
              
              <div className="min-h-screen">
                {/* Mobile navigation */}
                <div className="block top-0 left-0 right-0 z-50 md:hidden">
                  <nav className="p-4">
                    <Navigation />
                  </nav>
                </div>

                {/* Desktop sidebar navigation */}
                <div className="fixed pt-12 ml-8 top-0 bottom-0 left-0 w-64 z-50 overflow-y-auto hidden md:block">
                  <nav className="rounded-[var(--container-radius)] p-6 pt-0 flex flex-col h-full">
                    <Navigation />
                    {/* <div className="flex-none mt-6">
                      <ThemeSwitcher />
                    </div> */}
                  </nav>
                </div>

                {/* Main content area with grid layout */}
                <main className="pt-20 pb-16 pl-4 pr-4 md:pt-16 md:pl-64 2xl:pl-72 overflow-visible">
                  <div className="grid grid-cols-12 gap-4 overflow-visible">
                    <AnimatedLayout>
                      {children}
                    </AnimatedLayout>
                  </div>
                </main>
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