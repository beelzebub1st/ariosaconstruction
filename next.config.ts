import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip Next.js type-checking during `next build`
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
