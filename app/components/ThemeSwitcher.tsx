'use client'

import { Menu, Transition } from '@headlessui/react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { Fragment } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  
  const themes = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'System', value: 'system' }
  ] as const

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>
        {({ active }) => (
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all border border-transparent hover:border-gray-200/20 ${
              active ? 'bg-gray-200/10' : ''
            }`}
          >
            <Cog6ToothIcon className="w-6 h-6 text-[hsl(var(--color-text-primary))]" />
          </button>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter={`transition transform duration-[var(--transition-duration-normal)] ease-[var(--transition-timing-enter)]`}
        enterFrom="opacity-0 scale-[var(--scale-enter-from)]"
        enterTo="opacity-100 scale-[var(--scale-enter-to)]"
        leave={`transition transform duration-[var(--transition-duration-fast)] ease-[var(--transition-timing-leave)]`}
        leaveFrom="opacity-100 scale-[var(--scale-leave-from)]"
        leaveTo="opacity-0 scale-[var(--scale-leave-to)]"
      >
        <Menu.Items 
          className="w-36 rounded-lg container-glass p-1 focus:outline-none"
          anchor={{ to: 'top end', gap: 8 }}
        >
          {themes.map(({ name, value }) => (
            <Menu.Item key={value}>
              {({ active }: { active: boolean }) => (
                <button
                  className={`${
                    active ? 'bg-gray-200/10' : ''
                  } ${
                    theme === value ? 'text-[hsl(var(--color-text-heading))]' : 'text-[hsl(var(--color-text-primary))]'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-[var(--transition-duration-fast)]`}
                  onClick={() => setTheme(value)}
                >
                  {name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 