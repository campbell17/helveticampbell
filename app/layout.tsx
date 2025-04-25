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
            {/* Background stays mounted during navigation */}
            <SceneBackground />
            
            {/* Layout container */}
            <div className="min-h-screen flex flex-col">
              <div className="flex-1 relative">
                {/* Mobile navigation - visible only on smaller screens */}
                <div className="block top-0 left-0 right-0 z-50 md:hidden">
                  <nav className="p-4">
                    <Navigation />
                  </nav>
                </div>

                {/* Fixed navigation sidebar - visible only on larger screens */}
                <div className="fixed pt-12 ml-8 top-0 bottom-0 left-0 w-64 z-50 overflow-y-auto hidden md:block">
                  <nav className="rounded-[var(--container-radius)] p-6 pt-0 flex flex-col h-full">
                    <Navigation />
                    <div className="flex-none mt-6">
                      <ThemeSwitcher />
                    </div>
                  </nav>
                </div>

                {/* Main content area - wrap in AnimatedLayout for transitions 
                     Adjust padding based on screen size */}
                <main className="pt-20 pb-16 pl-4 pr-4 md:pt-16 md:pl-72 md:pr-[clamp(16px,calc(8px+0vw),288px)] 2xl:pr-72">
                  <div className="mx-auto">
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