'use client'

import { useLayoutEffect, useRef } from 'react'

export default function ParallaxBackground() {
  const bgRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Use larger pixel values for more obvious movement
      const moveX = ((clientX - innerWidth / 2) / innerWidth) * 8 // 50px max movement
      const moveY = ((clientY - innerHeight / 2) / innerHeight) * 4

      requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={bgRef}
      className="parallax-bg"
      style={{
        backgroundImage: 'url(/images/bg-test.jpg)',
        backgroundSize: '125% 125%',
        backgroundPosition: 'center',
        filter: 'opacity(0.5)',
        position: 'fixed',
        zIndex: -1,
        left: '-12.5%',
        top: '-12.5%',
        width: '125%',
        height: '125%',
        transform: 'translate(0px, 0px)',
        transition: 'transform 0.1s ease-out', // Smooth out the movement
        willChange: 'transform' // Optimize for animations
      }}
    />
  )
} 