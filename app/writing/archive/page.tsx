import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { H1, Overline } from '../../components/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ArchiveFilterClient from '../../components/ArchiveFilterClient';

// Define OG image parameters
const ogTitle = 'Writing Archive';
const ogSubtitle = 'Browse my complete collection of essays by topic.';
const ogImageUrl = `/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}`;

// Define a type for our markdown essays
interface Essay {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

export const metadata: Metadata = {
  title: 'Writing Archive | Helveticampbell',
  description: 'Browse my complete collection of essays by topic.',
  alternates: {
    canonical: '/writing/archive',
  },
  openGraph: {
    title: 'Writing Archive | Helveticampbell',
    description: 'Browse my complete collection of essays by topic.',
    url: 'https://helveticampbell.com/writing/archive',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Tim Campbell\'s Essay Archive'
      }
    ],
    type: 'website'
  }
}

// Function to get essay metadata from files - runs server-side
function getEssays(): { essays: Essay[], allTags: string[] } {
  try {
    const essaysDir = path.join(process.cwd(), 'app/writing/essays');
    
    // Check if directory exists
    if (!fs.existsSync(essaysDir)) {
      console.error('Essays directory not found');
      return { essays: [], allTags: [] };
    }
    
    // Get all markdown files
    const files = fs.readdirSync(essaysDir)
      .filter(file => file.endsWith('.md'));

    let allTags: string[] = [];
      
    // Process each file to extract metadata
    const essays = files.map(file => {
      const filePath = path.join(essaysDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(content);
        
        // Extract the slug from the filename
        const slug = path.basename(file, '.md');
        
        // Collect tags for this essay
        const tags = data.tags || [];
        
        // Add tags to allTags array
        if (Array.isArray(tags)) {
          tags.forEach((tag: string) => {
            if (!allTags.includes(tag)) {
              allTags.push(tag);
            }
          });
        }
        
        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date ? new Date(data.date).toString() : new Date().toString(),
          tags: tags
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
    
    return { essays: essays as Essay[], allTags };
  } catch (error) {
    console.error('Error fetching essays:', error);
    return { essays: [], allTags: [] };
  }
}

export default function ArchivePage() {
  // Get essays and tags server-side
  const { essays, allTags } = getEssays();

  // Count essays per tag and sort by popularity
  const tagCounts: Record<string, number> = {};
  allTags.forEach(tag => {
    tagCounts[tag] = essays.filter(essay => essay.tags.includes(tag)).length;
  });
  
  // Sort tags by count (popularity) instead of alphabetically
  const sortedTags = [...allTags].sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <>
      <div className="mb-8">
        <Link href="/writing" className="group inline-flex items-center text-sm hover:text-primary transition-colors duration-300">
          <ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:text-rose-400 group-hover:-translate-x-1 transition-all duration-300" />
          <Overline>Back to Writing</Overline>
        </Link>
      </div>

      <H1>Writing Archive</H1>
      
      {/* Tag filtering section */}
      <ArchiveFilterClient essays={essays} sortedTags={sortedTags} tagCounts={tagCounts} />
    </>
  );
} 