import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://callmetricai.com',
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compress responses
  compress: true,
};

export default nextConfig;
