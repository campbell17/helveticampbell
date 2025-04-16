export default function Writing() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Writing</h1>
      
      <div className="space-y-8">
        <article className="rounded-lg p-6 bg-black/20 backdrop-blur">
          <h2 className="text-2xl font-bold mb-3">Article Title</h2>
          <p className="text-[hsl(var(--color-text-secondary))] mb-4">A brief excerpt from the article will appear here...</p>
          <div className="text-sm text-[hsl(var(--color-text-tertiary))]">Published on Date</div>
        </article>
        {/* Add more articles as needed */}
      </div>
    </div>
  )
} 