'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { H1 } from './Typography'
import Image from 'next/image'
import { ChevronUpDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { useProjectSidebar } from '../contexts/ProjectSidebarContext'

// Define types for project items
interface ProjectItem {
  name: string;
  href: string;
  key: string;
}

// Define animation constants type
interface AnimationConstants {
  duration: number;
  delay: number;
  disclosureDuration: number;
  disclosureEase: number[];
  enterDelay?: number;
  enterDuration?: number;
  exitDuration?: number;
}

// Props for navigation components
interface NavigationComponentProps {
  pathname: string;
  projects: ProjectItem[];
  isDisclosureOpen: boolean;
  handleDisclosureChange: () => void;
  openProject: (key: string) => void;
  animationConstants: AnimationConstants;
}

export default function Navigation() {
  const pathname = usePathname()
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false)
  
  // Get the openProject function from context
  const { openProject } = useProjectSidebar()
  
  // Animation constants
  const ENTER_DELAY = 0.15
  const ENTER_DURATION = 0.15
  const EXIT_DURATION = 0.15
  
  // Disclosure animation constants
  const DISCLOSURE_DURATION = 0.2
  const DISCLOSURE_EASE = [0.25, 0.1, 0.25, 1]
  
  // Initial page load animation constants
  const INITIAL_LOAD_DELAY = 0.2
  const INITIAL_LOAD_DURATION = 0.6
  
  // Load disclosure state from localStorage on initial render
  useEffect(() => {
    // Only run in the browser, not during SSR
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('projectDisclosureOpen')
      if (savedState !== null) {
        setIsDisclosureOpen(savedState === 'true')
      }
    }
    setIsFirstLoad(false)
  }, [])
  
  // Save disclosure state to localStorage when it changes
  const handleDisclosureChange = () => {
    const newState = !isDisclosureOpen
    setIsDisclosureOpen(newState)
    localStorage.setItem('projectDisclosureOpen', newState.toString())
  }

  // Project links for the Work disclosure
  const projects: ProjectItem[] = [
    { name: 'Fulcrum', href: '/work/fulcrum', key: 'Fulcrum' },
    { name: 'Spatial Networks', href: '/work/spatial-networks', key: 'Spatial Networks' },
    { name: 'Allinspections', href: '/work/allinspections', key: 'Allinspections' },
    { name: 'Divide', href: '/work/divide', key: 'Divide' },
    { name: 'Branding', href: '/work/branding', key: 'Branding' },
    { name: 'Personal', href: '/work/personal', key: 'Personal' },
  ]

  // Determine which navigation to show based on screen size
  return (
    <>
      {/* Mobile Navigation - Hidden on desktop */}
      <div className="md:hidden">
        <MobileNavigation 
          pathname={pathname}
          projects={projects}
          isDisclosureOpen={isDisclosureOpen}
          handleDisclosureChange={handleDisclosureChange}
          openProject={openProject}
          animationConstants={{
            duration: INITIAL_LOAD_DURATION,
            delay: INITIAL_LOAD_DELAY,
            disclosureDuration: DISCLOSURE_DURATION,
            disclosureEase: DISCLOSURE_EASE
          }}
        />
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:block">
        <DesktopNavigation 
          pathname={pathname}
          projects={projects}
          isDisclosureOpen={isDisclosureOpen}
          handleDisclosureChange={handleDisclosureChange}
          openProject={openProject}
          animationConstants={{
            enterDelay: ENTER_DELAY,
            enterDuration: ENTER_DURATION,
            exitDuration: EXIT_DURATION,
            duration: INITIAL_LOAD_DURATION,
            delay: INITIAL_LOAD_DELAY,
            disclosureDuration: DISCLOSURE_DURATION,
            disclosureEase: DISCLOSURE_EASE
          }}
        />
      </div>
    </>
  )
}

