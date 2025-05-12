'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Overline } from './Typography';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function DynamicBackLink() {
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