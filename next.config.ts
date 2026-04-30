import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "demo.marvelwall.com" },
      { protocol: "https", hostname: "*.vercel.app" },
    ],
    unoptimized: true,
  },
};
export default nextConfig;
