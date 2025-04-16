import type { Metadata } from 'next'
import Link from 'next/link'
import { ThemeProvider } from 'next-themes'

// These styles apply to every route in the application
import './globals.css'
import ParallaxBackground from './components/ParallaxBackground'
import ThemeSwitcher from './components/ThemeSwitcher'

export const metadata: Metadata = {
  title: 'Helveticampbell',
  description: 'Design Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ThemeProvider 
          attribute="data-theme" 
          defaultTheme="system" 
          enableSystem 
          forcedTheme="light"
          disableTransitionOnChange
        >
          {/* Background stays mounted during navigation */}
          <ParallaxBackground />
          
          {/* Content container with fixed margins */}
          <div className="fixed inset-8">
            <div className="relative h-full grid grid-cols-[256px_1fr] gap-8">
              {/* Primary Navigation - independent scroll */}
              <nav className="container-glass rounded-xl p-6 flex flex-col h-full overflow-y-auto">
                <h1 className="font-helvetica text-2xl font-bold text-[hsl(var(--color-text-heading))] mb-10 flex-none">HC</h1>
                <div className="flex flex-col gap-6 mb-6 flex-1 overflow-y-auto">
                  <Link 
                    href="/" 
                    className="block text-lg text-[hsl(var(--color-text-primary)] hover:text-[hsl(var(--color-text-heading))] px-4 py-2 rounded-lg transition-all border border-transparent hover:border-gray-200/20"
                  >
                    About
                  </Link>
                  <Link 
                    href="/work" 
                    className="block text-lg text-[hsl(var(--color-text-primary)] hover:text-[hsl(var(--color-text-heading))] px-4 py-2 rounded-lg transition-all border border-transparent hover:border-gray-200/20"
                  >
                    Work
                  </Link>
                  <Link 
                    href="/writing" 
                    className="block text-lg text-[hsl(var(--color-text-primary)] hover:text-[hsl(var(--color-text-heading))] px-4 py-2 rounded-lg transition-all border border-transparent hover:border-gray-200/20"
                  >
                    Writing
                  </Link>
                </div>
                <div className="flex-none">
                  <ThemeSwitcher />
                </div>
              </nav>

              {/* Main Content - independent scroll */}
              <main className="h-full overflow-hidden">
                <div className="container-glass rounded-xl p-8 h-full overflow-y-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 