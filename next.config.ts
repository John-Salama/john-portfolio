import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Enable static generation for better performance
  trailingSlash: false,
  // Optimize for Vercel deployment
  reactStrictMode: true,
  // Optimize for SSR
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Performance optimizations
  optimizeFonts: true,
};

export default nextConfig;
