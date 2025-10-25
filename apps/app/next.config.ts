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
};

export default nextConfig;
