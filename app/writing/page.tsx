import Link from 'next/link';
import Image from 'next/image';
import { H1, H2 } from '../components/Typography';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Suspense } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import UnifiedContentList from '../components/UnifiedContentList';

// Define OG image parameters
const ogTitle = 'Writing';
const ogSubtitle = 'A collection of essays about productivity, life, and childhood shenanigans.';
const defaultImage = '/images/tim.jpg';
const ogImageUrl = `/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}&image=${encodeURIComponent(defaultImage)}`;

// Define a type for our markdown essays
interface LocalEssay {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

export const metadata: Metadata = {
  title: 'Writing | Helveticampbell',
  description: 'A collection of essays about productivity, life, and childhood shenanigans.',
  alternates: {
    canonical: '/writing',
  },
  openGraph: {
    title: 'Writing | Helveticampbell',
    description: 'A collection of essays about productivity, life, and childhood shenanigans.',
    url: 'https://helveticampbell.com/writing',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Tim Campbell\'s Articles and Essays'
      }
    ],
    type: 'website'
  }
}

// Structured data for blog listing
function BlogStructuredData({ essays }: { essays: LocalEssay[] }) {
  // Transform essays to a format suitable for structured data
  const blogPosts = essays.map(essay => ({
    '@type': 'BlogPosting',
    headline: essay.title,
    datePublished: new Date(essay.date).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Tim Campbell',
      url: 'https://helveticampbell.com/who'
    },
    url: `https://helveticampbell.com/writing/${essay.slug}`,
    description: essay.excerpt || '',
  }));

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: post
      }))
    },
    url: 'https://helveticampbell.com/writing',
    name: 'Writing by Tim Campbell',
    description: 'A collection of essays about productivity, life, and childhood shenanigans.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
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
    <div className="root-page-narrow">
      <BlogStructuredData essays={localEssays} />
      
      <H1>Writing</H1>

      <div className="subheading mb-8">
        A collection of essays about productivity, life, and childhood shenanigans.
      </div>
      
      {/* Substack embed for newsletter signup */}
      {/* <div className="mb-12">
        <iframe 
          src="https://campbellseventeen.substack.com/embed" 
          width="100%" 
          height="320" 
          className="rounded-[var(--container-radius)]" 
          style={{ border: 'none', background: 'white'}} 
          frameBorder="0"
        ></iframe>
      </div> */}
      
      {/* Unified Content List with filters */}
      <Suspense fallback={
        <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm overflow-hidden shadow-md">
          <div className="p-6 text-center">Loading content...</div>
        </div>
      }>
        <UnifiedContentList localEssays={localEssays} showFilters={true} />
      </Suspense>
    </div>
  )
} 