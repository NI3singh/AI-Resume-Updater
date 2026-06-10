/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Rewrites are proxied with a 30s timeout by default — too short for the
  // LLM parse/verify and LaTeX compile calls.
  experimental: {
    proxyTimeout: 180_000, // ms
  },

  async rewrites() {
    const backend = process.env.BACKEND_ORIGIN ?? 'http://127.0.0.1:8000';
    return [
      { source: '/backend-api/:path*', destination: `${backend}/:path*` },
    ];
  },
};

module.exports = nextConfig;