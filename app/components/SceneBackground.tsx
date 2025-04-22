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
    float t = time * 0.15;
    
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
  const prevPathRef = useRef(pathname)
  
  // Track if we're on desktop or mobile
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  
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
  
  // Log for debugging
  const logState = () => {
    console.log('Camera state:', {
      currentX: cameraPositionRef.current.currentX,
      targetX: cameraPositionRef.current.targetX,
      currentRotationX: cameraPositionRef.current.currentRotationX,
      targetRotationX: cameraPositionRef.current.targetRotationX,
      currentRotationZ: cameraPositionRef.current.currentRotationZ,
      targetRotationZ: cameraPositionRef.current.targetRotationZ
    })
  }
  
  // Helper to get camera settings for a specific pathname
  const getCameraSettingsForPath = (path: string) => {
    let targetX = 50
    let targetRotationX = 0
    let targetRotationZ = 0
    
    switch (path) {
      case '/':
        targetX = 50
        targetRotationX = 0
        targetRotationZ = 0
        break
      case '/work':
        targetX = 100
        targetRotationX = -0.05
        targetRotationZ = 0.02
        break
      case '/writing':
        targetX = 160
        targetRotationX = 0.05
        targetRotationZ = -0.02
        break
      case '/who':
        targetX = 220
        targetRotationX = 0.03
        targetRotationZ = 0.04
        break
      default:
        targetX = 50
        targetRotationX = 0
        targetRotationZ = 0
    }
    
    return { targetX, targetRotationX, targetRotationZ }
  }
  
  // Update camera targets when pathname changes
  useEffect(() => {
    const { targetX, targetRotationX, targetRotationZ } = getCameraSettingsForPath(pathname)
    
    // Only update the target values, not the current values
    // The animation loop will handle the transition
    cameraPositionRef.current.targetX = targetX
    cameraPositionRef.current.targetRotationX = targetRotationX
    cameraPositionRef.current.targetRotationZ = targetRotationZ
    
    // Log the change for debugging
    console.log(`Path changed from ${prevPathRef.current} to ${pathname}`)
    console.log('New targets:', { targetX, targetRotationX, targetRotationZ })
    
    prevPathRef.current = pathname
  }, [pathname])
  
  // Handle device detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
    }
    
    // Initial check
    setIsDesktop(mediaQuery.matches)
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])
  
  // Set up scroll handler - only for desktop
  useEffect(() => {
    if (isDesktop === null) return
    
    const handleScroll = () => {
      if (isDesktop) {
        scrollStateRef.current.target = window.scrollY
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isDesktop])
  
  // Set up Three.js scene - we only need to do this once
  useEffect(() => {
    if (!containerRef.current || isDesktop === null) return
    
    // Get initial camera settings based on the current path
    const { targetX, targetRotationX, targetRotationZ } = getCameraSettingsForPath(pathname)
    
    // Initialize the camera position ref with both current and target set to the same initial values
    // This prevents any immediate transitions on first load
    cameraPositionRef.current = {
      targetX,
      currentX: targetX, // Start with current = target for smooth transitions later
      y: 300,
      z: 300,
      targetRotationX,
      currentRotationX: targetRotationX,
      targetRotationZ,
      currentRotationZ: targetRotationZ
    }
    
    // Clean up any existing scene
    if (sceneRef.current && rendererRef.current && gridRef.current) {
      sceneRef.current.remove(gridRef.current)
      rendererRef.current.dispose()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      const existingCanvas = containerRef.current.querySelector('canvas')
      if (existingCanvas) {
        containerRef.current.removeChild(existingCanvas)
      }
    }
    
    // Create new scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    cameraRef.current = camera
    
    // Set initial camera properties
    camera.position.set(
      cameraPositionRef.current.currentX,
      cameraPositionRef.current.y,
      cameraPositionRef.current.z
    )
    
    // Set initial camera rotation
    camera.rotation.x = cameraPositionRef.current.currentRotationX
    camera.rotation.z = cameraPositionRef.current.currentRotationZ
    
    // Look at the center point
    const lookAtTarget = new THREE.Vector3(0, -150, 0)
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
    
    // Handle resize with high frequency for mobile
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      const width = window.innerWidth
      const height = window.innerHeight
      
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      
      rendererRef.current.setSize(width, height)
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    
    // Handle mobile viewport changes that occur during scrolling (URL bar hides)
    const handleViewportChanges = () => {
      if (isDesktop || !rendererRef.current) return
      
      // For mobile only - update size when viewport changes during scrolling
      handleResize()
    }
    
    window.addEventListener('resize', handleResize)
    // Add scroll listener for mobile viewport changes
    window.addEventListener('scroll', handleViewportChanges, { passive: true })
    
    // For pull-to-refresh handling
    document.addEventListener('touchmove', handleViewportChanges, { passive: true })
    document.addEventListener('touchend', handleViewportChanges, { passive: true })
    
    // Animation loop - this is where the magic happens
    const animate = () => {
      if (!gridRef.current || !cameraRef.current || !rendererRef.current || !sceneRef.current) return
      
      animationFrameRef.current = requestAnimationFrame(animate)
      
      // Update time uniform for pulsation (all devices)
      gridMaterial.uniforms.time.value += 0.01
      
      // For desktop: apply scroll and rotation effects
      if (isDesktop) {
        // Calculate the difference between current and target positions
        const xDiff = Math.abs(cameraPositionRef.current.targetX - cameraPositionRef.current.currentX)
        const rotXDiff = Math.abs(cameraPositionRef.current.targetRotationX - cameraPositionRef.current.currentRotationX)
        const rotZDiff = Math.abs(cameraPositionRef.current.targetRotationZ - cameraPositionRef.current.currentRotationZ)
        
        // Log if we're in a transition (for debugging)
        if (xDiff > 0.1 || rotXDiff > 0.001 || rotZDiff > 0.001) {
          console.log('Transitioning...', { xDiff, rotXDiff, rotZDiff })
        }
        
        // Smoothly update scroll position
        scrollStateRef.current.current += (scrollStateRef.current.target - scrollStateRef.current.current) * 0.05
        const limitedScrollY = Math.min(scrollStateRef.current.current, scrollStateRef.current.max)
        
        // Calculate camera Y position based on scroll
        const baseY = cameraPositionRef.current.y + (-limitedScrollY * 0.15)
        
        // Calculate Z offset for deep scrolling
        const extraScroll = Math.max(0, scrollStateRef.current.current - scrollStateRef.current.max)
        const zOffset = -extraScroll * 0.03
        
        // Smoothly update camera position and rotation with easing
        // Using a slower factor for smoother transitions between pages
        const transitionFactor = 0.03
        
        // Update X position
        cameraPositionRef.current.currentX += (cameraPositionRef.current.targetX - cameraPositionRef.current.currentX) * transitionFactor
        
        // Update rotations
        cameraPositionRef.current.currentRotationX += (cameraPositionRef.current.targetRotationX - cameraPositionRef.current.currentRotationX) * transitionFactor
        cameraPositionRef.current.currentRotationZ += (cameraPositionRef.current.targetRotationZ - cameraPositionRef.current.currentRotationZ) * transitionFactor
        
        // Update camera position
        cameraRef.current.position.set(
          cameraPositionRef.current.currentX,
          baseY,
          cameraPositionRef.current.z + zOffset
        )
        
        // Apply the rotation directly to the camera
        cameraRef.current.rotation.x = cameraPositionRef.current.currentRotationX
        cameraRef.current.rotation.z = cameraPositionRef.current.currentRotationZ
        
        // Keep the camera looking at the center
        cameraRef.current.lookAt(lookAtTarget)
      } else {
        // For mobile: we still want smooth transitions between pages
        const transitionFactor = 0.03
        
        // Smoothly update camera position for page transitions
        cameraPositionRef.current.currentX += (cameraPositionRef.current.targetX - cameraPositionRef.current.currentX) * transitionFactor
        cameraPositionRef.current.currentRotationX += (cameraPositionRef.current.targetRotationX - cameraPositionRef.current.currentRotationX) * transitionFactor
        cameraPositionRef.current.currentRotationZ += (cameraPositionRef.current.targetRotationZ - cameraPositionRef.current.currentRotationZ) * transitionFactor
        
        // Update camera with interpolated values
        cameraRef.current.position.set(
          cameraPositionRef.current.currentX,
          cameraPositionRef.current.y,
          cameraPositionRef.current.z
        )
        
        // Apply the interpolated rotation
        cameraRef.current.rotation.x = cameraPositionRef.current.currentRotationX
        cameraRef.current.rotation.z = cameraPositionRef.current.currentRotationZ
        
        // Keep the camera looking at the center
        cameraRef.current.lookAt(lookAtTarget)
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
    
    // Start animation
    animate()
    
    // Log initial state
    console.log('Initial camera settings:', { targetX, targetRotationX, targetRotationZ })
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleViewportChanges)
      document.removeEventListener('touchmove', handleViewportChanges)
      document.removeEventListener('touchend', handleViewportChanges)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      
      if (sceneRef.current && gridRef.current) {
        sceneRef.current.remove(gridRef.current)
      }
    }
  }, [isDesktop]) // Only depend on isDesktop, not pathname
  
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