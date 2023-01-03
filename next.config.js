/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false
  },
  i18n: {
    locales: ["en-GB", "pl-PL"],
    defaultLocale: "en-GB",
  },
}

module.exports = nextConfig
