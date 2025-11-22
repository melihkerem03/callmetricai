import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Subdomain yapılandırması
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
  
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://app.callmetricai.com',
  },
  
  // Image optimization
  images: {
    domains: ['igboerxkjwvyysowwwfx.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
