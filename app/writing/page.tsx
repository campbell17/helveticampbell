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

  // Separate essays by tags
  const businessEssays = essays.filter(essay => 
    essay.tags && essay.tags.includes("Productivity")
  );
  
  const personalEssays = essays.filter(essay => 
    essay.tags && essay.tags.includes("Personal")
  );

  return (
    <>
      <H1>Writing</H1>

      <div className="subheading mb-8">
        A collection of essays, articles, and other writing.
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-6">Productivity</h2>
          {businessEssays.length > 0 ? (
            <div className="flex flex-col gap-4">
              {businessEssays.map((essay) => {
                const formattedDate = new Date(essay.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                
                return (
                  <article key={essay.slug} className="">
                    <Link href={`/writing/${essay.slug}`} className="group block bg-white p-10 shadow-2xl hover:shadow-xs rounded-lg hover:bg-neutral-50 transition-all duration-100">
                      <h3 className="!text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {essay.title}
                      </h3>
                      
                      <time dateTime={essay.date} className="text-sm text-text-secondary block">
                        {formattedDate}
                      </time>

                      {essay.cover_image && (
                        <div className="aspect-[3/2] relative rounded-[var(--container-radius)] overflow-hidden bg-white/30 my-6 group-hover:ring-1 group-hover:ring-primary/40 transition-all duration-300">
                          <Image 
                            src={essay.cover_image}
                            alt={essay.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover"
                          />
                        </div>
                      )}

                      {essay.excerpt && (
                        <div className="prose prose-invert max-w-none line-clamp-3 mb-4">
                          <p>{essay.excerpt}</p>
                        </div>
                      )}
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <p>
                Productivity essays coming soon. Check back later for updates.
              </p>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <h2 className="!text-3xl font-bold mb-6">Story Time</h2>
          
          {personalEssays.length > 0 ? (
            <div className="divide-y divide-neutral-200/80">
              {personalEssays.map((essay) => {
                const formattedDate = new Date(essay.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                
                return (
                  <div key={essay.slug} className="">
                    <Link href={`/writing/${essay.slug}`} className="block group p-4 hover:bg-neutral-50 ">
                      <h3 className="font-medium !text-lg !mb-0 group-hover:text-primary transition-colors duration-300">
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
            <p className="text-text-secondary">No personal essays found.</p>
          )}
        </div>
      </div>
    </>
  )
} 