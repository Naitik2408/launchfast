import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/auth", "@repo/billing", "@repo/email", "@repo/ui"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
