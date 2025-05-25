'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useForm, ValidationError } from '@formspree/react'
import { H2, H3 } from './Typography'

interface ContactSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactSidebar({ isOpen, onClose }: ContactSidebarProps) {
  const [state, handleSubmit] = useForm("xyzwegbk")
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-lightbox overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="pointer-events-auto w-screen sm:max-w-md"
              >
                <div className="flex h-full flex-col overflow-y-auto border-l bg-[var(--mode-color)] border-[color:var(--color-border)] shadow-xl">
                  {/* Header */}
                  <div className="px-6 pt-6 sm:px-8">
                    <div className="flex items-start justify-between">
                      <H3 className="text-lg font-medium">
                        Get in Touch
                      </H3>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md pane hover:text-gray-500"
                          onClick={onClose}
                          ref={cancelButtonRef}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="cursor-pointer h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 sm:px-8">
                    <p className="text-base !text-[var(--text-color-light)]">
                      Send questions, comments, or details about a project you're cookin' up.
                    </p> 
                  </div>
                  {/* Content */}
                  <div className="flex-1 px-6 pb-6 sm:px-8">
                    {state.succeeded ? (
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                        <p className="text-green-800 text-base mb-0">
                          Message sent! Thanks for reaching out. I'll get back to you soon.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium leading-6 text-[var(--text-color-light)] mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full rounded-md py-3 px-4 text-[var(--text-color)] shadow-sm border border-[var(--color-border)] placeholder:text-[var(--text-color-light)] text-sm"
                            placeholder="e.g. James Vowles"
                            required
                          />
                          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-sm font-medium leading-6 text-[var(--text-color-light)] mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            id="company"
                            className="block w-full rounded-md py-3 px-4 text-[var(--text-color)] shadow-sm border border-[var(--color-border)] placeholder:text-[var(--text-color-light)] text-sm"
                            placeholder="e.g. Atlassian Williams Racing"
                          />
                          <ValidationError prefix="Company" field="company" errors={state.errors} className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-[var(--text-color-light)] mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md py-3 px-4 text-[var(--text-color)] shadow-sm border border-[var(--color-border)] placeholder:text-[var(--text-color-light)] text-sm"
                            placeholder="e.g. jv@williamsf1.com"
                            required
                          />
                          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium leading-6 text-[var(--text-color-light)] mb-2">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={6}
                            className="block w-full rounded-md py-3 px-4 text-[var(--text-color)] shadow-sm border border-[var(--color-border)] placeholder:text-[var(--text-color-light)] text-sm resize-none"
                            placeholder="e.g. Valtteri, it&rsquo;s James..."
                            required
                          />
                          <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md pane py-3 px-6 text-sm font-medium text-gray-900 shadow-sm border border-[color:var(--color-border)]"
                            onClick={onClose}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={state.submitting}
                            className="inline-flex flex-1 justify-center rounded-md bg-[var(--theme-color)] py-3 px-6 text-sm font-medium !text-white shadow-sm hover:bg-[var(--theme-color-hover)] border border-[color:var(--color-border)]"
                          >
                            {state.submitting ? 'Sending...' : 'Send It'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
} 