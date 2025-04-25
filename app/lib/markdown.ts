import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const essaysDirectory = path.join(process.cwd(), 'app/writing/essays');

export interface EssayMeta {
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
  cover_image?: string;
  tags?: string[];
  [key: string]: any; // For any additional front matter fields
}

export interface Essay extends EssayMeta {
  content: string;
  html: string;
  images: ImageReference[];
}

export interface ImageReference {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function getEssaySlugs() {
  // Check if the directory exists
  if (!fs.existsSync(essaysDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(essaysDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export function getEssayBySlug(slug: string): Essay {
  const fullPath = path.join(essaysDirectory, `${slug}.md`);
  
  // Check if the file exists
  if (!fs.existsSync(fullPath)) {
    return {
      slug,
      content: '',
      html: '',
      title: 'Essay not found',
      date: new Date().toISOString(),
      excerpt: '',
      cover_image: '',
      tags: [],
      images: [],
    };
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);
  
  // Ensure date is a string (Jekyll dates could be Date objects)
  const date = data.date ? new Date(data.date).toISOString() : '';
  
  return {
    slug,
    content,
    html: '',
    title: data.title || '',
    date,
    excerpt: data.excerpt || '',
    cover_image: data.cover_image || '',
    tags: data.tags || [],
    images: [],
    ...data, // Include any other front matter fields
  };
}

export function extractImageReferences(markdown: string): ImageReference[] {
  // Regular expression to match Markdown image syntax: ![alt](src "optional title")
  const imageRegex = /!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/g;
  const images: ImageReference[] = [];
  let match;

  while ((match = imageRegex.exec(markdown)) !== null) {
    const alt = match[1] || '';
    const src = match[2] || '';
    
    // Skip external URLs that don't need optimization
    if (src.startsWith('http://') || src.startsWith('https://')) {
      continue;
    }
    
    images.push({ 
      src,
      alt
    });
  }

  // Also handle HTML img tags
  const htmlImgRegex = /<img.*?src=["'](.*?)["'].*?alt=["'](.*?)["'].*?>/g;
  while ((match = htmlImgRegex.exec(markdown)) !== null) {
    const src = match[1] || '';
    const alt = match[2] || '';
    
    // Skip external URLs
    if (src.startsWith('http://') || src.startsWith('https://')) {
      continue;
    }
    
    images.push({ 
      src,
      alt
    });
  }

  return images;
}

// Custom processing function to prepare markdown for Next.js rendering
export async function markdownToHtml(markdown: string) {
  // Process with remark for standard markdown
  const result = await remark()
    .use(html)
    .process(markdown);
  
  return result.toString();
}

export async function getEssayWithHtml(slug: string): Promise<Essay> {
  const essay = getEssayBySlug(slug);
  if (!essay.content) {
    return essay;
  }
  
  // Extract image references first
  const images = extractImageReferences(essay.content);
  
  // Then convert to HTML
  const html = await markdownToHtml(essay.content);
  
  return { ...essay, html, images };
}

export function getAllEssays(): Essay[] {
  const slugs = getEssaySlugs();
  if (slugs.length === 0) {
    return [];
  }
  
  const essays = slugs
    .map(slug => getEssayBySlug(slug))
    .sort((essay1, essay2) => (essay1.date > essay2.date ? -1 : 1));
  return essays;
} 