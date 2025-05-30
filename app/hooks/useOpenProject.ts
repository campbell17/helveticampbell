'use client'

import { useRouter } from 'next/navigation'
import { useLoading } from '../contexts/LoadingContext'

// Helper function to convert project key to URL
const getProjectUrl = (key: string) => {
  // Handle nested Fulcrum projects
  if (key === 'Fulcrum Branding') {
    return '/work/fulcrum/evolution';
  }
  if (key === 'Fulcrum Data') {
    return '/work/fulcrum/data';
  }
  if (key === 'Fulcrum Community') {
    return '/work/fulcrum/community';
  }
  
  // Default behavior for other projects
  return `/work/${key.toLowerCase().replace(/\s+/g, '-')}`;
};

// A simple wrapper hook for navigating to project pages
export function useOpenProject() {
  const router = useRouter()
  const { initiateLoading } = useLoading()
  
  const openProject = (projectKey: string) => {
    const url = getProjectUrl(projectKey)
          initiateLoading(100) // Reduced from 600ms to 100ms for better responsiveness
    router.push(url)
  }
  
  const closeProject = () => {
    router.push('/work')
  }
  
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
    // Direct navigation using window object for static functions
    const url = getProjectUrl(projectKey)
    window.location.href = url
  },
  openFulcrum: () => ProjectOpener.open('Fulcrum'),
  openFulcrumBranding: () => ProjectOpener.open('Fulcrum Branding'),
  openFulcrumData: () => ProjectOpener.open('Fulcrum Data'),
  openFulcrumCommunity: () => ProjectOpener.open('Fulcrum Community'),
  openSpatialNetworks: () => ProjectOpener.open('Spatial Networks'),
  openAllinspections: () => ProjectOpener.open('Allinspections'),
  openDivide: () => ProjectOpener.open('Divide'),
  openBranding: () => ProjectOpener.open('Branding'),
  openPersonal: () => ProjectOpener.open('Personal'),
} 