import './globals.css'
import './theme.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import SceneBackground from './components/SceneBackground'
import ThemeSwitcher from './components/ThemeSwitcher'
import Navigation from './components/Navigation'
import AnimatedLayout from './components/AnimatedLayout'
import CustomScrollbar from './components/CustomScrollbar'
import { cn } from './lib/utils'
import { font } from './lib/fonts'

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
          {/* Background stays mounted during navigation */}
          <SceneBackground />
          
          {/* Layout container */}
          <div className="min-h-screen flex flex-col">
            <div className="flex-1 relative">
              {/* Fixed navigation sidebar */}
              <div className="fixed top-12 bottom-12 left-8 w-64 z-50">
                <nav className="rounded-[var(--container-radius)] p-6 flex flex-col h-full">
                  {/* <H1 className="mb-10 flex-none">HC</H1> */}
                  <Navigation />
                  <div className="flex-none">
                    <ThemeSwitcher />
                  </div>
                </nav>
              </div>

              {/* Main content area - wrap in AnimatedLayout for transitions */}
              <main className="pl-80 pr-8 pt-16 pb-16">
                <div className="max-w-[1200px] mx-auto">
                  <AnimatedLayout>
                    {children}
                  </AnimatedLayout>
                </div>
              </main>
            </div>

          </div>
          <CustomScrollbar />
        </ThemeProvider>
      </body>
    </html>
  )
} 