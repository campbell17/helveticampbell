'use client'

import { useState } from 'react'
import Link from 'next/link'
import ContactModal from './ContactModal'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'

export default function ContactButton() {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  const openContactModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setContactModalOpen(true)
  }

  return (
    <>
      <Link href="#contact" onClick={openContactModal} className="w-full p-6 py-4 flex items-center transition-colors">
        <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
        <span>Contact me</span>
      </Link>
      
      {/* Contact Modal */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
} 