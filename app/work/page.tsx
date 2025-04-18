'use client'

import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { H1 } from '../components/Typography'

function GridItem({ index }: { index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '50px'
  })

  return (
    <div 
      ref={ref}
      className={`
        relative aspect-square 
        bg-[hsl(var(--color-container-bg)/0.3)] 
        rounded-[var(--container-radius)] 
        overflow-hidden 
        group
        transition-all
        duration-[var(--duration-300)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      {/* Placeholder content */}
      <div className="absolute inset-0 flex items-center justify-center text-[hsl(var(--color-text-secondary))]">
        {index + 1}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--color-container-bg)/0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-150)]" />
    </div>
  )
}

export default function WorkPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <H1 className="mb-4">Work</H1>
      {/* Page header */}
      <div className="mb-12">
        <p className="text-[hsl(var(--color-text-secondary))] text-lg">
          A collection of selected projects and experiments.
        </p>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
        {Array.from({ length: 40 }).map((_, index) => (
          <GridItem key={index} index={index} />
        ))}
      </div>
    </div>
  )
} 