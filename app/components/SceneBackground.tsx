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
  useEffect(() => {
    // Setup
    const scene = new THREE.Scene()
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    
    const canvas = renderer.domElement
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '-1'
    canvas.style.mixBlendMode = 'plus-lighter'
    
    document.body.appendChild(canvas)
    
    // Create grid
    // Make grid size based on viewport and camera position
    const viewportHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 2
    const aspectRatio = window.innerWidth / window.innerHeight
    const size = Math.max(800, viewportHeight * aspectRatio * 800) // Reduced base size
    const divisions = Math.floor(size / 20) // Keep grid density consistent

    const gridHelper = new THREE.GridHelper(
      size,
      divisions,
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#666666')
    )
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.3
    gridHelper.position.y = -150 // Raised grid position
    scene.add(gridHelper)

    // Create particles that will move along grid lines
    const particleCount = Math.floor(size / 10)
    const particles = new THREE.Group()
    
    // Create particle geometry and material
    const particleGeometry = new THREE.SphereGeometry(1.5, 8, 8) // Slightly smaller particles
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      transparent: true,
      opacity: 0.8
    })

    // Create particles and set them at random grid intersections
    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone()) as Particle
      
      // Random grid position
      const gridX = (Math.random() - 0.5) * size
      const gridZ = (Math.random() - 0.5) * size
      
      particle.position.set(gridX, -150, gridZ) // Match grid Y position
      
      // Add random movement properties
      particle.userData = {
        speed: 0.2 + Math.random() * 0.3, // Slightly slower for closer view
        direction: Math.random() > 0.5 ? 'x' : 'z',
        distance: 0
      }
      
      particles.add(particle)
    }
    
    scene.add(particles)
    
    // Position camera closer but maintain perspective
    camera.position.set(150, 300, 400)
    camera.lookAt(0, -150, 0) // Look at grid center
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Update particle positions
      particles.children.forEach((child) => {
        const particle = child as Particle
        const { speed, direction } = particle.userData
        
        if (direction === 'x') {
          particle.position.x += speed
          if (Math.abs(particle.position.x) > size / 2) {
            particle.position.x = -particle.position.x // Wrap around
          }
        } else {
          particle.position.z += speed
          if (Math.abs(particle.position.z) > size / 2) {
            particle.position.z = -particle.position.z // Wrap around
          }
        }
        
        // Fade opacity based on position
        const distanceFromCenter = Math.sqrt(
          particle.position.x * particle.position.x +
          particle.position.z * particle.position.z
        )
        particle.material.opacity = 0.8 * (1 - (distanceFromCenter / (size / 2)))
      })
      
      renderer.render(scene, camera)
    }
    
    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Update camera
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      
      // Update renderer
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    
    window.addEventListener('resize', handleResize)
    
    animate()
    
    return () => {
      window.removeEventListener('resize', handleResize)
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
  
  return null
} 