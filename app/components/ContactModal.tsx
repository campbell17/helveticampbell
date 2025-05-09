'use client'

import { Fragment, useRef } from 'react'
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useForm, ValidationError } from '@formspree/react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [state, handleSubmit] = useForm("xyzwegbk")
  const cancelButtonRef = useRef(null)
  
  return (
    <AnimatePresence>
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="relative z-lightbox"
      initialFocus={cancelButtonRef}
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
      <DialogBackdrop 
        className="fixed inset-0 bg-[var(--mode-color)] backdrop-blur-md transition-opacity"
      />
      </motion.div>
      {/* Full-screen container to center the panel */}
      <motion.div 
        className="fixed inset-0 z-10 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.10, delay: 0.1 }}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel className="relative transform rounded-xl overflow-hidden pane no-hover border border-[color:var(--color-border)] px-6 pb-6 pt-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-8">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md pane hover:text-gray-500"
                onClick={onClose}
                ref={cancelButtonRef}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <div>
              <DialogTitle as="h3" className="">
                Get in Touch
              </DialogTitle>
              
              {state.succeeded ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 my-6">
                  <p className="text-green-800 text-base mb-0">
                    Message sent! Thanks for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-[var(--text-color-light)] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full rounded-md py-2 px-3 text-[var(--text-color)] shadow-sm border border-[var(--color-border-light)] placeholder:text-[var(--text-color-light)] text-sm"
                      placeholder="Your name"
                      required
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-[var(--text-color-light)] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-md py-2 px-3 text-[var(--text-color)] shadow-sm border border-[var(--color-border-light)] placeholder:text-[var(--text-color-light)] text-sm"
                      placeholder="you@example.com"
                      required
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-[var(--text-color-light)] mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full rounded-md py-2 px-3 text-[var(--text-color)] shadow-sm border border-[var(--color-border-light)] placeholder:text-[var(--text-color-light)] text-sm"
                      placeholder="Your message"
                      required
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>

                  <div className="mt-6 pt-1 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md pane py-2 px-4 text-sm font-medium text-gray-900 shadow-sm border border-[color:var(--color-border)]"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="inline-flex justify-center rounded-md bg-[var(--theme-color)] py-2 px-4 text-sm font-medium text-[var(--text-color)] shadow-sm hover:bg-[var(--theme-color-hover)] border border-[color:var(--color-border)]"
                    >
                      {state.submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </DialogPanel>
        </div>
      </motion.div>
    </Dialog>
      </AnimatePresence>
  )
} 