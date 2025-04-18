import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Lightbox from './Lightbox';

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

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
  gallery?: number;
}

interface ProjectDetails {
  title: string;
  description?: string;
  images: ImageData[];
}

// Project data from the original Sidebar component
const projectDetails: Record<string, ProjectDetails> = {
  "Fulcrum": {
    title: "Fulcrum",
    description: "Here's a taste of some work I've done over the years at Fulcrum. More to come...",
    images: [
      { src: "/images/work/isolated/iso-fulcrum-icon-og.jpg", alt: "Fulcrum Icon OG" },
      { src: "/images/work/isolated/iso-fulcrum-logo.jpg", alt: "Fulcrum Logo" },
      { src: "/images/work/isolated/iso-fulcrum-logo-og.jpg", alt: "Fulcrum Logo OG" },
      { src: "/images/work/isolated/iso-fulcrum-logo-live.jpg", alt: "Fulcrum Logo Live" },
      { src: "/images/work/browser/browser-fulcrum-modern-builder-empty.jpg", alt: "Fulcrum Modern Builder Empty" },
      { src: "/images/work/browser/browser-fulcrum-modern-builder-selected.jpg", alt: "Fulcrum Modern Builder Selected" },
      { src: "/images/work/browser/browser-fulcrum-modern-apps-empty.jpg", alt: "Fulcrum Modern Apps Empty" },
      { src: "/images/work/browser/browser-fulcrum-modern-apps-context.jpg", alt: "Fulcrum Modern Apps Context" },
      { src: "/images/work/browser/browser-fulcrum-modern-apps-list.jpg", alt: "Fulcrum Modern Apps List" },
      { src: "/images/work/browser/browser-fulcrum-modern-dataviewer.jpg", alt: "Fulcrum Modern Dataviewer" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-1.jpg", alt: "Fulcrum CW Office 1" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-2.jpg", alt: "Fulcrum CW Office 2" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-1.jpg", alt: "Fulcrum CW Onsite FEMA 1" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-2.jpg", alt: "Fulcrum CW Onsite FEMA 2" },
      { src: "/images/work/full/full-fulcrum-brochure-mini-1.jpg", alt: "Fulcrum Brochure Mini 1" },
      { src: "/images/work/full/full-fulcrum-brochure-mini-2.jpg", alt: "Fulcrum Brochure Mini 2" },
      { src: "/images/work/full/full-fulcrum-brochure-mini-mockup.jpg", alt: "Fulcrum Brochure Mini Mockup", fullWidth: true },
      { src: "/images/work/full/full-fulcrum-ad-2.jpg", alt: "Fulcrum Ad 2" },
      { src: "/images/work/full/full-fulcrum-book-cover.jpg", alt: "Fulcrum Book Cover" },
      { src: "/images/work/full/full-fulcrum-book-fundamentals.jpg", alt: "Fulcrum Book Fundamentals" },
      { src: "/images/work/full/full-fulcrum-book-data.jpg", alt: "Fulcrum Book Data" },
      { src: "/images/work/full/full-fulcrum-handout.jpg", alt: "Fulcrum Handout", fullWidth: true },
      { src: "/images/work/gridded/grid-fulcrum-buildericons-v3.jpg", alt: "Fulcrum Builder Icons v3" },
      { src: "/images/work/isolated/iso-fulcrum-package.jpg", alt: "Fulcrum Package" },
      { src: "/images/work/isolated/iso-fulcrum-packaging-holidaybox.jpg", alt: "Fulcrum Holiday Box", fullWidth: true },
      { src: "/images/work/isolated/iso-fulcrum-pullup-1.jpg", alt: "Fulcrum Pullup 1" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-tradeshow.jpg", alt: "Fulcrum CW Tradeshow" },
      { src: "/images/work/isolated/iso-fulcrum-sticker-1.jpg", alt: "Fulcrum Sticker 1" },
      { src: "/images/work/isolated/iso-fulcrum-sticker-2.jpg", alt: "Fulcrum Sticker 2" },
      { src: "/images/work/isolated/iso-fulcrum-button.jpg", alt: "Fulcrum Button" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-early-swag.jpg", alt: "Fulcrum CW Early Swag" },
    ]
  },
  "Spatial Networks": {
    title: "Spatial Networks",
    description: "Our parent company and Fulcrum's first customer.",
    images: [
      { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks Icon" },
      { src: "/images/work/isolated/iso-sni-logo.jpg", alt: "Spatial Networks Logo" },
      { src: "/images/work/browser/browser-sni-2011.jpg", alt: "Spatial Networks 2011 Site" },
      { src: "/images/work/browser/browser-sni-2013.jpg", alt: "Spatial Networks 2013 Site" },
      { src: "/images/work/browser/browser-sni-2017.jpg", alt: "Spatial Networks 2017 Site" },
      { src: "/images/work/browser/browser-sni-2019-1.jpg", alt: "Spatial Networks 2019 Site 1" },
      { src: "/images/work/browser/browser-sni-2019-3.jpg", alt: "Spatial Networks 2019 Site 3" },
      { src: "/images/work/browser/browser-sni-2019-4.jpg", alt: "Spatial Networks 2019 Site 4" },
      { src: "/images/work/browser/browser-sni-2019-5.jpg", alt: "Spatial Networks 2019 Site 5" },
      { src: "/images/work/browser/browser-sni-foresight-1.jpg", alt: "Spatial Networks Foresight" },
      { src: "/images/work/isolated/iso-sni-icon-fall.jpg", alt: "Spatial Networks Icon fall" },
      { src: "/images/work/isolated/iso-sni-icon-fall-tshirt.jpg", alt: "Spatial Networks Icon fall tshirt" },
      { src: "/images/work/full/full-sni-ad-1.jpg", alt: "Spatial Networks Ad 1" },
      { src: "/images/work/full/full-sni-ad-2.jpg", alt: "Spatial Networks Ad 2" },
      { src: "/images/work/isolated/iso-sni-tradeshow-booth.jpg", alt: "Spatial Networks Tradeshow booth" },
      { src: "/images/work/snapshots/snapshot-sni-tradeshow-1.jpg", alt: "Spatial Networks Tradeshow" },
    ]
  },
  "Allinspections": {
    title: "Allinspections",
    description: "Precursor to Fulcrum and my first product at Spatial Networks.",
    images: [
      { src: "/images/work/isolated/iso-allinspections-icon.jpg", alt: "Allinspections Icon" },
      { src: "/images/work/isolated/iso-allinspections-logo.jpg", alt: "Allinspections Logo" },
      { src: "/images/work/isolated/iso-allinspections-pullup-1.jpg", alt: "Allinspections Pullup 1", fullWidth: true },
      { src: "/images/work/isolated/iso-allinspections-pullup-2-alt.jpg", alt: "Allinspections Pullup 2 Alt", fullWidth: true },
      { src: "/images/work/isolated/iso-allinspections-pullup-3.jpg", alt: "Allinspections Pullup 3", fullWidth: true },
      { src: "/images/work/browser/browser-allinspections-0.jpg", alt: "Allinspections Site 1" },
      { src: "/images/work/browser/browser-allinspections-1.jpg", alt: "Allinspections Site 2" },
      { src: "/images/work/browser/browser-allinspections-2.jpg", alt: "Allinspections Site 3" },
      { src: "/images/work/browser/browser-allinspections-3.jpg", alt: "Allinspections Site 4" },
      { src: "/images/work/browser/browser-allinspections-4-1.jpg", alt: "Allinspections Site 5" },
      { src: "/images/work/browser/browser-allinspections-4-2.jpg", alt: "Allinspections Site 6" },
      { src: "/images/work/browser/browser-allinspections-4-3.jpg", alt: "Allinspections Site 7" },
      { src: "/images/work/browser/browser-allinspections-4-4.jpg", alt: "Allinspections Site 8" },
      { src: "/images/work/browser/browser-allinspections-4-5.jpg", alt: "Allinspections Site 9" },
      { src: "/images/work/browser/browser-allinspections-5.jpg", alt: "Allinspections Site 11" },
      { src: "/images/work/full/full-allinspections-brochure.jpg", alt: "Allinspections Brochure", fullWidth: true },
      { src: "/images/work/full/full-allinspections-double-ad.jpg", alt: "Allinspections Double Ad", fullWidth: true },
      { src: "/images/work/full/full-allinspections-card-1.jpg", alt: "Allinspections Card 1" },
      { src: "/images/work/full/full-allinspections-card-2.jpg", alt: "Allinspections Card 2" }
    ]
  },
  "Divide": {
    title: "Divide",
    description: "Branding, UI, game menus, HUD, icons, AR assets, world-building design.",
    images: [
      { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide Logo" },
      { src: "/images/work/isolated/iso-divide-vestige-sticker.jpg", alt: "Divide Vestige Sticker" },
      { src: "/images/work/full/full-divide-ingame-world-1.jpg", alt: "Divide In-Game World 1", fullWidth: true },
      { src: "/images/work/full/full-divide-ingame-world-2.jpg", alt: "Divide In-Game World 2", fullWidth: true },
      { src: "/images/work/full/full-divide-ingame-world-3.jpg", alt: "Divide In-Game World 3", fullWidth: true },
      { src: "/images/work/full/full-divide-ps4.jpg", alt: "Divide PS4" },
      { src: "/images/work/gridded/grid-divide-icons.jpg", alt: "Divide Icons" },
      { src: "/images/work/full/full-divide-ingame-UI-1.jpg", alt: "Divide In-Game UI 1", fullWidth: true },
      { src: "/images/work/full/full-divide-ingame-UI-2.jpg", alt: "Divide In-Game UI 2", fullWidth: true },
      { src: "/images/work/full/full-divide-ingame-codex-1.jpg", alt: "Divide In-Game Codex 1", fullWidth: true },
      { src: "/images/work/full/full-divide-ingame-codex-2.jpg", alt: "Divide In-Game Codex 2", fullWidth: true },
      { src: "/images/work/full/full-divide-ingame-codex-3.jpg", alt: "Divide In-Game Codex 3", fullWidth: true },
      { src: "/images/work/full/full-divide-ingame-codex-4.jpg", alt: "Divide In-Game Codex 4", fullWidth: true },
      { src: "/images/work/full/full-divide-brochure-1.jpg", alt: "Divide Brochure 1", fullWidth: true },
      { src: "/images/work/full/full-divide-brochure-2.jpg", alt: "Divide Brochure 2", fullWidth: true },
      { src: "/images/work/full/full-divide-soundtrack.jpg", alt: "Divide Soundtrack" },
      { src: "/images/work/full/full-divide-soundtrack-ep.jpg", alt: "Divide Soundtrack EP" },
      { src: "/images/work/full/full-divide-soundtrack-deluxe.jpg", alt: "Divide Soundtrack Deluxe" },
      { src: "/images/work/snapshots/snapshot-divide-recording-1.jpg", alt: "Divide Recording Session" }
    ]
  },
  "Branding": {
    title: "Branding",
    description: "Various logos and identity work.",
    images: [
      { src: "/images/work/isolated/iso-allinspections-icon.jpg", alt: "Allinspections Icon" },
      { src: "/images/work/isolated/iso-allinspections-logo.jpg", alt: "Allinspections Logo" },
      { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks Icon" },
      { src: "/images/work/isolated/iso-sni-logo.jpg", alt: "Spatial Networks Logo" },
      { src: "/images/work/isolated/iso-foresight-icon.jpg", alt: "Foresight Icon" },
      { src: "/images/work/isolated/iso-foresight-logo.jpg", alt: "Foresight Logo" },
      { src: "/images/work/isolated/iso-fulcrum-icon.jpg", alt: "Fulcrum Icon" },
      { src: "/images/work/isolated/iso-fulcrum-logo.jpg", alt: "Fulcrum Logo" },
      { src: "/images/work/isolated/iso-fulcrum-icon-og.jpg", alt: "Fulcrum Icon OG" },
      { src: "/images/work/isolated/iso-fulcrum-logo-og.jpg", alt: "Fulcrum Logo OG" },
      { src: "/images/work/isolated/iso-fulcrum-logo-live.jpg", alt: "Fulcrum Logo Live" },
      { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide Logo" },
      { src: "/images/work/isolated/iso-liminallab-icon.jpg", alt: "Liminal Lab mark" },
      { src: "/images/work/isolated/iso-liminallab-logo.jpg", alt: "Liminal Lab Logo" },
      { src: "/images/work/isolated/iso-cercana-icon.jpg", alt: "Cercana Systems mark" },
      { src: "/images/work/isolated/iso-cercana-logo.jpg", alt: "Cercana Systems Logo" },
      { src: "/images/work/isolated/iso-exploding-tuba-icon.jpg", alt: "Exploding Tuba Studios mark" },
      { src: "/images/work/isolated/iso-exploding-tuba-logo.jpg", alt: "Exploding Tuba Studios Logo" },      
    ]
  },
  "Personal": {
    title: "Personal",
    description: "Drawing, painting, photography, creative side projects, and the like.",
    images: [
      { src: "/images/work/full/full-personal-painting-1.jpg", alt: "Painting 1" },
      { src: "/images/work/full/full-personal-painting-2.jpg", alt: "Painting 2" },
      { src: "/images/work/full/full-personal-painting-3.jpg", alt: "Painting 3" },
      { src: "/images/work/full/full-personal-painting-4.jpg", alt: "Painting 4" },
      { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Drawing 1" },
      { src: "/images/work/full/full-personal-drawing-2.jpg", alt: "Drawing 2" },
      { src: "/images/work/full/full-personal-drawing-3.jpg", alt: "Drawing 3" },
      { src: "/images/work/full/full-personal-drawing-4.jpg", alt: "Drawing 4" },
      { src: "/images/work/full/full-personal-photo-12.png", alt: "Photo 12" },
      { src: "/images/work/full/full-personal-photo-13.png", alt: "Photo 13" },
      { src: "/images/work/full/full-personal-photo-16.jpg", alt: "Photo 16" },
      { src: "/images/work/full/full-personal-photo-19.png", alt: "Photo 19" },
      { src: "/images/work/full/full-personal-photo-21.jpg", alt: "Photo 21" },
      { src: "/images/work/full/full-personal-photo-22.jpg", alt: "Photo 22" },
      { src: "/images/work/full/full-personal-photo-23.png", alt: "Photo 23" },
      { src: "/images/work/full/full-personal-photo-25.jpg", alt: "Photo 25" },
      { src: "/images/work/full/full-personal-photo-31.jpg", alt: "Photo 31" },
      { src: "/images/work/full/full-personal-photo-32.png", alt: "Photo 32" },
      { src: "/images/work/full/full-personal-photo-33.png", alt: "Photo 33" },
      { src: "/images/work/full/full-personal-photo-35.jpg", alt: "Photo 35" },
      { src: "/images/work/full/full-personal-photo-36.png", alt: "Photo 36" },
      { src: "/images/work/full/full-personal-photo-41.png", alt: "Photo 41" },
      { src: "/images/work/full/full-personal-photo-42.png", alt: "Photo 42" },
      { src: "/images/work/full/full-personal-photo-44.png", alt: "Photo 44" },
      { src: "/images/work/full/full-personal-photo-45.png", alt: "Photo 45" },
      { src: "/images/work/full/full-personal-photo-46.png", alt: "Photo 46" },
      { src: "/images/work/full/full-personal-photo-47.png", alt: "Photo 47" },
      { src: "/images/work/full/full-personal-photo-51.png", alt: "Photo 51" },
      { src: "/images/work/full/full-personal-photo-54.jpg", alt: "Photo 54" },
      { src: "/images/work/full/full-personal-photo-58.png", alt: "Photo 58" },
      { src: "/images/work/full/full-personal-photo-59.png", alt: "Photo 59" },
      { src: "/images/work/full/full-personal-photo-64.png", alt: "Photo 64" },
      { src: "/images/work/isolated/iso-personal-murphys-garage.jpg", alt: "Murphy's Garage sticker" },
      { src: "/images/work/isolated/iso-personal-helmet-concept.jpg", alt: "Helmet design concept" },
    ]
  },
};

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projectKey: string | null;
  lightboxImageIndex: number | null;
  setLightboxImageIndex: (index: number | null) => void;
  currentGallery: string | null;
  setCurrentGallery: (gallery: string | null) => void;
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
  lightboxImageIndex,
  setLightboxImageIndex,
  currentGallery,
  setCurrentGallery
}: ProjectSidebarProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const project = projectKey ? projectDetails[projectKey] : null;
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Animation state management
  const [showPreTransition, setShowPreTransition] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Handle opening sequence
  useEffect(() => {
    if (isOpen && !showSidebar && !isExiting) {
      if (lightboxImageIndex === null) {
        // Start with pre-transition (will auto-trigger sidebar via callback)
        setShowPreTransition(true);
      } else {
        // Skip pre-transition if lightbox is open
        setShowSidebar(true);
      }
    }
  }, [isOpen, showSidebar, isExiting, lightboxImageIndex]);

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

  const handleImageClick = (index: number) => {
    // Create a unique gallery ID for this project
    if (projectKey) {
      setCurrentGallery(`project-${projectKey}`);
      setLightboxImageIndex(index);
    }
  };

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.querySelector('.project-sidebar-content');
      if (sidebar) {
        setShowBackToTop(sidebar.scrollTop > 3000);
      }
    };

    const sidebar = document.querySelector('.project-sidebar-content');
    if (sidebar) {
      sidebar.addEventListener('scroll', handleScroll);
      return () => sidebar.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    const sidebar = document.querySelector('.project-sidebar-content');
    if (sidebar) {
      sidebar.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset scroll position when opening new project
  useEffect(() => {
    if (isOpen && projectKey) {
      const timer = setTimeout(() => {
        const sidebar = document.querySelector('.project-sidebar-content');
        if (sidebar) {
          sidebar.scrollTop = 0;
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, projectKey]);

  // Handle escape key to close sidebar
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImageIndex === null) {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxImageIndex]);

  // Get images for lightbox
  const lightboxImages = projectKey ? projectDetails[projectKey]?.images || [] : [];

  if (!isOpen && !isExiting || !project) return null;

  return (
    <>
      <Lightbox
        isOpen={lightboxImageIndex !== null}
        onClose={() => {
          setLightboxImageIndex(null);
          setCurrentGallery(null);
        }}
        images={lightboxImages}
        initialImageIndex={lightboxImageIndex || 0}
      />

      {/* Pre-transition as separate component */}
      <PreTransition 
        show={showPreTransition} 
        onComplete={handlePreTransitionComplete}
        isExiting={isExiting}
        onExitComplete={handlePreTransitionExitComplete}
      />

      {/* Main Sidebar */}
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
                duration: 0.25, // Explicit hardcoded value - EDIT THIS NUMBER
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
            className="fixed inset-0 bg-[#f5f6f7] backdrop-blur-xs shadow-xl z-sidebar overflow-hidden"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0, ease: "easeOut" }}
              onClick={handleClose}
              className="cursor-pointer fixed right-6 top-6 text-black/60 hover:text-black transition-colors z-modal w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-200/90 backdrop-blur-sm border border-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <motion.div 
              className="h-full w-full overflow-y-auto project-sidebar-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: SIDEBAR_TIMING.enter.duration / 3,
                ease: "easeOut"
              }}
            >
              <div className="p-6 pt-20 md:p-12 md:pt-20 max-w-5xl mx-auto">
                {/* Project Title */}
                <motion.h2 
                  key={projectKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }} // No fade on exit
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.85, 
                    ease: "easeIn"
                  }}
                  className="text-3xl font-black text-gray-900 mb-6"
                >
                  {project.title}
                </motion.h2>

                {/* Project Description */}
                {project.description && (
                  <motion.p 
                    key={`${projectKey}-description`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 1 }} // No fade on exit
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.95, 
                      ease: "easeIn"
                    }}
                    className="text-2xl font-serif text-gray-600 mb-12"
                  >
                    {project.description}
                  </motion.p>
                )}

                {/* Project Images */}
                <motion.div 
                  key={`${projectKey}-images`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }} // No fade on exit
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.05, 
                    ease: "easeIn"
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {project.images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col gap-2 ${image.fullWidth ? 'md:col-span-2' : ''}`}
                    >
                      <div 
                        className="cursor-pointer relative group" 
                        onClick={() => handleImageClick(index)}
                      >
                        <Image 
                          src={image.src}
                          alt={image.alt}
                          width={1000} 
                          height={1000}
                          className="transition-all duration-200 group-hover:opacity-[60%]" 
                        />
                      </div>
                      {image.caption && (
                        <p className="text-sm text-gray-500 mb-4">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </motion.div>

                {/* Project Navigation */}
                <motion.div 
                  key={`${projectKey}-navigation`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }} // No fade on exit
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.8, 
                    ease: "easeOut"
                  }}
                  className="mt-8"
                >
                  {/* Next Project Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 1 }} // No fade on exit
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.9, 
                      ease: "easeOut"
                    }}
                    onClick={() => {
                      if (!projectKey) return;
                      
                      const projectKeys = Object.keys(projectDetails);
                      const currentIndex = projectKeys.indexOf(projectKey);
                      const nextIndex = (currentIndex + 1) % projectKeys.length;
                      
                      // We'll need to handle this in the parent component
                      onClose();
                      setTimeout(() => {
                        // This is where we would navigate to the next project
                        // But we'll let the parent component handle it
                      }, 500); // Use fixed cleanup time instead of removed property
                    }}
                    className="w-full bg-gray-900 text-white hover:text-white flex justify-center items-center gap-4 hover:bg-gray-800 p-8 rounded-full transition-all duration-150 ease-out"
                  >
                    <h2 className="text-xl font-black tracking-tight">
                      {Object.keys(projectDetails).indexOf(projectKey || '') === Object.keys(projectDetails).length - 1 
                        ? `Back to ${projectDetails[Object.keys(projectDetails)[0]].title}`
                        : `Up Next: ${projectDetails[Object.keys(projectDetails)[(Object.keys(projectDetails).indexOf(projectKey || '') + 1) % Object.keys(projectDetails).length]].title}`
                      }
                    </h2>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
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
            className="fixed bottom-6 right-6 text-white/60 hover:text-white transition-colors z-modal w-12 h-12 flex items-center justify-center rounded-full bg-slate-500/70 hover:bg-slate-700/90 backdrop-blur-sm border border-white/10"
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