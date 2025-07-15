'use client'

import ContactModal from './ContactModal'
import { useContactModal } from '../contexts/ContactModalContext'

export default function GlobalContactModal() {
  const { isOpen, closeModal } = useContactModal()
  
  return <ContactModal isOpen={isOpen} onClose={closeModal} />
} 