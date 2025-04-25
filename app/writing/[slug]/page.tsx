// @ts-nocheck
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { H1 } from '../../components/Typography';
import { getEssayWithHtml, getAllEssays, ImageReference } from '../../lib/markdown';

// We're going to use the new Next.js 15 type pattern where params is a Promise
type PageParams = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for the page - using consistent type
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  try {
    const { slug } = await params;
    const essay = await getEssayWithHtml(slug);
    
    return {
      title: `${essay.title} | Writing`,
      description: essay.excerpt || '',
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

// Function to replace image tags with Next.js Image components
function replaceImagesWithNextImage(html: string, images: ImageReference[]): string {
  if (!html || images.length === 0) return html;
  
  let updatedHtml = html;
  
  // Replace markdown image syntax
  images.forEach(image => {
    const imgRegex = new RegExp(`<img[^>]*src=["']${image.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'g');
    updatedHtml = updatedHtml.replace(imgRegex, `<span class="next-image" data-src="${image.src}" data-alt="${image.alt}"></span>`);
  });
  
  return updatedHtml;
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
  
  // Process HTML to replace image tags with placeholders
  const processedHtml = replaceImagesWithNextImage(essay.html, essay.images);
  
  return (
    <>
      <H1>{essay.title}</H1>
      
      <div className="subheading mb-8">
        <time dateTime={essay.date}>{formattedDate}</time>
        {essay.tags && essay.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {essay.tags.map((tag) => (
              <span key={tag} className="text-sm text-text-secondary">
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
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
      
      {/* Render each image using Next.js Image component */}
      {essay.images.map((image, index) => (
        <Image
          key={`${image.src}-${index}`}
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          className="hidden next-image-component"
          data-src={image.src}
        />
      ))}
      
      {/* Client-side script to replace image placeholders with actual Next.js Image components */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              document.addEventListener('DOMContentLoaded', function() {
                const placeholders = document.querySelectorAll('.next-image');
                const nextImages = document.querySelectorAll('.next-image-component');
                const nextImagesMap = {};
                
                // Create a map of images by src
                nextImages.forEach(img => {
                  const src = img.getAttribute('data-src');
                  if (src) {
                    nextImagesMap[src] = img.cloneNode(true);
                  }
                });
                
                // Replace placeholders with actual images
                placeholders.forEach(placeholder => {
                  const src = placeholder.getAttribute('data-src');
                  if (src && nextImagesMap[src]) {
                    const img = nextImagesMap[src];
                    img.className = 'next-image-rendered';
                    placeholder.parentNode.replaceChild(img, placeholder);
                  }
                });
              });
            })();
          `,
        }}
      />
    </>
  );
} 