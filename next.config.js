/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  basePath:
    process.env.NODE_ENV === "production" ? "/nextjs-markdown-blog" : "",
  trailingSlash: true, // Make routes work when opened directly (e.g. after page refresh)
}

module.exports = nextConfig
