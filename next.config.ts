import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'sin1.contabostorage.com',
      },
    ],
  },
  turbopack: {
    root: '.'
  }
};

export default nextConfig;
