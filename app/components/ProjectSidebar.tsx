import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { H1, H2, H3, Overline } from './Typography';
import { MagnifyingGlassPlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
// Remove component imports, they are now in projectDetails.ts
// import FulcrumContent from './projects/FulcrumContent';
// import SpatialNetworksContent from './projects/SpatialNetworksContent';
// import AllinspectionsContent from './projects/AllinspectionsContent';
// import DivideContent from './projects/DivideContent';
// import BrandingContent from './projects/BrandingContent';
// import PersonalContent from './projects/PersonalContent';

// Import the centralized project data and type
import { projectDetails, ProjectDetails } from '../data/projectDetails';

// Animation timing constants
const ANIMATION_TIMING = {
  exit: {
    duration: 0.3,
    ease: "easeOut"
  },
  cleanup: 350, // Slightly longer than exit duration to ensure animations complete
  enter: {
    duration: 0.2,
    ease: "easeOut"
  },
};

// Separate timing for PreTransition component
const PRE_TRANSITION_TIMING = {
  enter: {
    duration: 0.15,
    ease: "easeInOut"
  },
  exit: {
    duration: 0.15,
    ease: "easeOut",
    delay: 0.25 // Delay exit until main sidebar is closed
  }
};

// Separate timing for main sidebar component
const SIDEBAR_TIMING = {
  enter: {
    duration: 0.75,
    ease: [
      [0.25, 0.1, 0.25, 1], // initial movement
      [0.03, -0.00003, 0.01, 1], // slower bounce
      [1, 0, 0.01, 1] // modified ease for dramatic finish
    ],
    times: [0, 0.2, 0.4, 1]
  },
  exit: {
    duration: 0.3,
    ease: "easeOut"
  },
};

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projectKey: string | null;
  currentGallery: string | null;
  setCurrentGallery: (gallery: string | null) => void;
  onNavigateToProject?: (projectKey: string) => void;
}

