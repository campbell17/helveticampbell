import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import { H1 } from './components/Typography'
import { Inter } from 'next/font/google'
import './globals.css'
import './theme.css'
import SceneBackground from './components/SceneBackground'
import ThemeSwitcher from './components/ThemeSwitcher'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Helvetica Campbell',
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
      <body className={inter.className}>
        <ThemeProvider 
          attribute="data-theme" 
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Background stays mounted during navigation */}
          <SceneBackground />
          
          {/* Fixed header and footer */}
          <Header />
          <Footer />
          
          {/* Layout container */}
          <div className="relative">
            {/* Fixed navigation sidebar */}
            <div className="fixed top-12 bottom-12 left-8 w-64 z-50">
              <nav className="container-glass rounded-[var(--container-radius)] p-6 flex flex-col h-full">
                <H1 className="mb-10 flex-none">HC</H1>
                <div className="flex flex-col gap-2 mb-6 flex-1">
                  <Link href="/" className="nav-link">
                    About
                  </Link>
                  <Link href="/work" className="nav-link">
                    Work
                  </Link>
                  <Link href="/writing" className="nav-link">
                    Writing
                  </Link>
                </div>
                <div className="flex-none">
                  <ThemeSwitcher />
                </div>
              </nav>
            </div>

            {/* Main content area */}
            <main className="pl-80 pr-8 pt-16 pb-16 min-h-screen">
              <div className="max-w-[1200px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 