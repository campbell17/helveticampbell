'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  
  const themes = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'System', value: 'system' }
  ] as const

  return (
    <div className="relative">
      <Menu>
        <MenuButton className="flex items-center justify-center w-10 h-10 rounded-lg transition-all border border-transparent hover:border-gray-200/20 data-[hover]:bg-gray-200/10 data-[open]:bg-gray-200/10">
          <Cog6ToothIcon className="w-6 h-6 text-[hsl(var(--color-text-primary))]" />
        </MenuButton>

        <MenuItems
          transition
          anchor={{ to: "bottom start", gap: 8 }}
          className="w-36 origin-bottom-left rounded-lg container-glass p-1 text-sm/6 transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {themes.map(({ name, value }) => (
            <MenuItem key={value}>
              <button 
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200/10 data-[selected]:text-[hsl(var(--color-text-heading))] text-[hsl(var(--color-text-primary))]"
                onClick={() => setTheme(value)}
                data-selected={theme === value}
              >
                {name}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
} 