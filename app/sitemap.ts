import { MetadataRoute } from 'next';
import { generateSitemapUrls } from './config/sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemapUrls();
} 