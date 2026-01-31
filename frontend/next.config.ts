import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable image optimization
    formats: ['image/webp', 'image/avif'],
    
    // Configure image quality options
    qualities: [75, 85, 90],
    
    // Allow localhost for development
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3001',
      },
      // Add your Payload CMS domain here when deployed
      // {
      //   protocol: 'https',
      //   hostname: 'your-payload-cms-domain.com',
      // },
    ],
    
    // Device sizes for responsive images
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Minimum cache time for optimized images (in seconds)
    minimumCacheTTL: 60,
    
    // Disable static image imports if needed
    // disableStaticImages: false,
  },
};

export default nextConfig;
