import type { NextConfig } from "next";
import { readFileSync } from "fs";
import { join } from "path";

const nextConfig: NextConfig = {
  /* config options here */
  server: {
    https: {
      key: readFileSync(
        join(process.cwd(), process.env.NEXT_PUBLIC_HTTPS_PEM_KEY || "")
      ),
      cert: readFileSync(
        join(process.cwd(), process.env.NEXT_PUBLIC_HTTPS_PEM || "")
      ),
    },
  },
};

export default nextConfig;
