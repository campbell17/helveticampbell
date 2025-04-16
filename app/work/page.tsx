export default function Work() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Selected Work</h1>
      
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