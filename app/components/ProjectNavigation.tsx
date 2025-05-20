'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { projectDetails } from '../data/projectDetails';

interface ProjectNavigationProps {
  currentProject: string;
}

// Convert project key to URL-friendly format
const getProjectUrl = (key: string) => {
  return `/work/${key.toLowerCase().replace(/\s+/g, '-')}`;
};

export default function ProjectNavigation({ currentProject }: ProjectNavigationProps) {
  // Get all project keys
  const projectKeys = Object.keys(projectDetails);
  
  // Find current position in the project list
  const currentIndex = projectKeys.indexOf(currentProject);
  
  // Calculate previous and next project keys
  const prevIndex = (currentIndex - 1 + projectKeys.length) % projectKeys.length;
  const nextIndex = (currentIndex + 1) % projectKeys.length;
  
  const prevProjectKey = projectKeys[prevIndex];
  const nextProjectKey = projectKeys[nextIndex];
  
  return (
    <>
      {/* Previous Project Button - Fixed positioned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="fixed left-4 bottom-8 md:bottom-1/2 md:-translate-y-1/2 z-[1000]"
      >
        <Link 
          href={getProjectUrl(prevProjectKey)} 
          aria-label={`Previous Project: ${prevProjectKey}`}
          className="pane cursor-pointer flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
      </motion.div>
      
      {/* Next Project Button - Fixed positioned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="fixed left-20 md:left-auto md:right-6 bottom-8 md:bottom-1/2 md:-translate-y-1/2 z-[1000]"
      >
        <Link 
          href={getProjectUrl(nextProjectKey)} 
          aria-label={`Next Project: ${nextProjectKey}`}
          className="pane cursor-pointer flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </motion.div>
    </>
  );
} 