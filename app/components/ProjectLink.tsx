'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useLoading } from '../contexts/LoadingContext'
import { usePathname } from 'next/navigation'

interface ProjectLinkProps {
  projectKey: string
  children: ReactNode
  className?: string
}

/**
 * A component that links directly to project pages
 */
export default function ProjectLink({ projectKey, children, className = '' }: ProjectLinkProps) {
  const pathname = usePathname()
  const { initiateLoading } = useLoading()
  
  // Convert project key to URL-friendly format
  const getProjectUrl = (key: string) => {
    return `/work/${key.toLowerCase().replace(/\s+/g, '-')}`;
  };
  
  const handleLinkClick = (href: string) => {
    if (href !== pathname) {
      initiateLoading(100); // Reduced from 600ms to 100ms for better responsiveness
    }
  }

  const projectUrl = getProjectUrl(projectKey)
  
  return (
    <Link
      href={projectUrl}
      onClick={() => handleLinkClick(projectUrl)}
      className={`${className}`}
    >
      {children}
    </Link>
  )
} 