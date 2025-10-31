/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  }, images: {
    domains: ['scontent-hou1-1.cdninstagram.com'],
  },
};

export default nextConfig;
