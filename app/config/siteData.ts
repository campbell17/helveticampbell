/**
 * Site data configuration for Helveticampbell portfolio website
 * Contains route information and content summaries for SEO and metadata
 */

// Define the sitemap structure with content for each page
export const sitemap = {
  home: {
    path: "/",
    title: "Helveticampbell - Tim Campbell's Portfolio",
    description: "I Help Software Teams Design, Build, and Evolve Their Products.",
    content: "Tim Campbell is a designer focusing on digital product design. Portfolio showcasing work with Fulcrum, Spatial Networks, and other projects, along with personal background."
  },
  who: {
    path: "/who",
    title: "Tim Campbell - About | Helveticampbell",
    description: "Learn about Tim Campbell's background, experience, and approach to design and product development.",
    content: "Tim Campbell was the sole designer on Fulcrum for its first 10 years, growing it from an idea to $12M+ in ARR with 2,000+ customers. Experienced in web and mobile app design, branding, marketing, and comfortable working with Rails, HTML, CSS, and JS/React. Previously worked with Spatial Networks and other organizations."
  }
};

// Define default metadata for the site
export const defaultMetadata = {
  title: "Helveticampbell - Versatile, product-focused design",
  description: "I Help Software Teams Design, Build, and Evolve Their Products.",
  author: "Tim Campbell",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://helveticampbell.com",
    siteName: "Helveticampbell",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Helveticampbell - Versatile, product-focused design"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@helveticampbell",
    creator: "@helveticampbell"
  }
};

// Helper function to get metadata for a specific page
export function getPageMetadata(pagePath: string) {
  // Find the page in the sitemap
  const page = Object.values(sitemap).find(page => page.path === pagePath);
  
  if (!page) {
    return defaultMetadata;
  }
  
  return {
    ...defaultMetadata,
    title: page.title,
    description: page.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: page.title,
      description: page.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: page.title,
      description: page.description
    }
  };
}

// Export the sitemap for use in the sitemap.xml generation
export function generateSitemapUrls() {
  return Object.values(sitemap).map(page => ({
    url: `https://helveticampbell.com${page.path}`,
    lastModified: new Date(),
    changefreq: 'monthly' as 'monthly' | 'always' | 'hourly' | 'daily' | 'weekly' | 'yearly' | 'never',
    priority: page.path === '/' ? 1.0 : 0.8,
  }));
}

// Define a variable for the default export
const siteData = {
  sitemap,
  defaultMetadata,
  getPageMetadata,
  generateSitemapUrls
};

// Export the variable as default
export default siteData; 