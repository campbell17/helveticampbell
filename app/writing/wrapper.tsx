import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';
import WritingPage from './page';

export const metadata: Metadata = generatePageMetadata('/writing');

export default function WritingWrapper() {
  return <WritingPage />;
} 