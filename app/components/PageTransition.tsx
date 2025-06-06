'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string;
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1 
      }}
      exit={{ 
        opacity: 0 
      }}
      transition={{ 
        type: "tween", 
        ease: "easeInOut", 
        duration: 0.5 
      }}
    >
      {children}
    </motion.div>
  )
} 