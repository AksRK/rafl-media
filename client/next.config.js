/** @type {import('next').NextConfig} */
const nextConfig = {
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
      },
      {
        protocol: 'http',
        hostname: '192.168.31.44',
        port: '4444',
        pathname: '/uploads/*',
      },
    ],
  },
}

module.exports = nextConfig
