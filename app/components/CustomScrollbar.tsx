"use client";

import { useEffect, useState, useRef } from 'react';

export default function CustomScrollbar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const startDragY = useRef(0);
  const startScrollY = useRef(0);
  const [isMounted, setIsMounted] = useState(false);

  // Safe calculation for thumb position that works during SSR
  const thumbPosition = isMounted 
    ? scrollPercentage * (typeof window !== 'undefined' ? window.innerHeight - thumbHeight : 0) 
    : 0;

  useEffect(() => {
    // Mark component as mounted after first render
    setIsMounted(true);
    
    // Calculate scroll bar dimensions
    const updateScrollbar = () => {
      if (typeof window === 'undefined') return;
      
      const totalHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Calculate thumb height as a percentage of the viewport compared to total document
      const calculatedThumbHeight = Math.max(
        (viewportHeight / totalHeight) * viewportHeight,
        30 // Minimum thumb size in pixels
      );
      
      // Calculate how far down the scroll thumb should be
      const scrollPercentage = scrollTop / (totalHeight - viewportHeight);
      
      setThumbHeight(calculatedThumbHeight);
      setScrollPercentage(scrollPercentage);
    };

    // Initial calculation
    updateScrollbar();

    // Add scroll listener
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updateScrollbar);
      window.addEventListener('resize', updateScrollbar);
    }

    // Handle thumb dragging
    const handleMouseDown = (e: MouseEvent) => {
      if (thumbRef.current && thumbRef.current.contains(e.target as Node)) {
        setIsDragging(true);
        startDragY.current = e.clientY;
        startScrollY.current = window.scrollY;
        e.preventDefault();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || typeof window === 'undefined') return;
      
      // Calculate how far the mouse has moved
      const deltaY = e.clientY - startDragY.current;
      
      // Use that to determine how far to scroll the document
      const totalHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate the scaling factor to convert mouse movement to scroll
      const scrollRatio = (totalHeight - viewportHeight) / (viewportHeight - thumbHeight);
      
      // Apply the scroll
      window.scrollTo({
        top: startScrollY.current + deltaY * scrollRatio,
        behavior: 'auto'
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', updateScrollbar);
        window.removeEventListener('resize', updateScrollbar);
      }
      
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', handleMouseUp);
      }
    };
  }, [isDragging, thumbHeight, isMounted]);

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <div className="custom-scrollbar z-scrollbar">
      <div className="scrollbar-track">
        <div
          ref={thumbRef}
          className="scrollbar-thumb"
          style={{
            height: `${thumbHeight}px`,
            top: `${thumbPosition}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
            pointerEvents: 'auto'
          }}
        />
      </div>
    </div>
  );
} 