'use client'

// import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
// import PageTransition from './PageTransition'

interface AnimatedLayoutProps {
  children: ReactNode
}

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname()

  // Simple check for pages that should use wide layout
  const wideLayoutPaths = ['/writing']
  const useWideLayout = wideLayoutPaths.includes(pathname)
  const maxWidthClass = useWideLayout ? 'max-w-full' : 'max-w-4xl'

  return (
    <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12`}>
      {/* Remove AnimatePresence and PageTransition wrappers */}
      {children}
    </div>
  )
} 