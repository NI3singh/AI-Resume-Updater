/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Proxy backend calls through the Next dev server so they are SAME-ORIGIN
  // with the app. This makes the HttpOnly auth cookie work over plain HTTP
  // (no cross-site SameSite issues, no CORS) regardless of whether you open
  // the app via localhost or 127.0.0.1.
  async rewrites() {
    const backend = process.env.BACKEND_ORIGIN ?? 'http://127.0.0.1:8000';
    return [
      { source: '/backend-api/:path*', destination: `${backend}/:path*` },
    ];
  },
};

module.exports = nextConfig;
