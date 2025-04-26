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
        if (NProgress.isStarted()) {
            NProgress.done(); 
        }
        completeLoading(); // <-- Call completeLoading
    }, 1); 

    previousPathRef.current = currentPath;

    // Cleanup
    return () => {
        clearTimeout(timer);
        if (NProgress.isStarted()) {
            NProgress.done();
        }
        completeLoading(); // <-- Call completeLoading on cleanup too
    };
  // Add completeLoading to dependencies
  }, [pathname, searchParams, completeLoading]); 

  return null; // This component is only for side effects
} 