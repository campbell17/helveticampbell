import { Metadata } from 'next';
import { generatePageMetadata } from './lib/metadata';
import HomePage from './page';

export const metadata: Metadata = generatePageMetadata('/');

export default function HomeWrapper() {
  return <HomePage />;
} 