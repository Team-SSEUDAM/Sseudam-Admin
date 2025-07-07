import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://img.sseudam.me/dev/suggestion/**")],
  },
};

export default nextConfig;
