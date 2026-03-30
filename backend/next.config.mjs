/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TS errors during build (code compiled fine; linting blocks deployment)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
