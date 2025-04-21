'use client'

import { useProjectSidebar } from '../contexts/ProjectSidebarContext'

// A simple wrapper hook for opening projects
export function useOpenProject() {
  const { openProject, closeProject } = useProjectSidebar()
  
  return {
    openProject,
    closeProject
  }
}

// Global project handler - will be populated by the provider
let globalProjectHandler: ((projectKey: string) => void) | null = null

// Function to set the global handler
export function setGlobalProjectHandler(handler: (projectKey: string) => void) {
  globalProjectHandler = handler
}

// Static functions that can be imported and used directly
export const ProjectOpener = {
  open: (projectKey: string) => {
    if (globalProjectHandler) {
      globalProjectHandler(projectKey)
    } else {
      console.warn('ProjectOpener: No global handler set. Make sure ProjectSidebarProvider is mounted.')
    }
  },
  openFulcrum: () => ProjectOpener.open('Fulcrum'),
  openSpatialNetworks: () => ProjectOpener.open('Spatial Networks'),
  openAllinspections: () => ProjectOpener.open('Allinspections'),
} 