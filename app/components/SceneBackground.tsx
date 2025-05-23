'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

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
  uniform vec3 floorColor;
  uniform float floorOpacity;
  uniform vec3 gridColor;
  uniform float gridOpacity;
  uniform vec3 pulseColor;
  uniform float pulseOpacity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv * 180.0;
    float t = time * 0.05;

    // Grid logic
    vec2 grid = fract(uv);
    float lineWidth = 0.99;
    float gridMask = step(lineWidth, grid.x) + step(lineWidth, grid.y);
    gridMask = min(gridMask, 1.0);

    // Pulse logic - random initial states and offsets
    vec2 id = floor(uv);
    float n = id.x * 7.0 + id.y * 13.0;
    float cell = fract(sin(n) * 43758.5453);
    
    // Create positionally-dependent offsets
    // This ensures cells are at different stages of animation from the moment the page loads
    float cellTimeOffset = cell * 10.0; // Basic offset based on cell value
    float spatialOffset = sin(id.x * 0.76) * cos(id.y * 0.31) * 15.0; // Position-based offset
    float initialPhaseOffset = cell * 23.14; // Extra randomness offset
    
    // Combine all offsets for maximum randomness in initial states
    float totalOffset = cellTimeOffset + spatialOffset + initialPhaseOffset;
    
    // Apply the combined offsets to create truly random-looking pulse states
    float pulse = sin((t * 15.0) + totalOffset) * 0.5 + 0.5;
    
    // Make the pulse smoother with easing
    pulse = smoothstep(0.1, 0.9, pulse);
    
    // Control how many cells show pulses
    float pulseRarity = smoothstep(0.96, 1.0, cell); // Very rare pulses
    
    // Simple multiplication without the minimum intensity
    // This allows pulses to completely fade out
    pulse *= pulseRarity;

    // Compose colors and opacities
    vec3 color = floorColor;
    float alpha = floorOpacity;

    // Add pulse to non-grid areas
    float nonGridMask = 1.0 - gridMask;
    color = mix(color, pulseColor, pulse * pulseOpacity * nonGridMask);
    alpha = mix(alpha, pulseOpacity * pulse, pulse * pulseOpacity * nonGridMask);

    // Add grid lines on top (almost opaque)
    color = mix(color, gridColor, gridMask * gridOpacity);
    alpha = mix(alpha, gridOpacity, gridMask * gridOpacity);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function SceneBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const gridRef = useRef<THREE.Mesh | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()
  const lastThemeRef = useRef<string | undefined>(theme);
  
  // Add theme change detection log
  useEffect(() => {
    if (theme !== lastThemeRef.current) {
      // console.log(`Theme changed from ${lastThemeRef.current} to ${theme}`);
      
      // Force document attribute update
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
      }
      
      lastThemeRef.current = theme;
    }
  }, [theme]);
  
  // Camera state
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
  
  // Centralized lookAt target
  const lookAtTarget = useRef(new THREE.Vector3(0, 75, 0)).current
  
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
    } else if (path.startsWith('/work')) {
      targetX = 100
      targetRotationX = -0.05
      targetRotationZ = 0.02
    } else if (path.startsWith('/writing')) {
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
    // Only update if cameraPositionRef is already initialized
    if (!cameraPositionRef.current) return;
    
    // Get the new camera settings
    const { targetX, targetRotationX, targetRotationZ } = getCameraSettingsForPath(pathname)
    
    // Update only the target values, preserving current values
    cameraPositionRef.current.targetX = targetX;
    cameraPositionRef.current.targetRotationX = targetRotationX;
    cameraPositionRef.current.targetRotationZ = targetRotationZ;
  }, [pathname]) // Only depends on pathname
  
  // Effect to update uniforms when theme changes
  useEffect(() => {
    if (!materialRef.current) return;
    
    // Read CSS variables for the current theme - directly using normalized values
    const floorR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-r').trim()) || 0.0;
    const floorG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-g').trim()) || 0.0;
    const floorB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-b').trim()) || 0.0;
    const floorOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-opacity').trim()) || 0.0;
    
    const gridR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-r').trim()) || 0.0;
    const gridG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-g').trim()) || 0.0;
    const gridB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-b').trim()) || 0.0;
    const gridOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-opacity').trim()) || 0.35;
    
    const pulseR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-r').trim()) || 0.0;
    const pulseG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-g').trim()) || 0.0;
    const pulseB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-b').trim()) || 0.0;
    const pulseOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-opacity').trim()) || 0.4;
        
    // Update shader uniforms with the normalized values
    materialRef.current.uniforms.floorColor.value.set(floorR, floorG, floorB);
    materialRef.current.uniforms.floorOpacity.value = floorOpacity;
    materialRef.current.uniforms.gridColor.value.set(gridR, gridG, gridB);
    materialRef.current.uniforms.gridOpacity.value = gridOpacity;
    materialRef.current.uniforms.pulseColor.value.set(pulseR, pulseG, pulseB);
    materialRef.current.uniforms.pulseOpacity.value = pulseOpacity;
    
    // Set up a MutationObserver to watch for attribute changes on the root element
    // This will catch theme changes even if they don't trigger a React state update
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          
          // Re-read CSS variables
          const newFloorR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-r').trim()) || 0.0;
          const newFloorG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-g').trim()) || 0.0;
          const newFloorB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-b').trim()) || 0.0;
          const newFloorOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-opacity').trim()) || 0.0;
          
          const newGridR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-r').trim()) || 0.0;
          const newGridG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-g').trim()) || 0.0;
          const newGridB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-b').trim()) || 0.0;
          const newGridOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-opacity').trim()) || 0.35;
          
          const newPulseR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-r').trim()) || 0.0;
          const newPulseG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-g').trim()) || 0.0;
          const newPulseB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-b').trim()) || 0.0;
          const newPulseOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-opacity').trim()) || 0.4;
                    
          // Update shader uniforms
          if (materialRef.current) {
            materialRef.current.uniforms.floorColor.value.set(newFloorR, newFloorG, newFloorB);
            materialRef.current.uniforms.floorOpacity.value = newFloorOpacity;
            materialRef.current.uniforms.gridColor.value.set(newGridR, newGridG, newGridB);
            materialRef.current.uniforms.gridOpacity.value = newGridOpacity;
            materialRef.current.uniforms.pulseColor.value.set(newPulseR, newPulseG, newPulseB);
            materialRef.current.uniforms.pulseOpacity.value = newPulseOpacity;
          }
        }
      });
    });
    
    // Start observing
    observer.observe(document.documentElement, { attributes: true });
    
    // Clean up observer
    return () => {
      observer.disconnect();
    };
    
  }, [theme]); // Update whenever theme changes
  
  // Effect 2: Set up Three.js scene ONCE and run animation loop
  useEffect(() => {
    // Wait until container is ready
    if (!containerRef.current) return
    
    // --- One-time Setup --- 
    
    // Get initial camera settings based on the current path
    const { targetX, targetRotationX, targetRotationZ } = getCameraSettingsForPath(pathname)
    
    // Critical: Don't overwrite existing camera positions if they exist
    // This preserves animation state during route changes
    if (!cameraPositionRef.current) {
      cameraPositionRef.current = {
        targetX,
        currentX: targetX, // Initial setup only - starts at target
        y: 300,
        z: 300,
        targetRotationX,
        currentRotationX: targetRotationX,
        targetRotationZ,
        currentRotationZ: targetRotationZ
      }
    } else {
      // If current state exists, just update the target (not the current)
      cameraPositionRef.current.targetX = targetX;
      cameraPositionRef.current.targetRotationX = targetRotationX;
      cameraPositionRef.current.targetRotationZ = targetRotationZ;
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
    
    // Read initial CSS variables - directly using normalized values
    const floorR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-r').trim()) || 0.0;
    const floorG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-g').trim()) || 0.0;
    const floorB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-b').trim()) || 0.0;
    const floorOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-floor-opacity').trim()) || 0;
    
    const gridR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-r').trim()) || 0.0;
    const gridG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-g').trim()) || 0.0;
    const gridB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-b').trim()) || 0.0;
    const gridOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-line-opacity').trim()) || 0.35;
    
    const pulseR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-r').trim()) || 0.0;
    const pulseG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-g').trim()) || 0.0;
    const pulseB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-b').trim()) || 0.0;
    const pulseOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pulse-opacity').trim()) || 0.4;    
   
    // Create grid
    const gridGeometry = new THREE.PlaneGeometry(4000, 4000, 100, 100)
    const gridMaterial = new THREE.ShaderMaterial({
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      uniforms: {
        time: { value: 0 },
        floorColor: { value: new THREE.Vector3(floorR, floorG, floorB) },
        floorOpacity: { value: floorOpacity },
        gridColor: { value: new THREE.Vector3(gridR, gridG, gridB) },
        gridOpacity: { value: gridOpacity },
        pulseColor: { value: new THREE.Vector3(pulseR, pulseG, pulseB) },
        pulseOpacity: { value: pulseOpacity },
      },
      transparent: true,
      side: THREE.DoubleSide
    })
    materialRef.current = gridMaterial;
    const grid = new THREE.Mesh(gridGeometry, gridMaterial)
    gridRef.current = grid
    grid.rotation.x = -Math.PI / 2
    grid.position.y = -150
    scene.add(grid)
    
    // Capture containerRef.current for cleanup
    const currentContainer = containerRef.current;

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
    window.addEventListener('resize', handleViewportChanges)
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
      
      // Interpolate camera position/rotation towards targets with a pleasing easing rate
      const transitionFactor = 0.03  // Standard smooth transition
      
      // Update positions with smooth interpolation
      cameraPositionRef.current.currentX += (cameraPositionRef.current.targetX - cameraPositionRef.current.currentX) * transitionFactor
      cameraPositionRef.current.currentRotationX += (cameraPositionRef.current.targetRotationX - cameraPositionRef.current.currentRotationX) * transitionFactor
      cameraPositionRef.current.currentRotationZ += (cameraPositionRef.current.targetRotationZ - cameraPositionRef.current.currentRotationZ) * transitionFactor
      
      // Update camera position with interpolated values
      cameraRef.current.position.set(
        cameraPositionRef.current.currentX,
        cameraPositionRef.current.y,
        cameraPositionRef.current.z
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
      window.removeEventListener('resize', handleViewportChanges)
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
      materialRef.current = null;
    }
  }, [lookAtTarget, pathname]) // Add pathname to dependency array
  
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
        pointerEvents: 'none',
        backgroundColor: 'var(--scene-bg-color)',
        transition: 'background-color 0.3s ease-in-out'
      }}
    />
  )
} 