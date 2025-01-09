import withPlaiceholder from "@plaiceholder/next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  const { build } = await import("velite");
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
const config = {
  // next config here...
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: [
      "swiper",
      "react-icons",
      "ssr-window",
      "dom7",
      "gsap",
    ],
  },
  webpack: (config) => {
    // 코드 스플리팅 설정 오버라이드
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      chunks: "all", // 모든 청크를 분리
      minSize: 100, // 최소 100B 이상의 청크만 분리, default: 20KB
      minChunks: 2, // 최소 2개 이상의 파일에서 사용될 때만 청크로 분리
    };
    return config;
  },
};
export default bundleAnalyzer(withPlaiceholder(config));
