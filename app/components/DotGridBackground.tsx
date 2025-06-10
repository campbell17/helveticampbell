"use client"

import { useEffect, useRef } from 'react'
import { createScope, createAnimatable } from 'animejs'

export default function DotGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<any>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const dots = useRef<{ element: HTMLElement; originalX: number; originalY: number }[]>([])
  const cleanupRef = useRef<(() => void) | null>(null)
  const smoothMouseRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const gridSize = 40 // Distance between dots - keeping looser for performance
    const dotSize = 2
    const cols = Math.ceil(window.innerWidth / gridSize)
    const rows = Math.ceil(window.innerHeight / gridSize)

    // Clear existing dots
    container.innerHTML = ''
    dots.current = []

    // Create dot grid
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const dot = document.createElement('div')
        dot.className = 'absolute rounded-full bg-[var(--text-color-light)] opacity-20'
        dot.style.width = `${dotSize}px`
        dot.style.height = `${dotSize}px`
        
        const originalX = j * gridSize
        const originalY = i * gridSize
        
        dot.style.left = `${originalX}px`
        dot.style.top = `${originalY}px`
        dot.style.transform = 'translate(-50%, -50%)'
        
        container.appendChild(dot)
        
        dots.current.push({
          element: dot,
          originalX,
          originalY
        })
      }
    }

    // Create Anime.js scope for animations
    scopeRef.current = createScope({ root: container }).add(() => {
      
      // Mouse tracking with animatable
      const mouseTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      smoothMouseRef.current = createAnimatable(mouseTarget, {
        x: 200, // Smooth mouse following
        y: 200,
        ease: 'out(2)'
      })
      
      let animationFrame: number | null = null
      let lastUpdateTime = 0
      const UPDATE_INTERVAL = 16 // ~60fps max
      
      const updateDots = (currentTime: number) => {
        // Throttle updates for performance
        if (currentTime - lastUpdateTime < UPDATE_INTERVAL) {
          animationFrame = requestAnimationFrame(updateDots)
          return
        }
        lastUpdateTime = currentTime
        
        const smoothX = smoothMouseRef.current.x()
        const smoothY = smoothMouseRef.current.y()
        
        // Animate dots based on mouse position
        dots.current.forEach(({ element, originalX, originalY }) => {
          const distance = Math.sqrt(
            Math.pow(smoothX - originalX, 2) + 
            Math.pow(smoothY - originalY, 2)
          )
          
          const maxDistance = 140 // Slightly larger interaction radius for softer falloff
          const influence = Math.max(0, 1 - distance / maxDistance)
          
          if (influence > 0) {
            // Calculate attraction towards mouse
            const directionX = smoothX - originalX
            const directionY = smoothY - originalY
            const directionLength = Math.sqrt(directionX * directionX + directionY * directionY)
            
            if (directionLength > 0) {
              const normalizedX = directionX / directionLength
              const normalizedY = directionY / directionLength
              const attractionDistance = influence * 1 // Reduced from 10px to 1px movement
              
              const translateX = attractionDistance * normalizedX
              const translateY = attractionDistance * normalizedY
              const scale = 1 + influence * 0.8 // Reduced from 1.5 to 0.8
              const opacity = 0.2 + influence * 0.4 // Reduced from 0.6 to 0.4
              
              // Apply transforms
              element.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale})`
              element.style.opacity = opacity.toString()
            }
          } else {
            // Reset to original state
            element.style.transform = 'translate(-50%, -50%) scale(1)'
            element.style.opacity = '0.2'
          }
        })
        
        animationFrame = requestAnimationFrame(updateDots)
      }
      
      let mouseMoveTimeout: NodeJS.Timeout | null = null
      
      const handleMouseMove = (e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY }
        
        // Update smooth mouse position
        smoothMouseRef.current.x(e.clientX)
        smoothMouseRef.current.y(e.clientY)
        
        // Start animation loop if not running
        if (!animationFrame) {
          animationFrame = requestAnimationFrame(updateDots)
        }
        
        // Stop animation after mouse stops moving
        if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout)
        mouseMoveTimeout = setTimeout(() => {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame)
            animationFrame = null
          }
        }, 500)
      }

      const handleMouseEnter = (e: MouseEvent) => {
        smoothMouseRef.current.x(e.clientX, 0)
        smoothMouseRef.current.y(e.clientY, 0)
        mousePos.current = { x: e.clientX, y: e.clientY }
      }

      // Mouse event listeners
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('mouseenter', handleMouseEnter, { passive: true })

      cleanupRef.current = () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseenter', handleMouseEnter)
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
        if (mouseMoveTimeout) {
          clearTimeout(mouseMoveTimeout)
        }
        if (smoothMouseRef.current) {
          smoothMouseRef.current.revert()
        }
        // Reset all dots
        dots.current.forEach(({ element }) => {
          element.style.transform = 'translate(-50%, -50%) scale(1)'
          element.style.opacity = '0.2'
        })
      }
    })

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
      if (scopeRef.current) {
        scopeRef.current.revert()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-1"
      style={{ 
        background: 'var(--bg-color)'
      }}
    />
  )
} 