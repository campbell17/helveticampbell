"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeSwitcher from './ThemeSwitcher'
import { useLoading } from '../contexts/LoadingContext'
import { useState, useEffect } from 'react'

export default function TopNav() {
  const pathname = usePathname()
  const { initiateLoading, isLoading } = useLoading()
  const [scrolled, setScrolled] = useState(false)
  
  // Initialize scroll state and handle scroll effect
  useEffect(() => {
    // Check initial scroll position on mount
    const checkInitialScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    
    // Check immediately
    checkInitialScroll()
    
    // Optimized scroll handler using requestAnimationFrame
    let rafId: number | null = null
    let isScrolling = false
    
    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true
        rafId = requestAnimationFrame(() => {
          setScrolled(window.scrollY > 480)
          isScrolling = false
          rafId = null
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])
  
  const navLinks = [
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/who' },
  ]

  const handleLinkClick = (href: string) => {
    if (href !== pathname) {
      initiateLoading(100); // Reduced from 600ms to 100ms for better responsiveness
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, delay: 0.25, ease: 'easeOut' }}
      className={`w-full sticky top-0 z-99 transition-all duration-500 `}>
      <nav
        className={`w-full mx-auto flex items-center justify-between px-4 sm:px-6 pt-6 transition-all duration-200 ${scrolled ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-0 sm:gap-2">
          <Link href="/" className="mr-6 flex" onClick={() => handleLinkClick('/')}>
            {/* LoadingLogo component inlined */}
            <div className="relative inline-block h-9 w-12 transition-all duration-200">
              {/* Original Logo SVG */}
              <div className="absolute inset-0 flex items-center justify-center h-9 w-12">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.87 51.26" className="h-full w-full" fill="none">
                  <path className="transition-all" fill={`${pathname.startsWith('/work/') ? (scrolled ? 'var(--logo-color)' : 'var(--mode-color)') : 'var(--logo-color)'}`} d="M61.73,31.25c.47-4.22-.3-7.16-2.31-8.82-2-1.66-4.86-2.49-8.56-2.5h0s-5.94,0-5.94,0L49.16,0h-9.63l-4.28,19.93h-9.83L29.71,0h-12.32c-2.41,0-4.67.39-6.77,1.19C6.71,2.69,3.79,5.39,1.84,9.29.18,12.61-.36,15.54.23,18.08c.59,2.54,2.88,4.55,6.86,6.01l3.55-7.09c-1.03-.41-1.85-1-2.45-1.77-.79-1.08-.78-2.44.04-4.08,1.17-2.33,3.24-3.59,6.23-3.78,1.16-.07,2.5.04,4.02.34l-9.02,42.31h9.63l5.01-23.55h9.83l-5.01,23.55h8.84c1.66.82,3.75,1.24,6.31,1.24,4.76,0,8.71-1.69,11.86-5.08,1.97-2.1,3.29-4.33,3.96-6.68h-7.9c-.49,1.56-1.22,2.82-2.19,3.8-.97.98-2.36,1.47-4.17,1.47-2.55,0-4.03-1.23-4.43-3.69-.22-1.32-.1-3.07.35-5.24.49-2.28,1.13-4.11,1.93-5.48,1.5-2.59,3.56-3.88,6.16-3.88,1.83,0,3.05.6,3.67,1.79.42.89.58,1.88.49,2.99h7.93Z"/>
                </svg>
              </div>

              {/* Spinning Ring - Appears only when isLoading is true */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center h-9 w-12 scale-125"
                    initial={{ opacity: 0, scale: 1.75 }}
                    animate={{ opacity: 1, scale: 1.75 }}
                    exit={{ opacity: 0, scale: 1.75 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg 
                      className="animate-spin-fast text-logo-spinner-color h-9 w-12"
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      {/* Background circle (strokeWidth=1) */}
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="1"
                      ></circle>
                      
                      {/* Replace the path with a dashed circle segment */}
                      <circle 
                        className="opacity-75" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        fill="none"
                        stroke="currentColor" 
                        strokeWidth="1"
                        strokeDasharray="16 46.83"
                        strokeLinecap="round"
                      ></circle>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>
          
          {/* Navigation links */}
          {navLinks.map((link) => {
            // Check if current path starts with the link path (for nested routes)
            // But make sure we're not matching "/" with everything
            const isActive = link.href !== '/' && pathname.startsWith(link.href);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg py-2 px-2 rounded-md transition-all duration-200 relative
                  ${isActive ? 'text-[var(--text-color)]' : 'text-[var(--text-color-light)] hover:text-[var(--text-color)]'}
                  ${pathname.startsWith('/work/') ? (scrolled ? 'text-[var(--mode-color)]' : 'text-white') : 'text-[var(--logo-color)]'}
                `}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    className="absolute left-2 right-2 bottom-1 h-0.5 rounded-full bg-[var(--theme-color)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        
      </nav>
    </motion.div>
  )
} 