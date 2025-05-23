'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { useLoading } from '../contexts/LoadingContext'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { completeLoading } = useLoading();
  // Store previous path to compare
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Add safety check for client-side
    if (typeof window === 'undefined') return;
    
    NProgress.configure({ showSpinner: false });

    const currentPath = `${pathname}?${searchParams}`;
    const previousPath = previousPathRef.current;

    // Start NProgress immediately if path changed (visual only, no state change here)
    if (previousPath !== null && previousPath !== currentPath) {
        NProgress.start(); 
        // We no longer set isLoading=true here
    }

    // When the component renders for the new path, call completeLoading.
    const timer = setTimeout(() => {
        try {
          if (NProgress.isStarted()) {
              NProgress.done(); 
          }
          completeLoading(); // <-- Call completeLoading
        } catch (error) {
          // Gracefully handle any NProgress errors
          console.warn('Navigation progress error:', error);
          completeLoading();
        }
    }, 1); 

    previousPathRef.current = currentPath;

    // Cleanup
    return () => {
        clearTimeout(timer);
        try {
          if (NProgress.isStarted()) {
              NProgress.done();
          }
        } catch (error) {
          // Gracefully handle cleanup errors
          console.warn('Navigation cleanup error:', error);
        }
        completeLoading(); // <-- Call completeLoading on cleanup too
    };
  // Add completeLoading to dependencies
  }, [pathname, searchParams, completeLoading]); 

  return null; // This component is only for side effects
} 