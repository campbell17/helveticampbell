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
}

export function getEssaySlugs() {
  const fileNames = fs.readdirSync(essaysDirectory);
  return fileNames.map(fileName => {
    return fileName.replace(/\.md$/, '');
  });
}

export function getEssayBySlug(slug: string): Essay {
  const fullPath = path.join(essaysDirectory, `${slug}.md`);
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
    ...data, // Include any other front matter fields
  };
}

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .process(markdown);
  return result.toString();
}

export async function getEssayWithHtml(slug: string): Promise<Essay> {
  const essay = getEssayBySlug(slug);
  const html = await markdownToHtml(essay.content);
  return { ...essay, html };
}

export function getAllEssays(): Essay[] {
  const slugs = getEssaySlugs();
  const essays = slugs
    .map(slug => getEssayBySlug(slug))
    .sort((essay1, essay2) => (essay1.date > essay2.date ? -1 : 1));
  return essays;
} 