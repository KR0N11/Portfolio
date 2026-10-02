import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Every route becomes route/index.html, which GitHub Pages serves without guessing.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
