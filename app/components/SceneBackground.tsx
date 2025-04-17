'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Custom shader for particle trails
const trailVertexShader = `
  attribute float alpha;
  varying float vAlpha;
  
  void main() {
    vAlpha = alpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 3.0;
  }
`

const trailFragmentShader = `
  varying float vAlpha;
  
  void main() {
    // Smooth fade out using alpha
    gl_FragColor = vec4(0.7, 0.9, 1.0, vAlpha);
  }
`

type Particle = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> & {
  userData: {
    speed: number
    direction: 'x' | 'z'
    distance: number
    trail: THREE.Points
    positions: THREE.Vector3[]
    alphas: number[]
  }
}

export default function SceneBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const rendererRef = useRef<THREE.WebGLRenderer>(null)
  const animationFrameRef = useRef<number | null>(null)
  const initialCameraY = useRef(300)
  const maxScrollDistance = useRef(1440) // Maximum scroll distance in pixels

  useEffect(() => {
    if (!containerRef.current) return

    console.log('Initializing Three.js scene')

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

    // Create grid with adjusted size
    const viewportHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 2
    const aspectRatio = window.innerWidth / window.innerHeight
    const size = Math.max(2400, viewportHeight * aspectRatio * 2400)
    const divisions = Math.floor(size / 45)

    const gridHelper = new THREE.GridHelper(
      size,
      divisions,
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#999999')
    )
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.15
    gridHelper.position.y = -150

    // Create a gradient texture for fading
    const canvas2 = document.createElement('canvas')
    canvas2.width = 1
    canvas2.height = 256
    const ctx = canvas2.getContext('2d')
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 256)
      gradient.addColorStop(0, 'rgba(255,255,255,0)')
      gradient.addColorStop(0.5, 'rgba(255,255,255,1)')
      gradient.addColorStop(1, 'rgba(255,255,255,1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1, 256)
    }

    const texture = new THREE.CanvasTexture(canvas2)
    texture.needsUpdate = true

    const gridMaterial = gridHelper.material as THREE.Material
    if ('map' in gridMaterial) {
      gridMaterial.map = texture
    }

    scene.add(gridHelper)

    // Create particles
    const particleCount = Math.floor(size / 80)
    const particles = new THREE.Group()
    
    const particleGeometry = new THREE.SphereGeometry(1.5, 8, 8)
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xb2e7ff,
      transparent: true,
      opacity: 0.8
    })

    // Create trail shader material
    const trailMaterial = new THREE.ShaderMaterial({
      vertexShader: trailVertexShader,
      fragmentShader: trailFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {}
    })

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone()) as Particle
      
      const isHorizontal = Math.random() > 0.5
      const startPosition = (Math.random() - 0.5) * size
      
      if (isHorizontal) {
        particle.position.set(-size/2, -150, startPosition)
      } else {
        particle.position.set(startPosition, -150, -size/2)
      }
      
      // Create trail geometry
      const trailGeometry = new THREE.BufferGeometry()
      const positions = [particle.position.clone()]
      const alphas = [1.0]
      
      trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions[0].toArray(), 3))
      trailGeometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
      
      const trail = new THREE.Points(trailGeometry, trailMaterial)
      scene.add(trail)
      
      particle.userData = {
        speed: 2 + Math.random() * 2,
        direction: isHorizontal ? 'x' : 'z',
        distance: 0,
        trail,
        positions,
        alphas
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
      currentScrollY += (targetScrollY - currentScrollY) * 0.05
      
      // Limit scroll distance
      const limitedScrollY = Math.min(currentScrollY, maxScrollDistance.current)
      
      // SENSITIVITY
      camera.position.y = initialCameraY.current + (-limitedScrollY * 0.15)

      camera.lookAt(0, -150, 0)
      
      // Update particles
      particles.children.forEach((child) => {
        const particle = child as Particle
        const { speed, direction, trail, positions, alphas } = particle.userData
        
        // Calculate progress based on actual position
        const progress = direction === 'x' 
          ? (particle.position.x + size/2) / size
          : (particle.position.z + size/2) / size
        
        // Continuous speed increase based on progress
        const speedMultiplier = 1 + (progress * 2)
        const currentSpeed = speed * speedMultiplier
        
        if (direction === 'x') {
          particle.position.x += currentSpeed
          if (particle.position.x > size/2) {
            particle.position.x = -size/2
            // Clear trail when wrapping around
            positions.length = 0
            alphas.length = 0
          }
        } else {
          particle.position.z += currentSpeed
          if (particle.position.z > size/2) {
            particle.position.z = -size/2
            // Clear trail when wrapping around
            positions.length = 0
            alphas.length = 0
          }
        }
        
        // Add new position to trail
        positions.push(particle.position.clone())
        alphas.push(1.0)
        
        // Limit trail length
        if (positions.length > 30) { // Maximum 30 points in trail
          positions.shift()
          alphas.shift()
        }
        
        // Fade out older positions
        for (let i = 0; i < alphas.length; i++) {
          alphas[i] *= 0.99
        }
        
        // Update trail geometry
        const positionArray = new Float32Array(positions.length * 3)
        const alphaArray = new Float32Array(alphas.length)
        
        positions.forEach((pos, i) => {
          positionArray[i * 3] = pos.x
          positionArray[i * 3 + 1] = pos.y
          positionArray[i * 3 + 2] = pos.z
          alphaArray[i] = alphas[i]
        })
        
        trail.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3))
        trail.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphaArray, 1))
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
        // Clean up trail
        if (particle.userData.trail) {
          particle.userData.trail.geometry.dispose()
          const material = particle.userData.trail.material as THREE.Material
          material.dispose()
          scene.remove(particle.userData.trail)
        }
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