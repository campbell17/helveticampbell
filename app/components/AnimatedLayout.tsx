'use client'

import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface AnimatedLayoutProps {
  children: ReactNode
}

// Remove the unused interface
// interface LayoutAwareComponent {
//   layoutWide?: boolean;
// }

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname()
  
  // Simple check for pages that should use wide layout
  // Add more paths to this array as needed
  const wideLayoutPaths = ['/work']
  const useWideLayout = wideLayoutPaths.includes(pathname)
  
  // Apply appropriate max-width based on current path
  const maxWidthClass = useWideLayout ? 'max-w-6xl' : 'max-w-4xl'

  return (
    <AnimatePresence mode="wait" initial={true}>
      {/* Key on pathname to trigger animation when route changes */}
      <div 
        key={pathname}
        className={`${maxWidthClass} mx-auto px-8 py-12 bg-gradient-to-b from-white/0 from-20% via-white/60 via-98% to-white/0`}
      >
        {children}
      </div>
    </AnimatePresence>
  )
} 