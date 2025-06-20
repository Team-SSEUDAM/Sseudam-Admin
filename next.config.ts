import type { NextConfig } from "next";
import { readFileSync } from "fs";
import { join } from "path";

const nextConfig: NextConfig = {
  /* config options here */
  ...(process.env.NODE_ENV === "development" && {
    server: {
      https: {
        key: readFileSync(join(process.cwd(), "localhost-key.pem")),
        cert: readFileSync(join(process.cwd(), "localhost.pem")),
      },
    },
  }),
};

export default nextConfig;
