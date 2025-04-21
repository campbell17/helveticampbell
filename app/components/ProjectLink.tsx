'use client'

import { ReactNode } from 'react'
import { useOpenProject } from '../hooks/useOpenProject'

interface ProjectLinkProps {
  projectKey: string
  children: ReactNode
  className?: string
}

/**
 * A button component that can be used anywhere to open a project in the sidebar
 */
export default function ProjectLink({ projectKey, children, className = '' }: ProjectLinkProps) {
  const { openProject } = useOpenProject()

  return (
    <button
      onClick={() => openProject(projectKey)}
      className={`${className}`}
    >
      {children}
    </button>
  )
} 