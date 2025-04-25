import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { H1 } from '../../components/Typography';
import { getEssayWithHtml, getAllEssays } from '../../lib/markdown';

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const essay = await getEssayWithHtml(params.slug);
    
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

export default async function EssayPage({
  params,
}: {
  params: { slug: string };
}) {
  let essay;
  
  try {
    essay = await getEssayWithHtml(params.slug);
  } catch (error) {
    console.error(error);
    notFound();
  }
  
  const formattedDate = new Date(essay.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
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
          <img 
            src={essay.cover_image} 
            alt={essay.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      <div 
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: essay.html }}
      />
    </>
  );
} 