import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // OneDrive klasörlerinde trace dosyası sorunu için
    turbo: {
      resolveAlias: {},
    },
  },
  // Trace dosyasını devre dışı bırak (OneDrive sorunu için)
  webpack: (config) => {
    config.infrastructureLogging = { level: 'error' };
    return config;
  },
};

export default nextConfig;
