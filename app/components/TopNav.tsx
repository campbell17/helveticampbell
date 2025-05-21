"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeSwitcher from './ThemeSwitcher'
import LoadingLogo from './LoadingLogo'
import { useLoading } from '../contexts/LoadingContext'
import { Menu, MenuItem, MenuItems } from '@headlessui/react'
import { useState, useEffect } from 'react'

export default function TopNav() {
  const pathname = usePathname()
  const { initiateLoading } = useLoading()
  const [isWorkHovered, setIsWorkHovered] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])
  
  const navLinks = [
    { name: 'Writing', href: '/writing' },
    { name: 'Who', href: '/who' },
  ]

  // Work projects for the dropdown menu based on the actual project files
  const workProjects = [
    { name: 'Overview', href: '/work' },
    { name: 'Fulcrum', href: '/work/fulcrum' },
    { name: 'Spatial Networks', href: '/work/spatial-networks' },
    { name: 'Divide', href: '/work/divide' },
    { name: 'Allinspections', href: '/work/allinspections' },
    { name: 'Branding', href: '/work/branding' },
    { name: 'Art', href: '/work/personal' },
  ]

  const handleLinkClick = (href: string) => {
    if (href !== pathname) {
      initiateLoading(600);
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, delay: 0.25, ease: 'easeOut' }}
      className={`w-full sticky top-0 z-99 transition-all duration-500 ${scrolled ? 'bg-[var(--mode-color-topnav)]' : 'bg-transparent'}`}>
      <nav
        className="w-full mx-auto flex items-center justify-between px-4 sm:px-6 py-6"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-0 sm:gap-2">
          <Link href="/" className="mr-6 flex" onClick={() => handleLinkClick('/')}>
            <LoadingLogo sizeClasses="h-9 w-12" className="transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.87 51.26" className="h-full w-full" fill="none">
                <path fill="var(--logo-color)" d="M61.73,31.25c.47-4.22-.3-7.16-2.31-8.82-2-1.66-4.86-2.49-8.56-2.5h0s-5.94,0-5.94,0L49.16,0h-9.63l-4.28,19.93h-9.83L29.71,0h-12.32c-2.41,0-4.67.39-6.77,1.19C6.71,2.69,3.79,5.39,1.84,9.29.18,12.61-.36,15.54.23,18.08c.59,2.54,2.88,4.55,6.86,6.01l3.55-7.09c-1.03-.41-1.85-1-2.45-1.77-.79-1.08-.78-2.44.04-4.08,1.17-2.33,3.24-3.59,6.23-3.78,1.16-.07,2.5.04,4.02.34l-9.02,42.31h9.63l5.01-23.55h9.83l-5.01,23.55h8.84c1.66.82,3.75,1.24,6.31,1.24,4.76,0,8.71-1.69,11.86-5.08,1.97-2.1,3.29-4.33,3.96-6.68h-7.9c-.49,1.56-1.22,2.82-2.19,3.8-.97.98-2.36,1.47-4.17,1.47-2.55,0-4.03-1.23-4.43-3.69-.22-1.32-.1-3.07.35-5.24.49-2.28,1.13-4.11,1.93-5.48,1.5-2.59,3.56-3.88,6.16-3.88,1.83,0,3.05.6,3.67,1.79.42.89.58,1.88.49,2.99h7.93Z"/>
              </svg>
            </LoadingLogo>
          </Link>

          {/* Work dropdown menu */}
          <div 
            className="relative"
            onMouseEnter={() => setIsWorkHovered(true)}
            onMouseLeave={() => setIsWorkHovered(false)}
          >
            {/* Work Link */}
            <Link
              href="/work"
              onClick={() => {
                handleLinkClick('/work');
                setIsWorkHovered(false);
              }}
              className={`text-lg px-2 sm:px-4 py-2 rounded-md transition-colors duration-200 relative inline-block
                ${pathname.startsWith('/work') ? 'text-[var(--text-color)]' : 'text-[var(--text-color-light)] hover:text-[var(--text-color)]'}`}
              aria-current={pathname.startsWith('/work') ? 'page' : undefined}
            >
              Work
              {pathname.startsWith('/work') && (
                <motion.span
                  className="absolute left-2 right-2 bottom-1 h-0.5 rounded-full bg-[var(--theme-color)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
            
            {/* Dropdown Menu with AnimatePresence for proper exit animations */}
            <AnimatePresence>
              {isWorkHovered && (
                <motion.div
                  className="bg-[var(--mode-color)] absolute left-0 mt-2 w-48 z-50 origin-top-left rounded-[var(--container-radius)] border border-[var(--color-border)] p-1.5 shadow-lg focus:outline-none transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.2 } }}
                >
                  <div className="space-y-1">
                    {workProjects.map((project) => (
                      <div key={project.href}>
                        <Link
                          href={project.href}
                          onClick={() => {
                            handleLinkClick(project.href);
                            setIsWorkHovered(false);
                          }}
                          className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium border border-transparent 
                            hover:border-[var(--color-border)] hover:bg-[var(--pane-bg-color-hover)] 
                            transition-colors duration-200`}
                        >
                          <span>{project.name}</span>
                          {pathname === project.href && (
                            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--theme-color)]" />
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Regular links (Writing, Who) */}
          {navLinks.map((link) => {
            // Check if current path starts with the link path (for nested routes)
            // But make sure we're not matching "/" with everything
            const isActive = link.href !== '/' && pathname.startsWith(link.href);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg px-2 sm:px-4 py-2 rounded-md transition-colors duration-200 relative
                  ${isActive ? 'text-[var(--text-color)]' : 'text-[var(--text-color-light)] hover:text-[var(--text-color)]'}`}
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
        <ThemeSwitcher /> 
      </nav>
    </motion.div>
  )
} 