// @ts-nocheck
import Link from 'next/link';
import Image from 'next/image';
import { H1 } from '../components/Typography';
import { getAllEssays } from '../lib/markdown';

export default function WritingPage() {
  // Get all essays - with error handling
  let essays = [];
  try {
    essays = getAllEssays();
  } catch (error) {
    console.error("Error loading essays:", error);
    // Continue with empty essays array
  }

  return (
    <>
      <H1>Writing</H1>

      <div className="subheading mb-8">
        A collection of essays, articles, and other writing.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {essays.length > 0 ? (
            <div className="space-y-12">
              {essays.slice(0, 3).map((essay) => {
                const formattedDate = new Date(essay.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                
                return (
                  <article key={essay.slug} className="relative">
                    <Link href={`/writing/${essay.slug}`} className="group">
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {essay.title}
                      </h2>
                      
                      <time dateTime={essay.date} className="text-sm text-text-secondary mb-4 block">
                        {formattedDate}
                      </time>

                      {essay.cover_image && (
                        <div className="aspect-[3/2] relative rounded-[var(--container-radius)] overflow-hidden bg-white/30 my-6">
                          <Image 
                            src={essay.cover_image}
                            alt={essay.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="prose prose-invert max-w-none line-clamp-3 mb-4">
                        <p>{essay.excerpt}</p>
                      </div>
                      
                      <div className="text-primary font-medium">
                        Read more →
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <p>
                Essay content coming soon. Check back later for updates.
              </p>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-6">All Essays</h2>
          
          {essays.length > 0 ? (
            <div className="space-y-6">
              {essays.map((essay) => {
                const formattedDate = new Date(essay.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                
                return (
                  <div key={essay.slug} className="group">
                    <Link href={`/writing/${essay.slug}`} className="block">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {essay.title}
                      </h3>
                      <time dateTime={essay.date} className="text-sm text-text-secondary">
                        {formattedDate}
                      </time>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-text-secondary">No essays found.</p>
          )}
        </div>
      </div>
    </>
  )
} 