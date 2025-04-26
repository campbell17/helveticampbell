'use client'

import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import PageTransition from './PageTransition'

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
  const wideLayoutPaths = ['/writing']
  const useWideLayout = wideLayoutPaths.includes(pathname)
  const maxWidthClass = useWideLayout ? 'max-w-full' : 'max-w-4xl'
  

  return (
    <div className={`${maxWidthClass} mx-auto px-0 sm:px-4 md:px-8 py-6 md:py-12`}>
      {/* Use PageTransition as the direct child, passing key and className
      <PageTransition 
        key={pathname}
        className={`${maxWidthClass} mx-auto px-0 sm:px-4 md:px-8 py-6 md:py-12`}
      > */}
        {children}
      {/* </PageTransition> */}
    </div>
  )
} 