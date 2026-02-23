import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const basePath = isDev ? '' : '/Carbon-Cursor-Demo-Pub';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
