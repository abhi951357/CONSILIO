/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