// Mobile Navigation Component
function MobileNavigation({ 
  pathname, 
  projects, 
  isDisclosureOpen, 
  handleDisclosureChange, 
  openProject,
  animationConstants
}: NavigationComponentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className="relative">
      <motion.div 
        className="flex flex-row items-center justify-between w-full"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1, 
          transition: {
            duration: animationConstants.duration,
            delay: animationConstants.delay,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }}
      >
        {/* Site title */}
        <Link href="/">
          <div className="font-helveticampbell font-[900] tracking-normal text-2xl relative transition-colors duration-200">
            Helveticampbell
          </div>
        </Link>
        
        {/* Hamburger menu button - positioned with higher z-index */}
        <button
          onClick={toggleMobileMenu}
          className="flex items-center justify-center p-2 rounded-md focus:outline-none relative z-50"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-black" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-black" />
          )}
        </button>
      </motion.div>
      
      {/* Full screen mobile navigation menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: "easeOut"
              }
            }}
            exit={{ 
              opacity: 0,
              transition: {
                duration: 0.15,
                ease: "easeIn"
              }
            }}
          >
            <nav className="flex flex-col items-center space-y-8 w-full px-8">
              <Link 
                href="/work" 
                className={`py-3 px-6 text-2xl font-medium rounded-md text-center w-full ${pathname === "/work" ? 'text-black font-bold' : 'text-neutral-500 hover:text-neutral-800'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </Link>
              <Link 
                href="/writing" 
                className={`py-3 px-6 text-2xl font-medium rounded-md text-center w-full ${pathname === "/writing" ? 'text-black font-bold' : 'text-neutral-500 hover:text-neutral-800'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Writing
              </Link>
              <Link 
                href="/who" 
                className={`py-3 px-6 text-2xl font-medium rounded-md text-center w-full ${pathname === "/who" ? 'text-black font-bold' : 'text-neutral-500 hover:text-neutral-800'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Who
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Desktop Navigation Component
function DesktopNavigation({ 
  pathname, 
  projects, 
  isDisclosureOpen, 
  handleDisclosureChange, 
  openProject,
  animationConstants
}: NavigationComponentProps) {
  const textStyles = 'font-helveticampbell font-[900] tracking-normal text-xl relative px-1 transition-colors duration-200 p-1'
  
  return (
    <motion.div 
      className="flex flex-col gap-6 mb-6 relative"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        transition: {
          duration: animationConstants.duration,
          delay: animationConstants.delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }}
    >
      {/* Site title */}
      <Link href="/">
        <div className="font-helveticampbell font-[900] tracking-normal text-3xl relative px-1 transition-colors duration-200 p-1">
          Helveticampbell
        </div>
      </Link>

      {/* Work link with dropdown */}
      <div className="relative w-full">
        <div className="flex flex-col items-start w-full">
          <Link 
            href="/work" 
            className={`${textStyles} w-full ${pathname === "/work" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`}
          >
            Work
            <AnimatePresence mode="wait">
              {pathname === "/work" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
                  style={{ transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ 
                    scaleX: 0, 
                    transition: { 
                      duration: animationConstants.exitDuration,
                      ease: "easeOut" 
                    }
                  }}
                  transition={{
                    duration: animationConstants.enterDuration,
                    ease: "easeOut",
                    delay: animationConstants.enterDelay
                  }}
                />
              )}
            </AnimatePresence>
          </Link>
          
          {/* Dropdown toggle button */}
          <button
            onClick={handleDisclosureChange}
            className="cursor-pointer absolute right-0 top-1 flex items-start p-1"
            aria-expanded={isDisclosureOpen}
          >
            <motion.div
              animate={{ rotate: isDisclosureOpen ? 180 : 0 }}
              transition={{ duration: animationConstants.disclosureDuration, ease: animationConstants.disclosureEase }}
            >
              <ChevronUpDownIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-800" />
            </motion.div>
          </button>
          
          {/* Projects dropdown */}
          <AnimatePresence initial={false}>
            {isDisclosureOpen && (
              <motion.div 
                className="mt-4 space-y-2 w-full overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: 'auto', 
                  opacity: 1,
                  transition: {
                    height: { duration: animationConstants.disclosureDuration, ease: animationConstants.disclosureEase },
                    opacity: { duration: animationConstants.disclosureDuration * 1.2, ease: animationConstants.disclosureEase }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: { duration: animationConstants.disclosureDuration, ease: animationConstants.disclosureEase },
                    opacity: { duration: animationConstants.disclosureDuration * 0.8, ease: animationConstants.disclosureEase }
                  }
                }}
              >
                <div>
                  {projects.map((project, index) => (
                    <motion.button
                      key={project.key}
                      initial={{ opacity: 0 }}
                      animate={{                       
                        opacity: 1,
                        transition: {
                          delay: index * 0.05,
                          duration: animationConstants.disclosureDuration,
                          ease: animationConstants.disclosureEase
                        }
                      }}
                      exit={{ 
                        transition: {
                          duration: animationConstants.disclosureDuration * 0.5,
                          ease: animationConstants.disclosureEase
                        }
                      }}
                      onClick={() => openProject(project.key)}
                      className={`cursor-pointer flex items-center pl-2 rounded-full hover:bg-gradient-to-tr from-slate-50/50 via-teal-50/50 to-red-50/50 justify-between text-xs font-bold py-1 uppercase !font-body ${pathname === "/work" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'} group w-full`}
                    >
                      {project.name}
                      <ArrowLeftStartOnRectangleIcon className="opacity-0 group-hover:opacity-100 mr-1.5 h-4 w-4 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Writing link */}
      <Link 
        href="/writing" 
        className={`${textStyles} ${pathname === "/writing" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`}
      >
        Writing
        <AnimatePresence mode="wait">
          {pathname === "/writing" && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
              style={{ transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ 
                scaleX: 0, 
                transition: { 
                  duration: animationConstants.exitDuration,
                  ease: "easeOut" 
                }
              }}
              transition={{
                duration: animationConstants.enterDuration,
                ease: "easeOut",
                delay: animationConstants.enterDelay
              }}
            />
          )}
        </AnimatePresence>
      </Link>
      
      {/* Who link */}
      <Link 
        href="/who" 
        className={`${textStyles} ${pathname === "/who" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`}
      >
        Who
        <AnimatePresence mode="wait">
          {pathname === "/who" && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
              style={{ transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ 
                scaleX: 0, 
                transition: { 
                  duration: animationConstants.exitDuration,
                  ease: "easeOut" 
                }
              }}
              transition={{
                duration: animationConstants.enterDuration,
                ease: "easeOut",
                delay: animationConstants.enterDelay
              }}
            />
          )}
        </AnimatePresence>
      </Link>
      
      {/* Profile image - only on /who page */}
      <AnimatePresence mode="wait">
        {pathname === "/who" && (
          <motion.div className="aspect-[4/4] -scale-x-100 relative rounded-[var(--container-radius)] overflow-hidden bg-white/30 mb-12"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 1, delay: 0.5, ease: "easeOut" }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.15, ease: "easeOut" }
            }}
          >
            <Image
                src="/images/tim.jpg"
                alt="Tim Campbell"
                width={1000}
                height={1000}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="transition-all duration-200"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 