'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { usePathname } from 'next/navigation'

// Custom shader for the grid effect
const gridVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const gridFragmentShader = `
  uniform float time;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv * 180.0;
    float t = time * 0.05;
    
    // Create a grid pattern
    vec2 grid = fract(uv);
    vec2 id = floor(uv);
    
    // Create a unique value for each cell
    float n = id.x * 7.0 + id.y * 13.0;
    float cell = fract(sin(n) * 43758.5453);
    
    // Animate the cells with stronger pulsation
    float pulse = sin(t + cell * 6.28) * 0.5 + 0.5;
    pulse = pow(pulse, 0.5);
    
    // Create crisp grid lines
    float lineWidth = 0.99;
    float gridLines = step(lineWidth, grid.x) + step(lineWidth, grid.y);
    gridLines = min(gridLines, 1.0);
    
    // Create pulsation effect
    vec3 pulseColor = vec3(pulse * .90); // Almost white base color
    float pulseGlow = smoothstep(0.0, 1.0, pulse);
    pulseColor += vec3(200, 200, 200) * pulseGlow * 0.9; // Minimal glow
    float pulseOpacity = 1.0; // Pulsation opacity
    
    // Create grid lines effect
    vec3 gridColor = vec3(0); // Grid line color
    float gridOpacity = 1.0; // Grid line opacity
    
    // Combine effects
    vec3 finalColor = mix(pulseColor, gridColor, gridLines * gridOpacity);
    
    // Set final opacity
    float finalOpacity = 0.1;
    
    gl_FragColor = vec4(finalColor, finalOpacity * pulseOpacity);
  }
`

