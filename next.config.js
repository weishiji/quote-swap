// @ts-nocheck
/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');
module.exports = nextTranslate({
  webpack5: false,
  reactStrictMode: false,
  publicRuntimeConfig: {
    INFURA_KEY: process.env.INFURA_KEY,
  },
});
