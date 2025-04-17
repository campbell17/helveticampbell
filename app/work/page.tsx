import { H1 } from '../components/Typography';

export default function WorkPage() {
  return (
    <div className="rounded-[var(--container-radius)] p-8">
      <H1 className="mb-8">Selected Work</H1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg p-6 bg-black/20 backdrop-blur">
          <h2 className="text-2xl font-bold mb-3">Project Title</h2>
          <p className="text-[hsl(var(--color-text-secondary))]">Project description will go here.</p>
        </div>
        {/* Add more project cards as needed */}
      </div>
    </div>
  )
} 