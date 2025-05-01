import { Metadata } from 'next';
import { sitemap } from '../config/siteData';

/**
 * Generate metadata for a specific page based on its path
 * @param path The route path (e.g., '/', '/who', '/work', '/writing')
 * @returns Metadata object for the page
 */
export function generatePageMetadata(path: string): Metadata {
  // Find the page in the sitemap
  const page = Object.values(sitemap).find(p => p.path === path);
  
  if (!page) {
    throw new Error(`Path "${path}" not found in sitemap configuration`);
  }
  
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://helveticampbell.com${page.path}`,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: page.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/images/og-image.jpg']
    }
  };
} 