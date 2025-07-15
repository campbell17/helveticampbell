'use client'

import Link from 'next/link'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import { useContactModal } from '../contexts/ContactModalContext'

export default function ContactButton() {
  const { openModal } = useContactModal()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openModal()
  }

  return (
    <Link href="#contact" onClick={handleClick} className="w-full p-6 py-4 flex items-center transition-colors">
      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
      <span>Contact me</span>
    </Link>
  )
} 