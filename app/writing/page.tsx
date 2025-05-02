import Link from 'next/link';
import Image from 'next/image';
import { H1, H2 } from '../components/Typography';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Suspense } from 'react';
import SubstackPostsSection from './SubstackPostsSection';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
// Define a type for our markdown essays
interface LocalEssay {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

// Function to get essay metadata from files - runs server-side
function getLocalEssays(): LocalEssay[] {
  try {
    const essaysDir = path.join(process.cwd(), 'app/writing/essays');
    
    // Check if directory exists
    if (!fs.existsSync(essaysDir)) {
      console.error('Essays directory not found');
      return [];
    }
    
    // Get all markdown files
    const files = fs.readdirSync(essaysDir)
      .filter(file => file.endsWith('.md'));
      
    // Process each file to extract metadata
    const essays = files.map(file => {
      const filePath = path.join(essaysDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(content);
        
        // Extract the slug from the filename
        const slug = path.basename(file, '.md');
        
        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date ? new Date(data.date).toString() : new Date().toString(),
          excerpt: data.excerpt || data.subtitle || '',
          tags: data.tags || []
        };
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
        return null;
      }
    })
    .filter(Boolean) // Remove nulls from failed processing
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b!.date).getTime() - new Date(a!.date).getTime();
    });
    
    return essays as LocalEssay[];
  } catch (error) {
    console.error('Error fetching essays:', error);
    return [];
  }
}

export default function WritingPage() {
  // Get essays server-side
  const localEssays = getLocalEssays();

  return (
    <>
      <H1>Writing</H1>

      <div className="subheading mb-8">
        A collection of essays.
      </div>
      
      {/* Main and sidebar columns */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main column - Substack Posts */}
        <div className="xl:col-span-2">

          <div className="flex items-center justify-between mb-8">
          <Link href="https://campbellseventeen.substack.com" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center hover:text-primary transition-colors duration-300">
            <H2 className="!mb-0 transition-all duration-300">Substack Essays</H2>
            <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:text-rose-400 group-hover:translate-x-2 transition-all duration-300" />
          </Link>
        </div>

          <iframe src="https://campbellseventeen.substack.com/embed" width="100%" height="320" className="rounded-[var(--container-radius)] mb-8" style={{ border: 'none', background: 'white'}} frameBorder="0" ></iframe>          
          
          {/* Use Suspense for client-side loading */}
          <Suspense fallback={
            <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm overflow-hidden shadow-md">
              <div className="p-6 text-center">Loading posts...</div>
            </div>
          }>
            <SubstackPostsSection />
          </Suspense>
        </div>

        {/* Sidebar column - Local Essays */}
        <div className="xl:col-span-1">
          <h2 className="!text-3xl font-bold mb-6">Archive</h2>
          
          {localEssays.length > 0 ? (
            <div className="divide-y divide-neutral-200/80">
              {localEssays.map((essay) => {
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
            <p className="text-text-secondary">No essays found.</p>
          )}
        </div>
      </div>
    </>
  )
} 