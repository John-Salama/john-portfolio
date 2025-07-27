import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Static export settings
  trailingSlash: true,
  // Optimize for static deployment
  reactStrictMode: true,
  // Performance optimizations for static sites
  compress: true,
  poweredByHeader: false,
  generateEtags: false, // Disable for static sites
  // External packages for server components
  serverExternalPackages: [],
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
