'use client'

import React, { ReactNode } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingLogoProps {
  children: ReactNode; // Expects the original SVG logo as children
  className?: string; // Allow passing className to the wrapper
  sizeClasses: string; // Pass h-* w-* classes for sizing container and ring
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({ children, className, sizeClasses }) => {
  const { isLoading } = useLoading();

  return (
    <div className={`relative inline-block ${sizeClasses} ${className || ''}`}>
      {/* Original Logo SVG passed as children */}
      <div className={`absolute inset-0 flex items-center justify-center ${sizeClasses}`}>
        {children}
      </div>

      {/* Spinning Ring - Appears only when isLoading is true */}
      <AnimatePresence>
        {/* Use only isLoading condition */}
        {isLoading && (
          <motion.div
            className={`absolute inset-0 flex items-center justify-center ${sizeClasses} scale-125`}
            initial={{ opacity: 0, scale: 1.75 }}
            animate={{ opacity: 1, scale: 1.75 }}
            exit={{ opacity: 0, scale: 1.75 }}
            transition={{ duration: 0.2 }}
          >
            <svg 
              className={`animate-spin-fast text-logo-spinner-color ${sizeClasses}`}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              {/* Background circle (strokeWidth=1) */}
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="1"
              ></circle>
              
              {/* Replace the path with a dashed circle segment */}
              <circle 
                className="opacity-75" 
                cx="12" 
                cy="12" 
                r="10" 
                fill="none" // <-- Important: No fill
                stroke="currentColor" 
                strokeWidth="1" // <-- Set desired thickness (e.g., 1)
                strokeDasharray="16 46.83" // Dash length (visible) and gap length
                strokeLinecap="round" // Optional: Make ends rounded
              ></circle>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingLogo; 