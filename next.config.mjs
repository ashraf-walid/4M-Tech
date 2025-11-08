/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 85, 90, 100], 
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    allowedDevOrigins: ['http://192.168.1.4:3000'],
    allowedDevOrigins: ['http://192.168.1.3:3000'],
  },
};

export default nextConfig;

