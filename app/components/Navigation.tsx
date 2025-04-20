'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { H1 } from './Typography'
import Image from 'next/image'
export default function Navigation() {
  const pathname = usePathname()
  const textStyles = 'font-helveticampbell font-[900] tracking-normal text-xl relative px-1 transition-colors duration-200 p-1'
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  
  // Animation constants
  const ENTER_DELAY = 0.15
  const ENTER_DURATION = 0.15
  const EXIT_DURATION = 0.15
  
  // Initial page load animation constants
  const INITIAL_LOAD_DELAY = 0.2
  const INITIAL_LOAD_DURATION = 0.6
  
  // Set isFirstLoad to false after component mounts
  useEffect(() => {
    setIsFirstLoad(false)
  }, [])

  return (
    <motion.div 
      className="flex flex-col gap-6 mb-6 relative"
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
      <Link 
        href="/"         
      >
        <div className="font-helveticampbell font-[900] tracking-normal text-3xl relative px-1 transition-colors duration-200 p-1">Helveticampbell</div>
      </Link>


      
      <Link 
        href="/work" 
        className={`${textStyles} ${pathname === "/work" ? 'text-black' : 'text-neutral-400 hover:text-neutral-800'}`}
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
      <AnimatePresence mode="wait">
      {pathname === "/who" && (
        <motion.div className="aspect-[4/4] -scale-x-100 relative rounded-[var(--container-radius)] overflow-hidden bg-[hsl(var(--color-container-bg)/0.3)] mb-12"
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