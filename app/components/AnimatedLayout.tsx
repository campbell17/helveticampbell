'use client'

import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface AnimatedLayoutProps {
  children: ReactNode
}

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={true}>
      {/* Key on pathname to trigger animation when route changes */}
      <div key={pathname}>
        {children}
      </div>
    </AnimatePresence>
  )
} 