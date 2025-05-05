import { MetadataRoute } from 'next'
import siteData from './config/siteData'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://helveticampbell.com'
  
  // Generate URLs from the sitemap data
  const routes = Object.values(siteData.sitemap).map(page => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.path === '/' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
    priority: page.path === '/' ? 1.0 : 0.8,
  }))

  return routes
} 