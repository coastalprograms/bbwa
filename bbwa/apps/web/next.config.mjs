/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    optimizeCss: true,
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'dslerptraitfgcmxkhkq.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Redirects
  async redirects() {
    return [
      {
        source: '/admin/certifications',
        destination: '/admin/workers',
        permanent: true,
      },
    ]
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

export default nextConfig
