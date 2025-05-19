'use client'

// import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
// import PageTransition from './PageTransition'

interface AnimatedLayoutProps {
  children: ReactNode
}

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  // const pathname = usePathname()

  // // Simple check for pages that should use wide layout
  // const wideLayoutPaths = ['/writing']
  // const useWideLayout = wideLayoutPaths.includes(pathname)
  
  // // Use our new utility grid classes
  // const gridClass = useWideLayout ? 'grid-wide-content' : 'grid-narrow-content'

  return (
    <div className={`grid-wide-content py-6 md:py-12 overflow-visible`}>
      {/* Remove AnimatePresence and PageTransition wrappers */}
      {children}
    </div>
  )
} 