'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { SunIcon, MoonIcon, FireIcon, SparklesIcon, PaintBrushIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

// Define theme types
type ThemeType = 'light' | 'dark' | 'fun' | 'system' | 'grove' | 'gametime' | 'woking' | 'maranello'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Only show the UI after mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Theme definitions with just metadata (no hardcoded colors)
  const themes = [
    { name: 'Light', value: 'light' as ThemeType, icon: SunIcon },
    { name: 'Dark', value: 'dark' as ThemeType, icon: MoonIcon },
    // { name: 'Grove', value: 'grove' as ThemeType, icon: SparklesIcon },
    // { name: 'Fun', value: 'fun' as ThemeType, icon: SparklesIcon },
    // { name: 'Gametime', value: 'gametime' as ThemeType, icon: SparklesIcon },
    // { name: 'Maranello', value: 'maranello' as ThemeType, icon: SparklesIcon },
    // { name: 'Woking', value: 'woking' as ThemeType, icon: SparklesIcon },
    { name: 'System', value: 'system' as ThemeType, icon: ComputerDesktopIcon },
  ]
  
  // Handle theme change
  function changeTheme(newTheme: ThemeType) {
    // First set the data-theme attribute directly to ensure immediate update
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Force a small delay to allow CSS to update
    setTimeout(() => {
      // Then use the next-themes API
      setTheme(newTheme);
      
    }, 50);
  }
  
  // Current theme icon
  const CurrentThemeIcon = themes.find(t => t.value === theme)?.icon || SunIcon
  // const CurrentThemeIcon = PaintBrushIcon
  
  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=""
    >
      <Menu>
        <div>
          <MenuButton className="pane cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] shadow-md hover:shadow-xs transition-all duration-200">
            <CurrentThemeIcon className="w-5 h-5" />
          </MenuButton>

          <MenuItems
            className="pane no-hover absolute right-0 mt-2 w-48 origin-top-right rounded-[var(--container-radius)] border border-[var(--color-border)] p-1.5 shadow-lg focus:outline-none transition-all"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="space-y-1">
              {themes.map(({ name, value, icon: Icon }) => (
                <MenuItem key={value}>
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                    className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium border border-transparent 
                      hover:data-focus:border-[var(--color-border)] hover:data-focus:bg-[var(--pane-bg-color-hover)]
                      ${theme === value ? 'font-semibold' : ''}`}
                    onClick={() => {
                      changeTheme(value);
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{name}</span>
                    {theme === value && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--theme-color)]" />
                    )}
                  </motion.button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </div>
      </Menu>
    </motion.div>
  )
} 