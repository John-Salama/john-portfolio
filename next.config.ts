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
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Enable static generation for better performance
  trailingSlash: false,
  // Optimize for Vercel deployment
  reactStrictMode: true,
};

export default nextConfig;
