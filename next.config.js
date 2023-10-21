/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'gamehubimage.s3.amazonaws.com', "media.rawg.io", "jvopccbdkwxftnwwmprr.supabase.co"],
  }
}

module.exports = nextConfig
