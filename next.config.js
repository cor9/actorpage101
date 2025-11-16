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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://player.vimeo.com https://*.vimeo.com;",
          },
        ],
      },
    ];
  },
}

export default nextConfig
