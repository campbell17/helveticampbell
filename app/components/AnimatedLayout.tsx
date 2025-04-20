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
      <div 
        key={pathname}
        className="max-w-4xl mx-auto px-8 py-12 bg-gradient-to-b from-white/0 from-10% via-white/20 via-30% to-white/50 to-90% rounded-[var(--container-radius)]"
      >
        {children}
      </div>
    </AnimatePresence>
  )
} 