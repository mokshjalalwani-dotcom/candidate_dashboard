import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Fix turbopack root detection warning
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Allow DummyJSON avatar images via Next.js <Image>
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
};

export default nextConfig;
