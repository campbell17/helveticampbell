/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Improve image loading behavior for older devices
    loader: 'default',
    // Prevent aggressive unloading of images once they're loaded
    unoptimized: false,
    // Better memory management
    formats: ['image/webp', 'image/avif'],
    domains: [
      'substackcdn.com',       // Substack CDN for images
      'substack-post-media.s3.amazonaws.com', // Substack S3 bucket
      'substack.com',          // Main Substack domain
      'campbell17.s3.amazonaws.com', // Campbell's AWS S3 bucket
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