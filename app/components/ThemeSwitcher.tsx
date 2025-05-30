'use client'

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Only show the UI after mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Handle theme toggle
  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    // First set the data-theme attribute directly to ensure immediate update
    document.documentElement.setAttribute('data-theme', newTheme)
    
    // Force a small delay to allow CSS to update
    setTimeout(() => {
      // Then use the next-themes API
      setTheme(newTheme)
    }, 50)
  }
  
  // Show the opposite icon of current theme (moon for light, sun for dark)
  const IconToShow = theme === 'dark' ? MoonIcon : SunIcon
  
  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) return null

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={toggleTheme}
      className="pane cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] shadow-md hover:shadow-xs transition-all duration-200"
    >
      <IconToShow className="w-5 h-5" />
    </motion.button>
  )
} 