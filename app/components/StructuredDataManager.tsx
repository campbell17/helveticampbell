'use client';

import React from 'react';
import JsonLd from './JsonLd';

// Define person schema that will be consistent across the site
const timCampbellPerson = {
  name: 'Tim Campbell',
  url: 'https://helveticampbell.com/who',
  jobTitle: 'Product Designer',
  description: 'Versatile, product-focused designer. Building, shipping, and evolving digital experiences from the ground up.',
  sameAs: [
    'https://github.com/helveticampbell',
    'https://linkedin.com/in/helveticampbell',
  ],
  image: 'https://helveticampbell.com/images/tim.jpg'
};

// Define the website schema that will be used on the homepage
const websiteSchema = {
  name: "Helveticampbell - Tim Campbell's Portfolio",
  url: "https://helveticampbell.com",
  description: "Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up.",
  author: timCampbellPerson,
  image: "https://helveticampbell.com/images/og-image.jpg"
};

// Component to add structured data to the homepage
export function HomepageStructuredData() {
  return <JsonLd type="website" data={websiteSchema} />;
}

// Component to add person structured data
export function PersonStructuredData() {
  return <JsonLd type="person" data={timCampbellPerson} />;
}

// Component to add portfolio project structured data
export function PortfolioStructuredData({ 
  name, 
  description, 
  image, 
  url 
}: { 
  name: string; 
  description: string; 
  image?: string; 
  url?: string;
}) {
  return (
    <JsonLd 
      type="portfolio" 
      data={{
        name,
        description,
        image,
        url: url || `https://helveticampbell.com/work`,
        creator: timCampbellPerson,
        keywords: ['design', 'portfolio', 'product design', 'ux design']
      }} 
    />
  );
}

// Component to add article structured data
export function ArticleStructuredData({
  title,
  description,
  image,
  publishDate,
  modifiedDate,
  url
}: {
  title: string;
  description: string;
  image?: string;
  publishDate?: string;
  modifiedDate?: string;
  url: string;
}) {
  return (
    <JsonLd
      type="article"
      data={{
        headline: title,
        description,
        image,
        datePublished: publishDate,
        dateModified: modifiedDate || publishDate,
        author: timCampbellPerson,
        publisher: {
          name: 'Helveticampbell',
          logo: {
            url: 'https://helveticampbell.com/images/helveticampbell-icon.svg',
            width: 60,
            height: 60
          }
        },
        mainEntityOfPage: url,
        keywords: ['design', 'portfolio', 'product design', 'ux design']
      }}
    />
  );
} 