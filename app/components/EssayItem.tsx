'use client'

import Link from 'next/link'
import { Overline } from './Typography'
import { Essay } from '../data/essays'

interface EssayItemProps {
  essay: Essay;
}

export default function EssayItem({ essay }: EssayItemProps) {
  return (
    <Link 
      href={`/writing/${essay.slug}`} 
      className="block py-6 border-b border-primary/10 hover:bg-white/5 transition-colors duration-300 rounded-md -mx-4 px-4"
    >
      <div className="flex flex-col gap-2">
        <Overline className="text-secondary">{essay.date}</Overline>
        <h3 className="font-medium text-xl text-primary">{essay.title}</h3>
        <p className="text-base text-primary/80">{essay.excerpt}</p>
      </div>
    </Link>
  )
} 