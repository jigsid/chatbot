/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['ucarecdn.com', 'wordpress-1273216-4599034.cloudwaysapps.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wordpress-1273216-4599034.cloudwaysapps.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