export default function SceneBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const gridRef = useRef<THREE.Mesh | null>(null)
  const pathname = usePathname()
  
  // Camera and scroll state
  const cameraPositionRef = useRef({
    // Target positions for different pages
    targetX: 50,
    currentX: 50,
    y: 300,
    z: 300,
    // New rotation properties for the rolling effect
    targetRotationX: 0,
    currentRotationX: 0,
    targetRotationZ: 0,
    currentRotationZ: 0
  })
  const scrollStateRef = useRef({
    current: 0,
    target: 0,
    max: 2800
  })
  
  // Centralized lookAt target
  const lookAtTarget = useRef(new THREE.Vector3(0, -150, 0)).current
  
  // Helper to get camera settings for a specific pathname
  const getCameraSettingsForPath = (path: string) => {
    let targetX = 50
    let targetRotationX = 0
    let targetRotationZ = 0
    
    // Use if/else if to handle path patterns
    if (path === '/') {
      targetX = 50
      targetRotationX = 0
      targetRotationZ = 0
    } else if (path === '/work') {
      targetX = 100
      targetRotationX = -0.05
      targetRotationZ = 0.02
    } else if (path.startsWith('/writing')) { // Check if path starts with /writing
      targetX = 160
      targetRotationX = 0.05
      targetRotationZ = -0.02
    } else if (path === '/who') {
      targetX = 220
      targetRotationX = 0.03
      targetRotationZ = 0.04
    } else {
      // Default to home settings for any other path
      targetX = 50
      targetRotationX = 0
      targetRotationZ = 0
    }
    
    return { targetX, targetRotationX, targetRotationZ }
  }
  
  // Effect 1: Update camera TARGETS when pathname changes
  useEffect(() => {
    const { targetX, targetRotationX, targetRotationZ } = getCameraSettingsForPath(pathname)
    
    cameraPositionRef.current.targetX = targetX
    cameraPositionRef.current.targetRotationX = targetRotationX
    cameraPositionRef.current.targetRotationZ = targetRotationZ
  }, [pathname]) // Only depends on pathname
  
  // Effect 2: Set up Three.js scene ONCE and run animation loop
  useEffect(() => {
    // Wait until container is ready
    if (!containerRef.current) return
    
    // --- One-time Setup --- 
    
    // Get initial camera settings based on the current path
    const { targetX, targetRotationX, targetRotationZ } = getCameraSettingsForPath(pathname)
    
    // Initialize the camera position ref
    cameraPositionRef.current = {
      targetX,
      currentX: targetX,
      y: 300,
      z: 300,
      targetRotationX,
      currentRotationX: targetRotationX,
      targetRotationZ,
      currentRotationZ: targetRotationZ
    }
    
    // Create new scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    cameraRef.current = camera
    camera.position.set(
      cameraPositionRef.current.currentX,
      cameraPositionRef.current.y,
      cameraPositionRef.current.z
    )
    camera.rotation.x = cameraPositionRef.current.currentRotationX
    camera.rotation.z = cameraPositionRef.current.currentRotationZ
    camera.lookAt(lookAtTarget)
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    
    const canvas = renderer.domElement
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '-1'
    containerRef.current.appendChild(canvas)
    
    // Create grid
    const gridGeometry = new THREE.PlaneGeometry(4000, 4000, 100, 100)
    const gridMaterial = new THREE.ShaderMaterial({
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      uniforms: {
        time: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide
    })
    const grid = new THREE.Mesh(gridGeometry, gridMaterial)
    gridRef.current = grid
    grid.rotation.x = -Math.PI / 2
    grid.position.y = -150
    scene.add(grid)
    
    // Capture containerRef.current for cleanup
    const currentContainer = containerRef.current;
    
    // Scroll handler (now unconditional)
    const handleScroll = () => {
      scrollStateRef.current.target = window.scrollY
    }

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      const width = window.innerWidth
      const height = window.innerHeight
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    
    // Handle mobile viewport changes (needed even if isDesktop becomes true/false later)
    const handleViewportChanges = () => {
      // Always handle resize on viewport changes now
      if (rendererRef.current) { 
        handleResize()
      }
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true }) // Add scroll listener here
    window.addEventListener('scroll', handleViewportChanges, { passive: true })
    document.addEventListener('touchmove', handleViewportChanges, { passive: true })
    document.addEventListener('touchend', handleViewportChanges, { passive: true })
    
    // Animation loop
    const animate = () => {
      if (!gridRef.current || !cameraRef.current || !rendererRef.current || !sceneRef.current) {
        // Ensure we stop if refs become null during cleanup
        animationFrameRef.current = null
        return
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
      
      // Update time uniform
      gridMaterial.uniforms.time.value += 0.01
      
      // Interpolate camera position/rotation towards targets
      const transitionFactor = 0.03
      cameraPositionRef.current.currentX += (cameraPositionRef.current.targetX - cameraPositionRef.current.currentX) * transitionFactor
      cameraPositionRef.current.currentRotationX += (cameraPositionRef.current.targetRotationX - cameraPositionRef.current.currentRotationX) * transitionFactor
      cameraPositionRef.current.currentRotationZ += (cameraPositionRef.current.targetRotationZ - cameraPositionRef.current.currentRotationZ) * transitionFactor
      
      // Apply scroll effects unconditionally
      scrollStateRef.current.current += (scrollStateRef.current.target - scrollStateRef.current.current) * 0.05
      const limitedScrollY = Math.min(scrollStateRef.current.current, scrollStateRef.current.max)
      const baseY = cameraPositionRef.current.y + (-limitedScrollY * 0.15)
      const extraScroll = Math.max(0, scrollStateRef.current.current - scrollStateRef.current.max)
      const zOffset = -extraScroll * 0.03
      
      let finalY = baseY
      let finalZ = cameraPositionRef.current.z + zOffset
      
      // Update camera position with interpolated X and calculated Y/Z
      cameraRef.current.position.set(
        cameraPositionRef.current.currentX,
        finalY,
        finalZ
      )
        
      // Apply interpolated rotation
      cameraRef.current.rotation.x = cameraPositionRef.current.currentRotationX
      cameraRef.current.rotation.z = cameraPositionRef.current.currentRotationZ
        
      // Keep looking at the target
      cameraRef.current.lookAt(lookAtTarget)
      
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
    
    // Start animation loop
    animate()
    
    // --- Cleanup --- 
    return () => {
      // Stop animation loop
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null // Explicitly nullify
      }
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll) // Remove scroll listener here
      window.removeEventListener('scroll', handleViewportChanges)
      document.removeEventListener('touchmove', handleViewportChanges)
      document.removeEventListener('touchend', handleViewportChanges)
      
      // Dispose Three.js objects
      if (rendererRef.current) {
        rendererRef.current.dispose()
        rendererRef.current = null
      }
      if (sceneRef.current) {
        if (gridRef.current) {
          sceneRef.current.remove(gridRef.current)
          gridRef.current.geometry.dispose()
          // Assuming gridMaterial is ShaderMaterial
          if (gridRef.current.material instanceof THREE.ShaderMaterial) {
             gridRef.current.material.dispose()
          }
          gridRef.current = null
        }
        sceneRef.current = null
      }
      if (cameraRef.current) {
         cameraRef.current = null
      }
      
      // Remove canvas using the captured reference
      if (currentContainer) { // Check if the captured ref exists
         const existingCanvas = currentContainer.querySelector('canvas')
         if (existingCanvas) {
           currentContainer.removeChild(existingCanvas)
         }
      }
      // Nullify refs
      rendererRef.current = null;
      sceneRef.current = null;
      gridRef.current = null;
      cameraRef.current = null;
      animationFrameRef.current = null;
    }
  }, [lookAtTarget]) // Run only ONCE on mount (lookAtTarget is stable)
  
  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  )
} 