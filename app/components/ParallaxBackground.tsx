'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    
    // Create infinite grid
    const size = 200
    const divisions = 40
    const gridHelper = new THREE.GridHelper(size, divisions, 
      new THREE.Color('hsl(var(--color-text-primary))'),
      new THREE.Color('hsl(var(--color-text-primary))')
    )
    gridHelper.material.opacity = 0.15
    gridHelper.material.transparent = true
    scene.add(gridHelper)
    
    // Position camera
    camera.position.set(0, 30, 100)
    camera.lookAt(0, 0, 0)
    
    // Animation
    let targetRotationX = 0
    let targetRotationY = 0
    let currentRotationX = 0
    let currentRotationY = 0
    
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Smooth rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05
      currentRotationY += (targetRotationY - currentRotationY) * 0.05
      
      gridHelper.rotation.x = currentRotationX
      gridHelper.rotation.y = currentRotationY
      
      renderer.render(scene, camera)
    }
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      targetRotationY = ((clientX - innerWidth / 2) / innerWidth) * 0.5
      targetRotationX = ((clientY - innerHeight / 2) / innerHeight) * 0.2
    }
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    
    animate()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{
        backgroundColor: 'hsl(var(--color-bg-primary))',
      }}
    />
  )
} 