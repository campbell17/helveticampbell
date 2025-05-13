import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive Redirecting | Helveticampbell',
}

export default function ArchiveRedirectPage() {
  // Redirect to the main writing page
  redirect('/writing');
} 