/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: false,
    swcMinify: true,
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = {fs: false, net: false, tls: false, child_process: false}
      return config;
    },
};

module.exports = nextConfig;
