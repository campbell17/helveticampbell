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
  const sceneRef = useRef<THREE.Scene>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const rendererRef = useRef<THREE.WebGLRenderer>(null)
  const animationFrameRef = useRef<number | null>(null)
  const initialCameraY = useRef(300)
  const maxScrollDistance = useRef(2800)
  const targetCameraX = useRef(0)
  const currentCameraX = useRef(0)
  const pathname = usePathname()
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    // Set target camera position based on current page
    switch (pathname) {
      case '/':
        targetCameraX.current = 50
        break
      case '/work':
        targetCameraX.current = 100 // Move right
        break
      case '/writing':
        targetCameraX.current = 160 // Move left
        break
      case '/who':
        targetCameraX.current = 220 // Slight right
        break
      default:
        targetCameraX.current = 50
    }
    console.log('Target camera X set to:', targetCameraX.current)
  }, [pathname])

  useEffect(() => {
    if (!containerRef.current) return

    // Setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // CAMERA VALUES
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.set(100, initialCameraY.current, 300)
    camera.lookAt(0, -150, 0)
    cameraRef.current = camera
    
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

    // Create grid with shader material
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
    grid.rotation.x = -Math.PI / 2
    grid.position.y = -150
    scene.add(grid)

    // Initial scroll position
    let currentScrollY = window.scrollY
    let targetScrollY = currentScrollY

    // Check if mobile view (md breakpoint is 768px in Tailwind by default)
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    // Run initial check
    checkIfMobile()

    // Scroll handling
    const handleScroll = () => {
      if (!isMobileView) {
        targetScrollY = window.scrollY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation loop
    function animate() {
      if (!scene || !camera || !renderer) return
      
      animationFrameRef.current = requestAnimationFrame(animate)

      // Update time uniform - keep pulsation effect for all screen sizes
      gridMaterial.uniforms.time.value += 0.01

      // Only apply scroll effects on desktop
      if (!isMobileView) {
        // Smoothly interpolate scroll position
        currentScrollY += (targetScrollY - currentScrollY) * 0.05
        const limitedScrollY = Math.min(currentScrollY, maxScrollDistance.current)
        
        // Base camera position
        const baseY = initialCameraY.current + (-limitedScrollY * 0.15)
        
        // Calculate additional z-axis movement after max scroll
        const extraScroll = Math.max(0, currentScrollY - maxScrollDistance.current)
        const zOffset = -extraScroll * 0.03 // Move camera forward along z-axis
        
        // Smoothly interpolate camera position for navigation
        currentCameraX.current += (targetCameraX.current - currentCameraX.current) * 0.05
        
        // Set camera position with scroll effects
        camera.position.set(
          currentCameraX.current,
          baseY,
          300 + zOffset // Start at 300 and move back as we scroll further
        )
      } else {
        // Fixed camera position for mobile - no scroll effects
        camera.position.set(
          targetCameraX.current,
          initialCameraY.current,
          300
        )
      }
          
      camera.lookAt(0, -150, 0)

      renderer.render(scene, camera)
    }
    
    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return
      
      const width = window.innerWidth
      const height = window.innerHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      
      // Update mobile state on resize
      checkIfMobile()
    }
    
    window.addEventListener('resize', handleResize)
    
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      scene.remove(grid)
      renderer.dispose()
      canvas.remove()
    }
  }, [pathname, isMobileView])
  
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