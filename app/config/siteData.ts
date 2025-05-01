/**
 * Site data configuration for Helveticampbell portfolio website
 * Contains route information and content summaries for SEO and metadata
 */

// Define the sitemap structure with content for each page
export const sitemap = {
  home: {
    path: "/",
    title: "Helveticampbell - Tim Campbell's Portfolio",
    description: "Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up.",
    content: "Tim Campbell is a designer focusing on digital product design. Portfolio showcasing work with Fulcrum, Spatial Networks, and other projects, along with writing and personal background."
  },
  who: {
    path: "/who",
    title: "Tim Campbell - About | Helveticampbell",
    description: "Learn about Tim Campbell's background, experience, and approach to design and product development.",
    content: "Tim Campbell was the sole designer on Fulcrum for its first 10 years, growing it from an idea to $12M+ in ARR with 2,000+ customers. Experienced in web and mobile app design, branding, marketing, and comfortable working with Rails, HTML, CSS, and JS/React. Previously worked with Spatial Networks and other organizations."
  },
  work: {
    path: "/work",
    title: "Portfolio & Projects | Helveticampbell",
    description: "View Tim Campbell's design and development work, including projects for Fulcrum, Spatial Networks, and more.",
    content: "Portfolio showcasing work including Fulcrum app, Spatial Networks branding, Divide for PS4, Allinspections, and other projects. Details Tim's career path from art school to becoming a product designer, with testimonials from colleagues."
  },
  writing: {
    path: "/writing",
    title: "Articles & Essays | Helveticampbell",
    description: "Essays and articles on design, productivity, and personal stories by Tim Campbell.",
    content: "A collection of essays and articles focused on productivity and personal stories. Topics range from design insights to professional experiences and creative processes."
  }
};

// Define default metadata for the site
export const defaultMetadata = {
  title: "Helveticampbell - Versatile, product-focused design",
  description: "Versatile, product-focused design. Building, shipping, and evolving digital experiences from the ground up.",
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