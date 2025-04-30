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
      className="block py-6 border-b border-border hover:bg-neutral-50 transition-colors duration-150 px-4"
    >
      <div className="flex flex-col gap-2">
        <Overline className="text-secondary">{essay.date}</Overline>
        <h3 className="!mb-2 font-medium text-xl text-primary">{essay.title}</h3>
        <p className="!mb-0 text-base text-primary/80">{essay.excerpt}</p>
      </div>
    </Link>
  )
} 