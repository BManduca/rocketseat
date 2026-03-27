import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  turbopack: {},
}

export default withContentlayer(nextConfig)
