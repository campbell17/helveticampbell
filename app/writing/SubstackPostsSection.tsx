'use client'

import { useState, useEffect } from 'react';
import { useSubstackPosts } from '../hooks/useSubstackPosts';
import SubstackPostItem from '../components/SubstackPostItem';
import { config } from '../config/environment';

export default function SubstackPostsSection() {
  const { posts, isLoading, error } = useSubstackPosts({
    publicationUrl: config.substackUrl,
    limit: 100 // Fetch all available posts
  });

  if (isLoading) {
    return (
      <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm overflow-hidden shadow-md">
        <div className="p-6 text-center">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm overflow-hidden shadow-md">
        <div className="p-6 text-center">
          Unable to load Substack posts. Please try again later.
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm overflow-hidden shadow-md">
        <div className="p-6 text-center">No posts found.</div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--container-radius)] bg-white/5 backdrop-blur-sm overflow-hidden shadow-md">
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="p-2 bg-green-500/10 text-green-400 text-xs">
          {posts.length} posts loaded successfully (requested limit: 100)
          {posts.length < 100 && (
            <span className="block mt-1">
              Note: Fewer posts than requested were returned. This could be due to API limits 
              or the publication not having that many posts.
            </span>
          )}
        </div>
      )} */}
      {posts.map(post => (
        <SubstackPostItem key={post.slug} post={post} />
      ))}
    </div>
  );
} 