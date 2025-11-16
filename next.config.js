/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't fail build on ESLint errors (warnings are still shown)
    ignoreDuringBuilds: true,
  },
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

export default nextConfig
