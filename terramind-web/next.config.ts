import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next.nosync",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
