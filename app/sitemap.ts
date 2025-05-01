import { MetadataRoute } from 'next';
import { generateSitemapUrls } from './config/siteData';

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemapUrls();
} 