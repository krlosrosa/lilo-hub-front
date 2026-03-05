import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://pub-8e9c78adb7584806afb74c8dbf1e6c49.r2.dev/**')],
  },
};

export default nextConfig;
