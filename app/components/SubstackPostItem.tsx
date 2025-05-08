'use client'

import { SubstackPost } from '../hooks/useSubstackPosts';
import Link from 'next/link';
import { Overline } from './Typography';
import { formatDate } from '../utils/formatDate';
import { useState } from 'react';

interface SubstackPostItemProps {
  post: SubstackPost;
}

export default function SubstackPostItem({ post }: SubstackPostItemProps) {
  const [imageError, setImageError] = useState(false);
  
  if (!post) {
    console.error('SubstackPostItem received null or undefined post');
    return null;
  }

  const formattedDate = formatDate(post.date);
  
  return (
    <Link 
      href={post.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block pane py-6 border-b border-border last:border-b-0 transition-colors duration-150 px-4"
    >
      <div className="flex flex-col gap-2">
        <Overline className="text-secondary">{formattedDate}</Overline>
        <h3 className="!mb-2 font-medium text-xl text-primary">{post.title}</h3>
        <p className="!mb-0 text-base text-primary/80">{post.description || post.excerpt}</p>
      </div>
    </Link>
  );
} 