/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false
  },
  i18n: {
    locales: ["en-GB", "pl-PL"],
    defaultLocale: "en-GB",
  },
  compiler: {
    styledComponents: true,
  }
}

module.exports = nextConfig
