import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next.nosync",
  images: {
    contentDispositionType: "inline",
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
