/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'substackcdn.com',       // Substack CDN for images
      'substack-post-media.s3.amazonaws.com', // Substack S3 bucket
      'substack.com',          // Main Substack domain
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.substackcdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
};

export default nextConfig; 