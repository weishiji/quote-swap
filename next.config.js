// @ts-nocheck
/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
const withPreact = require('next-plugin-preact');
module.exports = withPlugins([withPreact, nextTranslate], {
  reactStrictMode: false,
  publicRuntimeConfig: {
    INFURA_KEY: process.env.INFURA_KEY,
  },
});
