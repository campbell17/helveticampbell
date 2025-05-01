import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';
import WorkPage from './page';

export const metadata: Metadata = generatePageMetadata('/work');

export default function WorkWrapper() {
  return <WorkPage />;
} 