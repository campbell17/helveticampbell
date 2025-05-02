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
      
      {/* Main column */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <h2 className="text-xl font-bold mb-6">Productivity</h2>
          {businessEssays.length > 0 ? (
            <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm overflow-hidden shadow-md">
              {businessEssays.map((essay) => {
                const formattedDate = new Date(essay.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                
                return (
                  <Link 
                    key={essay.slug}
                    href={`/writing/${essay.slug}`} 
                    className="block py-6 border-b border-border hover:bg-neutral-50 transition-colors duration-150 px-4"
                  >
                    <div className="flex flex-col gap-2">
                      <time dateTime={essay.date} className="text-sm text-secondary">
                        {formattedDate}
                      </time>
                      <h3 className="!mb-2 font-medium text-xl text-primary">{essay.title}</h3>
                      {essay.excerpt && (
                        <p className="!mb-0 text-base text-primary/80">{essay.excerpt}</p>
                      )}
                    </div>
                  </Link>
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

        {/* Sidebar column */}
        <div className="xl:col-span-1">
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