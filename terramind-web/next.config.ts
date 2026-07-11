import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // .nosync keeps iCloud from syncing build output locally; Vercel needs the
  // default .next or its router can't find the build manifests.
  distDir: process.env.VERCEL ? ".next" : ".next.nosync",
  images: {
    contentDispositionType: "inline",
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
