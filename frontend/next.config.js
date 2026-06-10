/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Rewrites are proxied with a 30s timeout by default — too short for the
  // LLM parse/verify and LaTeX compile calls.
  experimental: {
    proxyTimeout: 180_000, // ms
    // Import only the icons/components actually used instead of whole
    // packages — far fewer modules to compile in dev, smaller client bundles.
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  async rewrites() {
    const backend = process.env.BACKEND_ORIGIN ?? 'http://127.0.0.1:8000';
    return [
      { source: '/backend-api/:path*', destination: `${backend}/:path*` },
    ];
  },
};

module.exports = nextConfig;