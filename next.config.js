// @ts-nocheck
/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
const nextImages = require('next-images');
module.exports = withPlugins([nextTranslate, nextImages], {
  images: {
    disableStaticImages: true,
  },
  reactStrictMode: false,
  publicRuntimeConfig: {
    INFURA_KEY: process.env.INFURA_KEY,
    PORTIS_ID: process.env.PORTIS_ID,
    FORTMATIC_KEY: process.env.FORTMATIC_KEY,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    FIREBASE_KEY: process.env.FIREBASE_KEY,
  },
});
