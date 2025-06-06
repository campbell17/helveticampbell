// @ts-nocheck
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { H1, Overline } from '../../components/Typography';
import { getEssayWithHtml, getAllEssays, ImageReference } from '../../lib/markdown';
import { ArticleStructuredData } from '../../components/StructuredDataManager';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import DynamicBackLink from '../../components/DynamicBackLink';

// We're going to use the new Next.js 15 type pattern where params is a Promise
type PageParams = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for the page - using consistent type
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  try {
    const { slug } = await params;
    const essay = await getEssayWithHtml(slug);
    
    // Use the default image from the "who" page if no cover image is available
    const defaultImage = '/images/tim.jpg';
    const imageToUse = essay.cover_image || defaultImage;
    
    // Generate OG image URL using the API
    const ogImageUrl = `/api/og?title=${encodeURIComponent(essay.title)}&subtitle=${encodeURIComponent(essay.excerpt || 'Read my latest thoughts')}&image=${encodeURIComponent(imageToUse)}`;
    
    return {
      title: `${essay.title}`,
      description: essay.excerpt || '',
      alternates: {
        canonical: `https://helveticampbell.com/writing/${slug}`,
      },
      openGraph: {
        title: essay.title,
        description: essay.excerpt || '',
        url: `https://helveticampbell.com/writing/${slug}`,
        type: 'article',
        publishedTime: new Date(essay.date).toISOString(),
        authors: ['Tim Campbell'],
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: essay.title
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: essay.title,
        description: essay.excerpt || '',
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Essay Not Found',
    };
  }
}

// Generate static params for all essays to pre-render at build time
export async function generateStaticParams() {
  const essays = getAllEssays();
  
  return essays.map((essay) => ({
    slug: essay.slug,
  }));
}

// Page component - updated to handle params as a Promise
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  let essay;
  
  try {
    const { slug } = await params;
    essay = await getEssayWithHtml(slug);
  } catch (error) {
    console.error(error);
    notFound();
  }
  
  const formattedDate = new Date(essay.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Use the default image from the "who" page if no cover image is available
  const defaultImage = '/images/tim.jpg';
  const imageToUse = essay.cover_image || defaultImage;
  
  // Generate OG image URL using the API
  const ogImageUrl = `/api/og?title=${encodeURIComponent(essay.title)}&subtitle=${encodeURIComponent(essay.excerpt || 'Read my latest thoughts')}&image=${encodeURIComponent(imageToUse)}`;
  
  return (
    <div className="container-narrow px-4 sm:px-6 md:px-8 xl:px-0">
      {/* Add structured data for the article */}
      <ArticleStructuredData
        title={essay.title}
        description={essay.excerpt || ''}
        image={ogImageUrl}
        publishDate={new Date(essay.date).toISOString()}
        url={`https://helveticampbell.com/writing/${essay.slug}`}
      />
      
      {/* Dynamic Back Link */}
      <DynamicBackLink />
      
      <H1>{essay.title}</H1>
      
      <div className="subheading mb-8">
        <time dateTime={essay.date}>{formattedDate}</time>
        {essay.tags && essay.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {essay.tags.map((tag) => (
              <span key={tag} className="text-sm text-text-color-light">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {essay.cover_image && (
        <div className="aspect-[3/2] relative rounded-[var(--container-radius)] overflow-hidden bg-white/30 my-8">
          <Image 
            src={essay.cover_image}
            alt={essay.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      )}
      
      <div 
        className="prose prose-invert max-w-none essay-content"
        dangerouslySetInnerHTML={{ __html: essay.html }}
      />
    </div>
  );
} 