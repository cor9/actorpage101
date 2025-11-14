/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['actorpage101.site', 'app.actorpage101.site'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
      },
    ],
  },
}

module.exports = nextConfig
