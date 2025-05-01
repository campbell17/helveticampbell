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
  const [isProjectOpen, setIsProjectOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setShowBackToTop(window.scrollY > scrollThreshold)
      }
    }

    // Check if a project sidebar is open
    const checkProjectSidebar = () => {
      // Look for the project-sidebar-content element which indicates an open project
      const projectSidebar = document.querySelector('.project-sidebar-content')
      setIsProjectOpen(!!projectSidebar)
    }

    // Set up listeners
    window.addEventListener('scroll', handleScroll)
    
    // Set up a mutation observer to detect when the project sidebar is added/removed from DOM
    const observer = new MutationObserver(() => {
      checkProjectSidebar()
    })
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    })
    
    // Initial checks
    handleScroll()
    checkProjectSidebar()
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [scrollThreshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {showBackToTop && !isProjectOpen && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: ANIMATION_TIMING.enter }}
          exit={{ opacity: 0, y: 20, transition: ANIMATION_TIMING.exit }}
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-6 right-6 text-black/60 hover:text-black transition-colors z-modal w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10"
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