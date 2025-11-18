/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    qualities: [75, 85, 90, 100], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      }
    ],
  },
  experimental: {
    optimizeServerReactCache: true,
  },
};

export default nextConfig;

