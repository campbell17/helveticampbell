import { H1 } from '../components/Typography';

export default function WritingPage() {
  return (
    <div className="rounded-[var(--container-radius)] p-8">
      <H1 className="mb-8">Writing</H1>
      
      <div className="space-y-8">
        <article className="rounded-lg p-6 bg-black/20 backdrop-blur">
          <h2 className="text-2xl font-bold mb-3">Article Title</h2>
          <p className="text-[hsl(var(--color-text-secondary))] mb-4">A brief excerpt from the article will appear here...</p>
          <div className="text-sm text-[hsl(var(--color-text-tertiary))]">Published on Date</div>
        </article>
        {/* Add more articles as needed */}
      </div>
    </div>
  );
} 