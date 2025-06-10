'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Animation timing constants matching ProjectSidebar
const ANIMATION_TIMING = {
  exit: {
    duration: 0.3,
    ease: "easeOut"
  },
  enter: {
    duration: 0.2,
    ease: "easeOut"
  },
}

interface BackToTopProps {
  scrollThreshold?: number
}

export default function BackToTop({ scrollThreshold = 300 }: BackToTopProps) {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (typeof window !== 'undefined') {
            setShowBackToTop(window.scrollY > scrollThreshold)
          }
          ticking = false
        })
        ticking = true
      }
    }

    // Set up scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    handleScroll()
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollThreshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: ANIMATION_TIMING.enter }}
          exit={{ opacity: 0, y: 20, transition: ANIMATION_TIMING.exit }}
          onClick={scrollToTop}
          className="cursor-pointer pane fixed top-6 right-6 transition-colors z-modal w-12 h-12 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
} 