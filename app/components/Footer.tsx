'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '../contexts/LoadingContext'
import { Overline } from './Typography'
import { useState } from 'react'
import ContactModal from './ContactModal'
import Image from 'next/image'

export default function Footer() {
  const pathname = usePathname()
  const { initiateLoading } = useLoading()
  const [contactModalOpen, setContactModalOpen] = useState(false)
  
  // Project links matching those in Navigation.tsx
  const projects = [
    { name: 'Fulcrum', href: '/work/fulcrum', key: 'Fulcrum' },
    { name: 'Spatial Networks', href: '/work/spatial-networks', key: 'Spatial Networks' },
    { name: 'Divide', href: '/work/divide', key: 'Divide' },
    { name: 'Allinspections', href: '/work/allinspections', key: 'Allinspections' },
    { name: 'Branding', href: '/work/branding', key: 'Branding' },
    // { name: 'Art', href: '/work/personal', key: 'Personal' },
  ]
  
  const handleLinkClick = (href: string) => {
    if (href !== pathname) {
      initiateLoading(100) // Reduced from 600ms to 100ms for better responsiveness
    }
  }

  const openContactModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setContactModalOpen(true)
  }
  
  return (
    <AnimatePresence>
      <motion.footer 
        id="main-footer" 
        className="container-narrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.75, delay: 0.25, ease: 'easeOut' }}
      >

          <div className="flex flex-col md:flex-row gap-6 justify-between lg:gap-24 px-4 sm:px-6 md:px-8 xl:px-0 py-6 pb-16 md:py-12 overflow-visible">
            {/* Column 1: Logo & Info */}
            <div className="flex flex-col space-y-8">
              {/* Logo */}
              <div className="h-12 w-16">
                <Link 
                  href="/" 
                  onClick={() => handleLinkClick("/")} 
                  className="inline-block"
                  prefetch={pathname !== "/" ? true : false}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.87 51.26" className="h-full w-full">
                    <path fill="currentColor" d="M61.73,31.25c.47-4.22-.3-7.16-2.31-8.82-2-1.66-4.86-2.49-8.56-2.5h0s-5.94,0-5.94,0L49.16,0h-9.63l-4.28,19.93h-9.83L29.71,0h-12.32c-2.41,0-4.67.39-6.77,1.19C6.71,2.69,3.79,5.39,1.84,9.29.18,12.61-.36,15.54.23,18.08c.59,2.54,2.88,4.55,6.86,6.01l3.55-7.09c-1.03-.41-1.85-1-2.45-1.77-.79-1.08-.78-2.44.04-4.08,1.17-2.33,3.24-3.59,6.23-3.78,1.16-.07,2.5.04,4.02.34l-9.02,42.31h9.63l5.01-23.55h9.83l-5.01,23.55h8.84c1.66.82,3.75,1.24,6.31,1.24,4.76,0,8.71-1.69,11.86-5.08,1.97-2.1,3.29-4.33,3.96-6.68h-7.9c-.49,1.56-1.22,2.82-2.19,3.8-.97.98-2.36,1.47-4.17,1.47-2.55,0-4.03-1.23-4.43-3.69-.22-1.32-.1-3.07.35-5.24.49-2.28,1.13-4.11,1.93-5.48,1.5-2.59,3.56-3.88,6.16-3.88,1.83,0,3.05.6,3.67,1.79.42.89.58,1.88.49,2.99h7.93Z"/>
                  </svg>
                </Link>
              </div>
              
              {/* Social icons */}
              <div className="flex space-x-4">
                {/* GitHub */}
                <Link 
                  href="https://github.com/campbell17" 
                  rel="me" 
                  className="h-8 w-8 group text-white hover:text-[var(--mode-color)] rounded-full bg-[var(--color-link)] flex items-center justify-center hover:bg-[var(--color-link-hover)] transition-colors duration-150"
                >
                  <svg className="w-4 h-4" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24.0199 0C10.7375 0 0 10.8167 0 24.1983C0 34.895 6.87988 43.9495 16.4241 47.1542C17.6174 47.3951 18.0545 46.6335 18.0545 45.9929C18.0545 45.4319 18.0151 43.509 18.0151 41.5055C11.3334 42.948 9.94198 38.6209 9.94198 38.6209C8.86818 35.8164 7.27715 35.0956 7.27715 35.0956C5.09022 33.6132 7.43645 33.6132 7.43645 33.6132C9.86233 33.7735 11.1353 36.0971 11.1353 36.0971C13.2824 39.7827 16.7422 38.7413 18.1341 38.1002C18.3328 36.5377 18.9695 35.456 19.6455 34.8552C14.3163 34.2942 8.70937 32.211 8.70937 22.9161C8.70937 20.2719 9.66321 18.1086 11.1746 16.4261C10.9361 15.8253 10.1008 13.3409 11.4135 10.0157C11.4135 10.0157 13.4417 9.3746 18.0146 12.4996C19.9725 11.9699 21.9916 11.7005 24.0199 11.6982C26.048 11.6982 28.1154 11.979 30.0246 12.4996C34.5981 9.3746 36.6262 10.0157 36.6262 10.0157C37.9389 13.3409 37.1031 15.8253 36.8646 16.4261C38.4158 18.1086 39.3303 20.2719 39.3303 22.9161C39.3303 32.211 33.7234 34.2539 28.3544 34.8552C29.2296 35.6163 29.9848 37.0583 29.9848 39.3421C29.9848 42.5871 29.9454 45.1915 29.9454 45.9924C29.9454 46.6335 30.383 47.3951 31.5758 47.1547C41.12 43.9491 47.9999 34.895 47.9999 24.1983C48.0392 10.8167 37.2624 0 24.0199 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
                
                {/* Twitch */}
                <Link 
                  href="https://twitch.tv/angrymallards" 
                  rel="me" 
                  className="h-8 w-8 group text-white hover:text-[var(--mode-color)] rounded-full bg-[var(--color-link)] flex items-center justify-center hover:bg-[var(--color-link-hover)] transition-colors duration-150"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 1L2 5.5V19H7V23L11.5 19H15L22 12V1H6.5ZM20 11L17 14H14L11.5 16.5V14H8V3H20V11Z" fill="currentColor"/>
                    <path d="M18 4H16V10H18V4Z" fill="currentColor"/>
                    <path d="M14 4H12V10H14V4Z" fill="currentColor"/>
                  </svg>
                </Link>
                
                {/* Instagram */}
                <Link 
                  href="https://instagram.com/campbell1117" 
                  rel="me" 
                  className="h-8 w-8 group text-white hover:text-[var(--mode-color)] rounded-full bg-[var(--color-link)] flex items-center justify-center hover:bg-[var(--color-link-hover)] transition-colors duration-150"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40938 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8688 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8063 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8063 7.15312 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65312 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97188 2.48906 5.33906 2.65312 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15312 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33437 0.014063 7.05469 0.070313C5.77969 0.126563 4.90313 0.332813 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01563C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332813 4.90313 0.126563 5.775 0.070313 7.05C0.014063 8.33437 0 8.74219 0 12C0 15.2578 0.014063 15.6656 0.070313 16.9453C0.126563 18.2203 0.332813 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3187 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3187 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01563C21.3188 1.35 20.6484 0.9375 19.8563 0.632813C19.0922 0.3375 18.2203 0.13125 16.9453 0.075C15.6656 0.014063 15.2578 0 12 0Z" fill="currentColor"/>
                    <path d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z" fill="currentColor"/>
                    <path d="M19.8469 5.59214C19.8469 6.38901 19.2 7.03127 18.4078 7.03127C17.6109 7.03127 16.9688 6.38433 16.9688 5.59214C16.9688 4.79527 17.6156 4.15308 18.4078 4.15308C19.2 4.15308 19.8469 4.79995 19.8469 5.59214Z" fill="currentColor"/>
                  </svg>
                </Link>
                
                {/* LinkedIn */}
                <Link 
                  href="https://linkedin.com/in/campbell17" 
                  rel="me" 
                  className="h-8 w-8 group text-white hover:text-[var(--mode-color)] rounded-full bg-[var(--color-link)] flex items-center justify-center hover:bg-[var(--color-link-hover)] transition-colors duration-150"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27187 6.51094 3.27187 5.37187C3.27187 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8938V14.8828C16.8938 13.5563 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2938 12.9094 14.7891V20.4516H9.35625V8.99531H12.7688V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="currentColor"/>
                  </svg>
                </Link>
              </div>
              
              {/* Copyright */}
              <div className="text-gray-500 text-sm">
                © 2025 Tim Campbell
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-12">
              {/* Column 2: WORK */}
              <div className="py-6 md:py-0 md:my-0 border-y border-neutral-200 md:border-0 t-8 sm:mt-0">
                <Overline className="mb-2">The Work</Overline>
                <ul className="list-none p-0 !m-0">
                  {projects.map((project) => (
                    <li key={project.key} className="leading-tight mb-1">
                      <Link
                        href={project.href}                        
                        className="cursor-pointer text-gray-500 hover:text-black transition-colors text-sm p-0 m-0 inline bg-transparent border-0 font-normal"
                      >
                        {project.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Column 3: THE REST */}
              <div className="">
                <Overline className="mb-2">The Rest</Overline>
                <ul className="list-none p-0 !m-0">
                  <li className="leading-tight mb-1">
                    <Link 
                      href="/" 
                      onClick={() => handleLinkClick("/")}
                      className="text-sm inline"
                      prefetch={pathname !== "/" ? true : false}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="leading-tight mb-1">
                    <Link 
                      href="/writing" 
                      onClick={() => handleLinkClick("/writing")}
                      className="text-sm inline"
                      prefetch={pathname !== "/writing" ? true : false}
                    >
                      Writing
                    </Link>
                  </li>
                  <li className="leading-tight mb-1">
                    <Link 
                      href="/who" 
                      onClick={() => handleLinkClick("/who")}
                      className="text-sm inline"
                      prefetch={pathname !== "/who" ? true : false}
                    >
                      Who
                    </Link>
                  </li>
                  <li className="leading-tight mb-1">
                    <Link 
                      href="#contact"
                      onClick={openContactModal}
                      className="text-sm inline"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        {/* Contact Modal */}
        <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      
        </motion.footer>
    </AnimatePresence>
  )
} 