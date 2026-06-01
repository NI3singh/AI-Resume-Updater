/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'mammoth', 'openai'],
  },
};

module.exports = nextConfig;