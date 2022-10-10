/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
});
const withSvgr = require('next-plugin-svgr');
const {withSentryConfig} = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-GB", "pl-PL", "fr-FR"],
    defaultLocale: "en-GB",
    domains: [
      {
        domain: "doggo.rocks",
        defaultLocale: "en-GB",
      },
    ],
  },
};

module.exports = withSentryConfig(withPWA(withSvgr(nextConfig)));
