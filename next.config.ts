import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Enable static generation with SSR fallback
  trailingSlash: false,
  // Optimize for SSR deployment
  reactStrictMode: true,
  // Performance optimizations for SSR
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // External packages for server components
  serverExternalPackages: [],
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
    // Optimize CSS
    optimizeCss: true,
  },
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
