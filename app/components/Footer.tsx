'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useProjectSidebar } from '../contexts/ProjectSidebarContext'
import { useLoading } from '../contexts/LoadingContext'
import { Overline } from './Typography'

export default function Footer() {
  const pathname = usePathname()
  const { openProject } = useProjectSidebar()
  const { initiateLoading } = useLoading()
  
  // Project links matching those in Navigation.tsx
  const projects = [
    { name: 'Fulcrum', href: '/work/fulcrum', key: 'Fulcrum' },
    { name: 'Spatial Networks', href: '/work/spatial-networks', key: 'Spatial Networks' },
    { name: 'Divide', href: '/work/divide', key: 'Divide' },
    { name: 'Allinspections', href: '/work/allinspections', key: 'Allinspections' },
    { name: 'Branding', href: '/work/branding', key: 'Branding' },
    { name: 'Art', href: '/work/personal', key: 'Personal' },
  ]
  
  const handleLinkClick = (href: string) => {
    if (href !== pathname) {
      initiateLoading(600)
    }
  }
  
  return (
    <footer id="main-footer" className="relative mt-24 py-16 md:pl-64 2xl:pl-72">
      <div className="grid grid-cols-12 gap-4">
        <div className="grid-narrow-content flex flex-col md:flex-row gap-6 lg:gap-24 px-8 py-6 md:py-12 overflow-visible">
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col space-y-8">
            {/* Logo */}
            <div className="h-12 w-16">
              <Link href="/" onClick={() => handleLinkClick("/")} className="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.87 51.26" className="h-full w-full">
                  <path d="M61.73,31.25c.47-4.22-.3-7.16-2.31-8.82-2-1.66-4.86-2.49-8.56-2.5h0s-5.94,0-5.94,0L49.16,0h-9.63l-4.28,19.93h-9.83L29.71,0h-12.32c-2.41,0-4.67.39-6.77,1.19C6.71,2.69,3.79,5.39,1.84,9.29.18,12.61-.36,15.54.23,18.08c.59,2.54,2.88,4.55,6.86,6.01l3.55-7.09c-1.03-.41-1.85-1-2.45-1.77-.79-1.08-.78-2.44.04-4.08,1.17-2.33,3.24-3.59,6.23-3.78,1.16-.07,2.5.04,4.02.34l-9.02,42.31h9.63l5.01-23.55h9.83l-5.01,23.55h8.84c1.66.82,3.75,1.24,6.31,1.24,4.76,0,8.71-1.69,11.86-5.08,1.97-2.1,3.29-4.33,3.96-6.68h-7.9c-.49,1.56-1.22,2.82-2.19,3.8-.97.98-2.36,1.47-4.17,1.47-2.55,0-4.03-1.23-4.43-3.69-.22-1.32-.1-3.07.35-5.24.49-2.28,1.13-4.11,1.93-5.48,1.5-2.59,3.56-3.88,6.16-3.88,1.83,0,3.05.6,3.67,1.79.42.89.58,1.88.49,2.99h7.93Z"/>
                </svg>
              </Link>
            </div>
            
            {/* Social icons */}
            <div className="flex space-x-4">
              {/* Social icons placeholder - you can replace with actual icons */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              © 2025 Tim Campbell
            </div>
          </div>
          
          {/* Column 2: WORK */}
          <div className="mt-8 sm:mt-0">
            <Overline className="mb-2">Work</Overline>
            <ul className="list-none p-0 !m-0">
              {projects.map((project) => (
                <li key={project.key} className="leading-tight mb-1.5">
                  <button
                    onClick={() => openProject(project.key)}
                    className="cursor-pointer text-gray-500 hover:text-black transition-colors text-sm p-0 m-0 inline bg-transparent border-0 font-normal"
                  >
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: THE REST */}
          <div className="mt-8 sm:mt-0">
            <Overline className="mb-2">The Rest</Overline>
            <ul className="list-none p-0 !m-0">
              <li className="leading-tight mb-1.5">
                <Link 
                  href="/" 
                  onClick={() => handleLinkClick("/")}
                  className="text-gray-500 hover:text-black transition-colors text-sm inline"
                >
                  Home
                </Link>
              </li>
              <li className="leading-tight mb-1.5">
                <Link 
                  href="/writing" 
                  onClick={() => handleLinkClick("/writing")}
                  className="text-gray-500 hover:text-black transition-colors text-sm inline"
                >
                  Writing
                </Link>
              </li>
              <li className="leading-tight mb-1.5">
                <Link 
                  href="/who" 
                  onClick={() => handleLinkClick("/who")}
                  className="text-gray-500 hover:text-black transition-colors text-sm inline"
                >
                  Who
                </Link>
              </li>
              <li className="leading-tight mb-1.5">
                <Link 
                  href="/contact" 
                  onClick={() => handleLinkClick("/contact")}
                  className="text-gray-500 hover:text-black transition-colors text-sm inline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 