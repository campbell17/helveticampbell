import type { Metadata } from 'next'
import Link from 'next/link'
import { ThemeProvider } from 'next-themes'

// These styles apply to every route in the application
import './globals.css'
import SceneBackground from './components/SceneBackground'
import ThemeSwitcher from './components/ThemeSwitcher'

export const metadata: Metadata = {
  title: 'Helveticampbell',
  description: 'Design Portfolio',
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
      <body className="min-h-screen">
        <ThemeProvider 
          attribute="data-theme" 
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
          enableColorScheme={false}
        >
          {/* Background stays mounted during navigation */}
          <SceneBackground />
          
          {/* Content container with fixed margins */}
          <div className="fixed inset-8">
            <div className="relative h-full grid grid-cols-[256px_1fr] gap-8">
              {/* Primary Navigation - independent scroll */}
              <nav className="container-glass rounded-[var(--container-radius)] p-6 flex flex-col h-full overflow-y-auto">
                <h1 className="font-helvetica text-2xl font-bold text-[hsl(var(--color-text-heading))] mb-10 flex-none">HC</h1>
                <div className="flex flex-col gap-6 mb-6 flex-1">
                  <Link 
                    href="/" 
                    className="block text-lg text-[hsl(var(--color-text-primary))] hover:text-[hsl(var(--color-text-heading))] px-4 py-2 rounded-[var(--button-radius)] border border-transparent hover:border-[hsl(var(--color-border-hover))] transition-[border-color,color] duration-[var(--duration-50)]"
                  >
                    About
                  </Link>
                  <Link 
                    href="/work" 
                    className="block text-lg text-[hsl(var(--color-text-primary))] hover:text-[hsl(var(--color-text-heading))] px-4 py-2 rounded-[var(--button-radius)] border border-transparent hover:border-[hsl(var(--color-border-hover))] transition-[border-color,color] duration-[var(--duration-50)]"
                  >
                    Work
                  </Link>
                  <Link 
                    href="/writing" 
                    className="block text-lg text-[hsl(var(--color-text-primary))] hover:text-[hsl(var(--color-text-heading))] px-4 py-2 rounded-[var(--button-radius)] border border-transparent hover:border-[hsl(var(--color-border-hover))] transition-[border-color,color] duration-[var(--duration-50)]"
                  >
                    Writing
                  </Link>
                </div>
                <div className="flex-none">
                  <ThemeSwitcher />
                </div>
              </nav>

              {/* Main Content - independent scroll */}
              <main className="h-full overflow-y-auto">
                <div className="container-glass rounded-[var(--container-radius)] h-full">
                  <div className="p-8">
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 