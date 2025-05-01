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
import { useLoading } from '../contexts/LoadingContext'
import LoadingLogo from './LoadingLogo'

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
  handleLinkClick: (href: string) => void;
}

export default function Navigation() {
  const pathname = usePathname()
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false)
  const { openProject } = useProjectSidebar()
  const { initiateLoading } = useLoading()

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

  // Update handleLinkClick to call initiateLoading
  const handleLinkClick = (href: string) => {
    if (href !== pathname) {
      initiateLoading(600);
    }
  };

  // Project links for the Work disclosure
  const projects: ProjectItem[] = [
    { name: 'Fulcrum', href: '/work/fulcrum', key: 'Fulcrum' },
    { name: 'Spatial Networks', href: '/work/spatial-networks', key: 'Spatial Networks' },
    { name: 'Divide', href: '/work/divide', key: 'Divide' },
    { name: 'Allinspections', href: '/work/allinspections', key: 'Allinspections' },
    { name: 'Branding', href: '/work/branding', key: 'Branding' },
    { name: 'Art', href: '/work/personal', key: 'Personal' },
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
          handleLinkClick={handleLinkClick}
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
          handleLinkClick={handleLinkClick}
        />
      </div>
    </>
  )
}

// Mobile Navigation Component
function MobileNavigation({ 
  pathname, 
  animationConstants,
  handleLinkClick
}: NavigationComponentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeAndNavigate = (href: string) => {
    handleLinkClick(href);
    setMobileMenuOpen(false);
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
        <Link href="/" onClick={() => handleLinkClick("/")}>
          <LoadingLogo sizeClasses="h-8 w-10" className="transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.87 51.26" className="h-full w-full">
              <path d="M61.73,31.25c.47-4.22-.3-7.16-2.31-8.82-2-1.66-4.86-2.49-8.56-2.5h0s-5.94,0-5.94,0L49.16,0h-9.63l-4.28,19.93h-9.83L29.71,0h-12.32c-2.41,0-4.67.39-6.77,1.19C6.71,2.69,3.79,5.39,1.84,9.29.18,12.61-.36,15.54.23,18.08c.59,2.54,2.88,4.55,6.86,6.01l3.55-7.09c-1.03-.41-1.85-1-2.45-1.77-.79-1.08-.78-2.44.04-4.08,1.17-2.33,3.24-3.59,6.23-3.78,1.16-.07,2.5.04,4.02.34l-9.02,42.31h9.63l5.01-23.55h9.83l-5.01,23.55h8.84c1.66.82,3.75,1.24,6.31,1.24,4.76,0,8.71-1.69,11.86-5.08,1.97-2.1,3.29-4.33,3.96-6.68h-7.9c-.49,1.56-1.22,2.82-2.19,3.8-.97.98-2.36,1.47-4.17,1.47-2.55,0-4.03-1.23-4.43-3.69-.22-1.32-.1-3.07.35-5.24.49-2.28,1.13-4.11,1.93-5.48,1.5-2.59,3.56-3.88,6.16-3.88,1.83,0,3.05.6,3.67,1.79.42.89.58,1.88.49,2.99h7.93Z"/>
            </svg>
          </LoadingLogo>
        </Link>
        
        <button
          onClick={toggleMobileMenu}
          className="cursor-pointer flex items-center justify-center p-2 rounded-md focus:outline-none relative z-50"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-black" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-black" />
          )}
        </button>
      </motion.div>
      
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
                onClick={() => closeAndNavigate("/work")}
              >
                Work
              </Link>
              <Link 
                href="/writing" 
                className={`py-3 px-6 text-2xl font-medium rounded-md text-center w-full ${pathname === "/writing" ? 'text-black font-bold' : 'text-neutral-500 hover:text-neutral-800'}`}
                onClick={() => closeAndNavigate("/writing")}
              >
                Writing
              </Link>
              <Link 
                href="/who" 
                className={`py-3 px-6 text-2xl font-medium rounded-md text-center w-full ${pathname === "/who" ? 'text-black font-bold' : 'text-neutral-500 hover:text-neutral-800'}`}
                onClick={() => closeAndNavigate("/who")}
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
  animationConstants,
  handleLinkClick
}: NavigationComponentProps) {
  const textStyles = 'rounded-md font-helveticampbell font-[900] tracking-normal text-xl relative px-1 transition-colors duration-200 p-1'
  
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
      <Link href="/" onClick={() => handleLinkClick("/")}>
        <LoadingLogo sizeClasses="h-9 w-12" className="transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.87 51.26" className="h-full w-full">
            <path d="M61.73,31.25c.47-4.22-.3-7.16-2.31-8.82-2-1.66-4.86-2.49-8.56-2.5h0s-5.94,0-5.94,0L49.16,0h-9.63l-4.28,19.93h-9.83L29.71,0h-12.32c-2.41,0-4.67.39-6.77,1.19C6.71,2.69,3.79,5.39,1.84,9.29.18,12.61-.36,15.54.23,18.08c.59,2.54,2.88,4.55,6.86,6.01l3.55-7.09c-1.03-.41-1.85-1-2.45-1.77-.79-1.08-.78-2.44.04-4.08,1.17-2.33,3.24-3.59,6.23-3.78,1.16-.07,2.5.04,4.02.34l-9.02,42.31h9.63l5.01-23.55h9.83l-5.01,23.55h8.84c1.66.82,3.75,1.24,6.31,1.24,4.76,0,8.71-1.69,11.86-5.08,1.97-2.1,3.29-4.33,3.96-6.68h-7.9c-.49,1.56-1.22,2.82-2.19,3.8-.97.98-2.36,1.47-4.17,1.47-2.55,0-4.03-1.23-4.43-3.69-.22-1.32-.1-3.07.35-5.24.49-2.28,1.13-4.11,1.93-5.48,1.5-2.59,3.56-3.88,6.16-3.88,1.83,0,3.05.6,3.67,1.79.42.89.58,1.88.49,2.99h7.93Z"/>
          </svg>
        </LoadingLogo>
      </Link>

      <div className="relative w-full">
        <div className="flex flex-col items-start w-full">
          <Link 
            href="/work" 
            className={`${textStyles} w-full ${pathname === "/work" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`}
            onClick={() => handleLinkClick("/work")}
          >
            Work
            <AnimatePresence mode="wait">
              {pathname === "/work" && (
                <motion.div
                  className="absolute bottom-4 left-16 right-8 h-[2px] bg-black rounded-full"
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
          
          <button
            onClick={handleDisclosureChange}
            className="cursor-pointer absolute right-0 top-1 flex items-start p-1"
            aria-expanded={isDisclosureOpen}
          >
            <motion.div
              animate={{ rotate: isDisclosureOpen ? 180 : 0 }}
              transition={{ duration: animationConstants.disclosureDuration, ease: animationConstants.disclosureEase }}
            >
              <ChevronUpDownIcon className="h-5 w-6 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-400 hover:text-neutral-800" />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {isDisclosureOpen && (
              <motion.div 
                className="mt-4 space-y-2 w-full"
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
                      className={`cursor-pointer flex items-center pl-2 rounded-md border border-transparent hover:border-neutral-200 hover:bg-neutral-100 justify-between text-sm tracking-wider font-[500] py-1 uppercase !font-sans ${pathname === "/work" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'} group w-full`}
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
        onClick={() => handleLinkClick("/writing")}
      >
        Writing
        <AnimatePresence mode="wait">
          {pathname === "/writing" && (
            <motion.div
              className="absolute bottom-4 left-20 right-0 h-[2px] bg-black rounded-full"
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
        onClick={() => handleLinkClick("/who")}
      >
        Who
        <AnimatePresence mode="wait">
          {pathname === "/who" && (
            <motion.div
              className="absolute bottom-4 left-14 right-0 h-[2px] bg-black"
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