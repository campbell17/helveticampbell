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

  // Not yet...
  // const wideLayoutPaths = ['/work']
  // const useWideLayout = wideLayoutPaths.includes(pathname)
  // const maxWidthClass = useWideLayout ? 'max-w-6xl' : 'max-w-4xl'
  

  return (
    <AnimatePresence mode="wait" initial={true}>
      {/* Key on pathname to trigger animation when route changes */}
      <div 
        key={pathname}
        className="max-w-4xl mx-auto px-0 sm:px-4 md:px-8 py-6 md:py-12"
      >
        {children}
      </div>
    </AnimatePresence>
  )
} 