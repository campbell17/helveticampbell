'use client'

import PageTransition from '../components/PageTransition'
import { ReactNode } from 'react'

export default function WritingTemplate({ children }: { children: ReactNode }) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  )
} 