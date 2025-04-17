'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Cog6ToothIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  
  const themes = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'System', value: 'system' }
  ] as const

  return (
    <div className="fixed bottom-6 left-6 w-52 text-left hidden">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-[var(--button-radius)] bg-white py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-100 data-[open]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white">
          <Cog6ToothIcon className="size-4 text-black/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="top end"
          className="w-52 origin-bottom-left rounded-[var(--container-radius)] border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {themes.map(({ name, value }) => (
            <MenuItem key={value}>
              <button 
                className="group flex w-full items-center gap-2 rounded-[var(--button-radius)] py-1.5 px-3 data-[focus]:bg-white/10"
                onClick={() => setTheme(value)}
              >
                {name}
                {theme === value && (
                  <kbd className="ml-auto font-sans text-xs text-white/50">Active</kbd>
                )}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
} 