// Pre-transition component with its own lifecycle
const PreTransition = ({ 
  show, 
  onComplete, 
  isExiting,
  onExitComplete
}: { 
  show: boolean; 
  onComplete: () => void; 
  isExiting: boolean;
  onExitComplete?: () => void;
}) => {
  useEffect(() => {
    if (show && !isExiting) {
      // Only trigger the callback during entrance, not exit
      const timer = setTimeout(onComplete, 200);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete, isExiting]);

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {show && (
        <motion.div
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 0 100%)" }}
          transition={{
            duration: 0.15,
            ease: "easeInOut",
            exit: PRE_TRANSITION_TIMING.exit
          }}
          className="fixed inset-0 bg-black z-sidebar flex items-center justify-center"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="text-white text-4xl md:text-6xl font-helveticampbell tracking-tight"
          >
            Helveticampbell
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ProjectSidebar({ 
  isOpen, 
  onClose, 
  projectKey,
  currentGallery,
  setCurrentGallery,
  onNavigateToProject
}: ProjectSidebarProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const project = projectKey ? projectDetails[projectKey] : null;
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  
  // State for sticky header
  const [isScrolled, setIsScrolled] = useState(false);

  // Animation state management
  const [showPreTransition, setShowPreTransition] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  // State for project transitions
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionalProject, setTransitionalProject] = useState<string | null>(null);

  // Handle opening sequence
  useEffect(() => {
    if (isOpen && !showSidebar && !isExiting) {
      // Start with pre-transition (will auto-trigger sidebar via callback)
      setShowPreTransition(true);
    }
  }, [isOpen, showSidebar, isExiting]);

  // Handle transition from pre-transition to sidebar
  const handlePreTransitionComplete = () => {
    setShowSidebar(true);
  };

  // Handle pre-transition exit complete
  const handlePreTransitionExitComplete = () => {
    if (isExiting) {
      // Final cleanup after pre-transition has fully exited
      onClose();
      setIsExiting(false);
    }
  };

  // Custom close handler to manage exit animations
  const handleClose = () => {
    // Start exit sequence
    setIsExiting(true);
    
    // First, slide out the sidebar
    setShowSidebar(false);
    
    // Then show the PreTransition which will handle its own exit
    setShowPreTransition(true);
    
    // For exit - handle after a delay
    setTimeout(() => {
      // Trigger the exit animation after delay
      setShowPreTransition(false);
    }, PRE_TRANSITION_TIMING.exit.delay * 1000);
  };

  // Handle project transition
  const handleProjectTransition = (nextProjectKey: string) => {
    if (!nextProjectKey || nextProjectKey === projectKey) return;
    
    // Start transition sequence
    setIsTransitioning(true);
    setTransitionalProject(nextProjectKey);
    
    // Completely fade out the current content before changing projects
    setTimeout(() => {
      // Scroll to top for the new project
      if (sidebarContentRef.current) {
        sidebarContentRef.current.scrollTop = 0;
      }
      
      // Change to the new project
      if (onNavigateToProject) {
        onNavigateToProject(nextProjectKey);
      }
      
      // Allow a moment for the DOM to update with new content, then start fade-in
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionalProject(null);
      }, 100); // Short delay to ensure content has updated
    }, 500); // Ensure this is longer than the fade-out animation (400ms)
  };

  // Handle scroll for sticky header and back-to-top button
  useEffect(() => {
    // Only set up the scroll handler when the sidebar is actually visible
    // and the DOM element is available
    if (!showSidebar || !sidebarContentRef.current) {
      return;
    }
    
    const sidebar = sidebarContentRef.current;
    
    const handleScroll = () => {
      if (sidebar) {
        const scrollPosition = sidebar.scrollTop;
        setShowBackToTop(scrollPosition > 300);
        setIsScrolled(scrollPosition > 100);
      }
    };

    if (sidebar) {
      sidebar.addEventListener('scroll', handleScroll);
      
      // Trigger an initial check
      handleScroll();
      
      return () => {
        sidebar.removeEventListener('scroll', handleScroll);
      };
    }
  }, [showSidebar]); 

  const scrollToTop = () => {
    if (sidebarContentRef.current) {
      sidebarContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset scroll position when opening new project
  useEffect(() => {
    if (isOpen && projectKey && showSidebar && sidebarContentRef.current) {
      const timer = setTimeout(() => {
        if (sidebarContentRef.current) {
          sidebarContentRef.current.scrollTop = 0;
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, projectKey, showSidebar]);

  // Handle escape key to close sidebar
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen && !isExiting || !project) return null;

  return (
    <>
      {/* Pre-transition as separate component */}
      <PreTransition 
        show={showPreTransition} 
        onComplete={handlePreTransitionComplete}
        isExiting={isExiting}
        onExitComplete={handlePreTransitionExitComplete}
      />

      {/* Top Container */}
      <AnimatePresence mode="sync">
        {showSidebar && (
          <motion.div
            key="main-sidebar"
            initial={{ x: "100%", opacity: 1 }}
            animate={{
              x: ["100%", "90%", "92%", "0%"],
              opacity: 1
            }}
            // Single exit prop with its own transition
            exit={{ 
              x: "100%", // Slide to the right on exit
              opacity: 1, // Keep opacity at 1 during slide
              transition: { 
                duration: 0.25, // Explicit hardcoded value
                ease: "easeOut" 
              }
            }}
            // Main transition only for entrance
            transition={{
              // Only applied to entrance animation
              duration: SIDEBAR_TIMING.enter.duration,
              times: SIDEBAR_TIMING.enter.times,
              ease: SIDEBAR_TIMING.enter.ease,
              delay: 0, // No delay for entrance
            }}
            className="fixed inset-0 bg-[#f7f8fa] backdrop-blur-xs shadow-xl z-sidebar overflow-hidden"
          >
            {/* Simple grid background pattern */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundSize: '50px 50px',
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                `,
                zIndex: -1,
                pointerEvents: 'none'
              }}
            />

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0, ease: "easeOut" }}
              onClick={handleClose}
              className={`cursor-pointer fixed right-6 text-black/60 hover:text-black transition-all z-[1000] flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10 ${isScrolled ? 'top-6 w-12 h-12' : ' top-6 w-12 h-12'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Sticky Header - Commented out for now, can be re-enabled if needed */}
            {/* <div
              data-scrolled={isScrolled ? "true" : "false"}
              data-testid="sticky-header"
              className={`fixed top-0 left-0 right-0 z-modal transition-all duration-500 ease-in-out container-glass backdrop-blur-md py-4 px-6 border-b border-gray-200 shadow-sm ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
              style={{
                // Force important styles to ensure visibility if needed
                zIndex: 110,
                opacity: isTransitioning ? 0 : (isScrolled ? 1 : 0)
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <span style={{ marginBottom: '0px' }} className="font-semibold text-gray-900 text-3xl font-merriweather">{project?.title}</span>
                  {project?.description && (
                    <p className="hidden md:block text-sm text-text-secondary truncate" style={{ marginBottom: '0px' }}>{project.description}</p>
                  )}
                </div>
              </div>
            </div> */}

            <motion.div 
              ref={sidebarContentRef}
              className="h-full w-full overflow-y-auto project-sidebar-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: SIDEBAR_TIMING.enter.duration / 3,
                delay: 0.85,
                ease: "easeOut"
              }}
            >


              {/* Main Content */}
              {project?.content && (
                <motion.div 
                  key={`content-${projectKey}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isTransitioning ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                >
                  {/* Updated rendering logic - no longer passing project prop */}
                  {React.createElement(project.content)} 
                </motion.div>
              )}

              {/* Fallback for projects without content - keep for now */}
              {!project?.content && project?.images && (
                <div className="p-20">
                  <div className="max-w-7xl mx-auto">
                    <motion.div
                      key={`grid-${projectKey}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isTransitioning ? 0 : 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                      {project.images?.map((image, index) => (
                        <div 
                          key={index} 
                          className={`${image.fullWidth ? 'md:col-span-2 lg:col-span-3' : ''}`}
                        >
                          <div className="relative rounded-xl shadow-md">
                            <div 
                              className="relative" 
                              style={{ aspectRatio: image.aspectRatio || '4/4' }}
                            >
                              <Image 
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                          </div>
                          {image.caption && (
                            <p className="mt-3 text-sm text-gray-500">{image.caption}</p>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Previous Project Button - Fixed positioned */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isTransitioning ? 0.5 : 1,
                x: 0
              }}
              transition={{ 
                duration: 0.3,
                delay: isTransitioning ? 0 : 0.6 // Delay initial appearance after content loads
              }}
              onClick={() => {
                if (!projectKey || isTransitioning) return;
                
                const projectKeys = Object.keys(projectDetails);
                const currentIndex = projectKeys.indexOf(projectKey);
                const prevIndex = (currentIndex - 1 + projectKeys.length) % projectKeys.length;
                const prevProjectKey = projectKeys[prevIndex];
                
                // Navigate to previous project with transition
                handleProjectTransition(prevProjectKey);
              }}
              className="cursor-pointer fixed left-6 top-1/2 -translate-y-1/2 text-black/60 hover:text-black transition-colors z-[1000] w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10"
              aria-label="Previous Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Next Project Button - Fixed positioned */}
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ 
                opacity: isTransitioning ? 0.5 : 1,
                x: 0
              }}
              transition={{ 
                duration: 0.3,
                delay: isTransitioning ? 0 : 0.6 // Delay initial appearance after content loads
              }}
              onClick={() => {
                if (!projectKey || isTransitioning) return;
                
                const projectKeys = Object.keys(projectDetails);
                const currentIndex = projectKeys.indexOf(projectKey);
                const nextIndex = (currentIndex + 1) % projectKeys.length;
                const nextProjectKey = projectKeys[nextIndex];
                
                // Navigate to next project with transition
                handleProjectTransition(nextProjectKey);
              }}
              className="cursor-pointer fixed right-6 top-1/2 -translate-y-1/2 text-black/60 hover:text-black transition-colors z-[1000] w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10"
              aria-label="Next Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: ANIMATION_TIMING.enter }}
            exit={{ opacity: 0, y: 20, transition: ANIMATION_TIMING.exit }}
            onClick={scrollToTop}
            className="cursor-pointer fixed bottom-6 right-6 text-black/60 hover:text-black transition-colors z-modal w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
} 