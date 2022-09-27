/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["assets.stickpng.com", "www.digitaltrends.com"],
  },
};

module.exports = nextConfig;
