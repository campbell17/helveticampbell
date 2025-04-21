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
import { font } from './lib/fonts'
import { ProjectSidebarProvider } from './contexts/ProjectSidebarContext'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Helveticampbell',
  description: 'Portfolio and creative works',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ]
  }
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
        font.variable
      )}>
        <ThemeProvider 
          attribute="data-theme" 
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ProjectSidebarProvider>
            {/* Background stays mounted during navigation */}
            <SceneBackground />
            
            {/* Layout container */}
            <div className="min-h-screen flex flex-col">
              {/* Mobile Header - visible only on smaller screens */}
              <header className="md:hidden fixed top-0 left-0 right-0 p-4 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <Link href="/">
                    <div className="font-helveticampbell font-[900] tracking-normal text-xl relative transition-colors duration-200">
                      Helveticampbell
                    </div>
                  </Link>
                  <ThemeSwitcher />
                </div>
                <div className="mt-2">
                  <Navigation variant="horizontal" />
                </div>
              </header>

              <div className="flex-1 relative">
                {/* Fixed navigation sidebar - visible only on larger screens */}
                <div className="fixed pt-12 ml-8 top-0 bottom-0 left-0 w-64 z-50 overflow-y-auto hidden md:block">
                  <nav className="rounded-[var(--container-radius)] p-6 pt-0 flex flex-col h-full">
                    <Navigation variant="vertical" />
                    <div className="flex-none mt-6">
                      <ThemeSwitcher />
                    </div>
                  </nav>
                </div>

                {/* Main content area - wrap in AnimatedLayout for transitions 
                     Adjust padding based on screen size */}
                <main className="pt-16 pb-16 pl-4 pr-4 md:pl-72 md:pr-[clamp(16px,calc(8px+0vw),288px)] 2xl:pr-72">
                  <div className="max-w-[1200px] mx-auto">
                    <AnimatedLayout>
                      {children}
                    </AnimatedLayout>
                  </div>
                </main>
              </div>
            </div>
            <CustomScrollbar />
            <BackToTop />
          </ProjectSidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 