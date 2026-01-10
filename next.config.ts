import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: [
      "@prisma/internals",
      "@prisma/prisma-schema-wasm",
      "@prisma/get-platform"
    ]
  }
};

export default nextConfig;
