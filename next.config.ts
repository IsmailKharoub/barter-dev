import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverComponentsExternalPackages: ['mongodb'],
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
};

export default nextConfig;
