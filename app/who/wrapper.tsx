import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';
import WhoPage from './page';

export const metadata: Metadata = generatePageMetadata('/who');

export default function WhoWrapper() {
  return <WhoPage />;
} 