'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Particle = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> & {
  userData: {
    speed: number
    direction: 'x' | 'z'
    distance: number
  }
}

export default function SceneBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const rendererRef = useRef<THREE.WebGLRenderer>(null)
  const animationFrameRef = useRef<number | null>(null)
  const initialCameraY = useRef(400) // Lowered from 600 to 400

  useEffect(() => {
    if (!containerRef.current) return

    console.log('Initializing Three.js scene')

    // Setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.set(150, initialCameraY.current, 400)
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
    
    // Create grid
    const viewportHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 2
    const aspectRatio = window.innerWidth / window.innerHeight
    const size = Math.max(800, viewportHeight * aspectRatio * 800)
    const divisions = Math.floor(size / 20)

    const gridHelper = new THREE.GridHelper(
      size,
      divisions,
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#999999')  // Lighter secondary color
    )
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.15  // Lower base opacity
    gridHelper.position.y = -150

    // Create a gradient texture for fading
    const canvas2 = document.createElement('canvas')
    canvas2.width = 1
    canvas2.height = 256
    const ctx = canvas2.getContext('2d')
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 256)
      gradient.addColorStop(0, 'rgba(255,255,255,0)')  // Transparent at top
      gradient.addColorStop(0.5, 'rgba(255,255,255,1)')  // Fully visible in middle
      gradient.addColorStop(1, 'rgba(255,255,255,1)')  // Fully visible at bottom
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1, 256)
    }

    const texture = new THREE.CanvasTexture(canvas2)
    texture.needsUpdate = true

    // Apply the texture to the grid material
    const gridMaterial = gridHelper.material as THREE.Material
    if ('map' in gridMaterial) {
      gridMaterial.map = texture
    }

    scene.add(gridHelper)

    console.log('Grid created with size:', size, 'divisions:', divisions)

    // Create particles
    const particleCount = Math.floor(size / 20)
    const particles = new THREE.Group()
    
    const particleGeometry = new THREE.SphereGeometry(1.5, 8, 8)
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      transparent: true,
      opacity: 0.8
    })

    console.log('Creating', particleCount, 'particles')

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone()) as Particle
      
      const isHorizontal = Math.random() > 0.5
      const startPosition = (Math.random() - 0.5) * size
      
      if (isHorizontal) {
        particle.position.set(-size/2, -150, startPosition)
      } else {
        particle.position.set(startPosition, -150, -size/2)
      }
      
      particle.userData = {
        speed: 0.4 + Math.random() * 0.4,
        direction: isHorizontal ? 'x' : 'z',
        distance: 0
      }
      
      particles.add(particle)
    }
    
    scene.add(particles)

    // Initial scroll position
    let currentScrollY = window.scrollY
    let targetScrollY = currentScrollY

    // Scroll handling
    const handleScroll = () => {
      targetScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation loop
    function animate() {
      if (!scene || !camera || !renderer) return
      
      animationFrameRef.current = requestAnimationFrame(animate)

      // Smoothly interpolate scroll position
      currentScrollY += (targetScrollY - currentScrollY) * 0.1
      camera.position.y = initialCameraY.current + (-currentScrollY * 0.25) // Add offset to scroll position

      camera.lookAt(0, -150, 0)
      
      // Update particles
      particles.children.forEach((child) => {
        const particle = child as Particle
        const { speed, direction } = particle.userData
        
        // Calculate progress based on actual position
        const progress = direction === 'x' 
          ? (particle.position.x + size/2) / size
          : (particle.position.z + size/2) / size
        
        // Create speed curve with long high-speed section
        let speedMultiplier
        if (progress < 0.1) {
          speedMultiplier = progress * 10 * 6
        } else if (progress > 0.9) {
          speedMultiplier = (1 - progress) * 10 * 6
        } else {
          speedMultiplier = 6
        }
        
        speedMultiplier = Math.max(1, Math.min(6, speedMultiplier))
        const currentSpeed = speed * speedMultiplier
        
        if (direction === 'x') {
          particle.position.x += currentSpeed
          if (particle.position.x > size/2) {
            particle.position.x = -size/2
          }
        } else {
          particle.position.z += currentSpeed
          if (particle.position.z > size/2) {
            particle.position.z = -size/2
          }
        }
      })
      
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
    }
    
    window.addEventListener('resize', handleResize)
    
    animate()
    console.log('Animation loop started')

    return () => {
      console.log('Cleaning up Three.js scene')
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      scene.remove(gridHelper)
      particles.children.forEach((child) => {
        const particle = child as Particle
        particle.geometry.dispose()
        particle.material.dispose()
      })
      scene.remove(particles)
      renderer.dispose()
      canvas.remove()
    }
  }, [])
  
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