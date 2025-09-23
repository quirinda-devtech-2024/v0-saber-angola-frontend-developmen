/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['blob.v0.app', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
}

export default nextConfig
