/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is fully client-rendered, so export it as static HTML for Netlify.
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
