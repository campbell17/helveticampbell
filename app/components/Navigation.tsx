'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { H1 } from './Typography'
import Image from 'next/image'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { useProjectSidebar } from '../contexts/ProjectSidebarContext'

interface NavigationProps {
  variant?: 'vertical' | 'horizontal'
}

export default function Navigation({ variant = 'vertical' }: NavigationProps) {
  const pathname = usePathname()
  const textStyles = 'font-helveticampbell font-[900] tracking-normal text-xl relative px-1 transition-colors duration-200 p-1'
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false)
  const isHorizontal = variant === 'horizontal'
  
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
  const projects = [
    { name: 'Fulcrum', href: '/work/fulcrum', key: 'Fulcrum' },
    { name: 'Spatial Networks', href: '/work/spatial-networks', key: 'Spatial Networks' },
    { name: 'Allinspections', href: '/work/allinspections', key: 'Allinspections' },
    { name: 'Divide', href: '/work/divide', key: 'Divide' },
    { name: 'Branding', href: '/work/branding', key: 'Branding' },
    { name: 'Personal', href: '/work/personal', key: 'Personal' },
  ]

  // Different classes for horizontal and vertical layouts
  const containerClasses = isHorizontal 
    ? "flex flex-row gap-4 items-center justify-start flex-wrap" 
    : "flex flex-col gap-6 mb-6 relative";

  const linkClasses = isHorizontal
    ? `relative text-sm font-medium ${pathname === "/work" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`
    : `${textStyles} w-full ${pathname === "/work" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`;

  const disclosureContainerClasses = isHorizontal
    ? "relative"
    : "relative w-full";

  const projectButtonClasses = isHorizontal
    ? `cursor-pointer flex items-center text-xs font-bold py-1 px-2 rounded-full hover:bg-gradient-to-tr from-slate-50/50 via-teal-50/50 to-red-50/50 uppercase !font-body ${pathname === "/work" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'} group`
    : `cursor-pointer flex items-center pl-2 rounded-full hover:bg-gradient-to-tr from-slate-50/50 via-teal-50/50 to-red-50/50 justify-between text-xs font-bold py-1 uppercase !font-body ${pathname === "/work" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'} group w-full`;

  return (
    <motion.div 
      className={containerClasses}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        transition: {
          duration: INITIAL_LOAD_DURATION,
          delay: INITIAL_LOAD_DELAY,
          ease: [0.25, 0.1, 0.25, 1] // Custom easing for a smooth entrance
        }
      }}
    >
      {/* Only show title in vertical mode, already in header for horizontal */}
      {!isHorizontal && (
        <Link href="/">
          <div className="font-helveticampbell font-[900] tracking-normal text-3xl relative px-1 transition-colors duration-200 p-1">Helveticampbell</div>
        </Link>
      )}

      <div className={disclosureContainerClasses}>
        <div className={isHorizontal ? "flex items-center" : "flex flex-col items-start w-full"}>
          <Link 
            href="/work" 
            className={linkClasses}
          >
            Work
            <AnimatePresence mode="wait">
              {pathname === "/work" && !isHorizontal && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
                  style={{ transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ 
                    scaleX: 0, 
                    transition: { 
                      duration: EXIT_DURATION,
                      ease: "easeOut" 
                    }
                  }}
                  transition={{
                    duration: ENTER_DURATION,
                    ease: "easeOut",
                    delay: ENTER_DELAY
                  }}
                />
              )}
            </AnimatePresence>
          </Link>
          
          <button
            onClick={handleDisclosureChange}
            className={isHorizontal 
              ? "cursor-pointer ml-1 flex items-center p-1" 
              : "cursor-pointer absolute right-0 top-1 flex items-start p-1"}
            aria-expanded={isDisclosureOpen}
          >
            <motion.div
              animate={{ rotate: isDisclosureOpen ? 180 : 0 }}
              transition={{ duration: DISCLOSURE_DURATION, ease: DISCLOSURE_EASE }}
            >
              <ChevronUpDownIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-800" />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {isDisclosureOpen && (
              <motion.div 
                className={isHorizontal 
                  ? "absolute top-full left-0 mt-1 z-20 bg-white/90 backdrop-blur-sm shadow-md rounded-lg p-2 w-max" 
                  : "mt-4 space-y-2 w-full overflow-hidden"}
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: 'auto', 
                  opacity: 1,
                  transition: {
                    height: { duration: DISCLOSURE_DURATION, ease: DISCLOSURE_EASE },
                    opacity: { duration: DISCLOSURE_DURATION * 1.2, ease: DISCLOSURE_EASE }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: { duration: DISCLOSURE_DURATION, ease: DISCLOSURE_EASE },
                    opacity: { duration: DISCLOSURE_DURATION * 0.8, ease: DISCLOSURE_EASE }
                  }
                }}
              >
                <div className={isHorizontal ? "flex flex-col space-y-1" : ""}>
                  {projects.map((project, index) => (
                    <motion.button
                      key={project.key}
                      initial={{ opacity: 0 }}
                      animate={{                       
                        opacity: 1,
                        transition: {
                          delay: index * 0.05,
                          duration: DISCLOSURE_DURATION,
                          ease: DISCLOSURE_EASE
                        }
                      }}
                      exit={{ 
                        transition: {
                          duration: DISCLOSURE_DURATION * 0.5,
                          ease: DISCLOSURE_EASE
                        }
                      }}
                      onClick={() => openProject(project.key)}
                      className={projectButtonClasses}
                    >
                      {project.name} 
                      {!isHorizontal && (
                        <ArrowLeftStartOnRectangleIcon className="opacity-0 group-hover:opacity-100 mr-1.5 h-4 w-4 transition-opacity" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <Link 
        href="/writing" 
        className={isHorizontal 
          ? `relative text-sm font-medium ${pathname === "/writing" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`
          : `${textStyles} ${pathname === "/writing" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`}
      >
        Writing
        <AnimatePresence mode="wait">
          {pathname === "/writing" && !isHorizontal && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
              style={{ transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ 
                scaleX: 0, 
                transition: { 
                  duration: EXIT_DURATION,
                  ease: "easeOut" 
                }
              }}
              transition={{
                duration: ENTER_DURATION,
                ease: "easeOut",
                delay: ENTER_DELAY
              }}
            />
          )}
        </AnimatePresence>
      </Link>
      <Link 
        href="/who" 
        className={isHorizontal 
          ? `relative text-sm font-medium ${pathname === "/who" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`
          : `${textStyles} ${pathname === "/who" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`}
      >
        Who
        <AnimatePresence mode="wait">
          {pathname === "/who" && !isHorizontal && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
              style={{ transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ 
                scaleX: 0, 
                transition: { 
                  duration: EXIT_DURATION,
                  ease: "easeOut" 
                }
              }}
              transition={{
                duration: ENTER_DURATION,
                ease: "easeOut",
                delay: ENTER_DELAY
              }}
            />
          )}
        </AnimatePresence>
      </Link>
      {/* Image only shown in vertical layout and on /who page */}
      {!isHorizontal && (
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
      )}
    </motion.div>
  )
} 