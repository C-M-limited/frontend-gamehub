/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gamehubimage.s3.amazonaws.com', "media.rawg.io"],
  }
}

module.exports = nextConfig
