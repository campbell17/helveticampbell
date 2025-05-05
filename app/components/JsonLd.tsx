'use client';

import React from 'react';

interface PersonSchema {
  name: string;
  url: string;
  image?: string;
  sameAs?: string[];
  jobTitle?: string;
  description?: string;
}

interface WebsiteSchema {
  name: string;
  url: string;
  description?: string;
  author?: PersonSchema;
  image?: string;
}

interface PortfolioProjectSchema {
  name: string;
  description: string;
  image?: string;
  url?: string;
  creator?: PersonSchema;
  dateCreated?: string;
  keywords?: string[];
}

interface ArticleSchema {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: PersonSchema;
  publisher?: {
    name: string;
    logo?: {
      url: string;
      width: number;
      height: number;
    };
  };
  mainEntityOfPage?: string;
  keywords?: string[];
}

interface JsonLdProps {
  type: 'website' | 'person' | 'portfolio' | 'article';
  data: WebsiteSchema | PersonSchema | PortfolioProjectSchema | ArticleSchema;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  let schema;

  switch (type) {
    case 'website':
      const websiteData = data as WebsiteSchema;
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: websiteData.name,
        url: websiteData.url,
        description: websiteData.description,
        author: websiteData.author ? {
          '@type': 'Person',
          name: websiteData.author.name,
          url: websiteData.author.url,
        } : undefined,
        image: websiteData.image,
      };
      break;
    case 'person':
      const personData = data as PersonSchema;
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: personData.name,
        url: personData.url,
        jobTitle: personData.jobTitle,
        description: personData.description,
        image: personData.image,
        sameAs: personData.sameAs,
      };
      break;
    case 'portfolio':
      const portfolioData = data as PortfolioProjectSchema;
      schema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: portfolioData.name,
        description: portfolioData.description,
        image: portfolioData.image,
        url: portfolioData.url,
        creator: portfolioData.creator ? {
          '@type': 'Person',
          name: portfolioData.creator.name,
          url: portfolioData.creator.url,
        } : undefined,
        dateCreated: portfolioData.dateCreated,
        keywords: portfolioData.keywords,
      };
      break;
    case 'article':
      const articleData = data as ArticleSchema;
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleData.headline,
        description: articleData.description,
        image: articleData.image,
        datePublished: articleData.datePublished,
        dateModified: articleData.dateModified,
        author: articleData.author ? {
          '@type': 'Person',
          name: articleData.author.name,
          url: articleData.author.url,
        } : undefined,
        publisher: articleData.publisher ? {
          '@type': 'Organization',
          name: articleData.publisher.name,
          logo: articleData.publisher.logo ? {
            '@type': 'ImageObject',
            url: articleData.publisher.logo.url,
            width: articleData.publisher.logo.width,
            height: articleData.publisher.logo.height,
          } : undefined,
        } : undefined,
        mainEntityOfPage: articleData.mainEntityOfPage,
        keywords: articleData.keywords,
      };
      break;
    default:
      schema = {};
  }

  // Remove undefined values
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
} 