/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Moved out of experimental in Next 16
  serverExternalPackages: ['pdf-parse', 'mammoth', 'openai'],
};

module.exports = nextConfig;