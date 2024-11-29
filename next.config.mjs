import withPlaiceholder from "@plaiceholder/next";

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
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 350],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  swcMinify: true,
};
export default withPlaiceholder(config);
