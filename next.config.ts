import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  /* config options here */
  transpilePackages: ["next-mdx-remote"],
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 350],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;
