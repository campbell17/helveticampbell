'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Overline } from './Typography';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Separate component that uses useSearchParams
function BackLink() {
  const searchParams = useSearchParams();
  const [backLink, setBackLink] = useState({
    href: '/writing',
    text: 'Back to Writing'
  });

  useEffect(() => {
    // Check if there's a 'from' parameter in the URL
    const fromParam = searchParams.get('from');
    
    if (fromParam === 'archive') {
      setBackLink({
        href: '/writing/archive',
        text: 'Back to Archive'
      });
    }
  }, [searchParams]);

  return (
    <div className="mb-8">
      <Link href={backLink.href} className="group inline-flex items-center text-sm hover:text-primary transition-colors duration-300">
        <ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:text-rose-400 group-hover:-translate-x-1 transition-all duration-300" />
        <Overline>{backLink.text}</Overline>
      </Link>
    </div>
  );
}

// Default export with Suspense boundary
export default function DynamicBackLink() {
  return (
    <Suspense fallback={
      <div className="mb-8">
        <Link href="/writing" className="group inline-flex items-center text-sm hover:text-primary transition-colors duration-300">
          <ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:text-rose-400 group-hover:-translate-x-1 transition-all duration-300" />
          <Overline>Back to Writing</Overline>
        </Link>
      </div>
    }>
      <BackLink />
    </Suspense>
  );
} 