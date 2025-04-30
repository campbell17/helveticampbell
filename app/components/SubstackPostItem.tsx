import { SubstackPost } from '../hooks/useSubstackPosts';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '../utils/formatDate';

interface SubstackPostItemProps {
  post: SubstackPost;
}

export default function SubstackPostItem({ post }: SubstackPostItemProps) {
  const imageUrl = post.cover_image?.medium || post.cover_image?.small || '/images/placeholder.jpg';
  const formattedDate = formatDate(post.date);
  
  return (
    <Link 
      href={post.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row gap-4 p-6">
        {imageUrl && imageUrl !== '/images/placeholder.jpg' && (
          <div className="w-full md:w-48 h-32 flex-shrink-0 relative overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              alt={post.title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 192px"
            />
          </div>
        )}
        
        <div className="flex flex-col">
          <h3 className="text-xl font-medium mb-2 text-primary">{post.title}</h3>
          <p className="text-secondary mb-2 line-clamp-2">{post.description || post.excerpt}</p>
          <div className="mt-auto flex items-center text-sm text-secondary">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 