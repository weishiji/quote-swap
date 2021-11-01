// @ts-nocheck
/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
// const withPreact = require('next-plugin-preact');
module.exports = withPlugins([nextTranslate], {
  reactStrictMode: false,
  publicRuntimeConfig: {
    INFURA_KEY: process.env.INFURA_KEY,
    PORTIS_ID: process.env.PORTIS_ID,
    FORTMATIC_KEY: process.env.FORTMATIC_KEY,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    FIREBASE_KEY: process.env.FIREBASE_KEY,
  },
});
