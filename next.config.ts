import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/internals",
    "@prisma/prisma-schema-wasm",
    "@prisma/get-platform",
  ],
};

export default nextConfig;
