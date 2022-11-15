const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa')({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/]
})

module.exports = withPWA({
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4444/:path*', // The :path parameter is used here so will not be automatically passed in the query
      },
    ]
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4444',
        pathname: '/uploads/*',
      }
    ],
  }
})
