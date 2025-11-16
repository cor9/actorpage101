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
            value: [
              "frame-src 'self' https://player.vimeo.com https://*.vimeo.com",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://player.vimeo.com https://*.vimeo.com",
              "style-src 'self' 'unsafe-inline' https://player.vimeo.com https://*.vimeo.com",
              "img-src 'self' data: https: https://i.vimeocdn.com https://*.vimeo.com",
              "connect-src 'self' https://*.vimeo.com https://*.supabase.co wss://*.supabase.co",
            ].join('; '),
          },
        ],
      },
    ];
  },
}

export default nextConfig
