'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  
  const themes = [
    { name: 'Light', value: 'light', icon: SunIcon },
    { name: 'Dark', value: 'dark', icon: MoonIcon },
    { name: 'System', value: 'system', icon: ComputerDesktopIcon }
  ] as const

  // Get current theme icon
  const CurrentThemeIcon = themes.find(t => t.value === theme)?.icon || SunIcon

  return (
    <div className="fixed top-6 right-8">
      <Menu>
        {({ open }) => (
          <div>
            <MenuButton className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-sm border border-black/10 shadow-md hover:shadow-xs transition-all duration-200">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <CurrentThemeIcon className="w-5 h-5 text-neutral-700" />
              </motion.div>
            </MenuButton>

            <MenuItems
              className="absolute right-0 mt-2 w-48 origin-top-right rounded-[var(--container-radius)] bg-white border border-white/10 p-1.5 shadow-lg focus:outline-none transition-all"
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="py-1 space-y-1">
                {themes.map(({ name, value, icon: Icon }) => (
                  <MenuItem key={value}>
                    {({ active }) => (
                      <motion.button 
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.1 }}
                        className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                          active ? 'bg-white/30' : ''
                        } ${
                          theme === value ? 'text-black font-semibold' : 'text-neutral-600'
                        }`}
                        onClick={() => setTheme(value)}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{name}</span>
                        {theme === value && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-black/70" />
                        )}
                      </motion.button>
                    )}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </div>
        )}
      </Menu>
    </div>
  )
} 