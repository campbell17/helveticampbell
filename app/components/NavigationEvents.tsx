'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { useLoading } from '../contexts/LoadingContext'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setIsLoading } = useLoading();
  // Store previous path to compare
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const currentPath = `${pathname}?${searchParams}`;
    const previousPath = previousPathRef.current;

    // This effect now only handles the completion/cleanup side.
    // When the component renders for the new path, we assume navigation is done
    // (or finishing) and clean up the loading state.
    const timer = setTimeout(() => {
        if (NProgress.isStarted()) {
            NProgress.done(); // Ensure NProgress bar finishes
        }
        setIsLoading(false); // Ensure our spinner hides
    }, 1); // Use a very small delay

    // Update previous path ref
    previousPathRef.current = currentPath;

    // Cleanup: Still useful if component unmounts unexpectedly mid-transition.
    return () => {
        clearTimeout(timer);
        if (NProgress.isStarted()) {
            NProgress.done();
        }
        setIsLoading(false);
    };
  // Include setIsLoading in dependencies
  }, [pathname, searchParams, setIsLoading]); 

  return null; // This component is only for side effects
} 