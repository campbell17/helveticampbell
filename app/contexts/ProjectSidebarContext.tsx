'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import ProjectSidebar from '../components/ProjectSidebar'
import { setGlobalProjectHandler } from '../hooks/useOpenProject'

interface ProjectSidebarContextType {
  openProject: (projectKey: string) => void
  closeProject: () => void
  isOpen: boolean
  currentProject: string | null
}

const ProjectSidebarContext = createContext<ProjectSidebarContextType | undefined>(undefined)

export const ProjectSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<string | null>(null)
  const [currentGallery, setCurrentGallery] = useState<string | null>(null)

  const openProject = (projectKey: string) => {
    setCurrentProject(projectKey)
    setIsOpen(true)
  }

  const closeProject = () => {
    setIsOpen(false)
  }

  // Set up the global project handler
  useEffect(() => {
    setGlobalProjectHandler(openProject)
  }, [])

  return (
    <ProjectSidebarContext.Provider
      value={{
        openProject,
        closeProject,
        isOpen,
        currentProject
      }}
    >
      {children}
      <ProjectSidebar
        isOpen={isOpen}
        onClose={closeProject}
        projectKey={currentProject}
        currentGallery={currentGallery}
        setCurrentGallery={setCurrentGallery}
        onNavigateToProject={(projectKey) => setCurrentProject(projectKey)}
      />
    </ProjectSidebarContext.Provider>
  )
}

// Custom hook to use the ProjectSidebar context
export const useProjectSidebar = () => {
  const context = useContext(ProjectSidebarContext)
  if (context === undefined) {
    throw new Error('useProjectSidebar must be used within a ProjectSidebarProvider')
  }
  return context
} 