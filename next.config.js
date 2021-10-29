// @ts-nocheck
/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');
module.exports = nextTranslate({
  reactStrictMode: false,
  publicRuntimeConfig: {
    GOOGLE_RECAPTCHA_SITEKEY: process.env.GOOGLE_RECAPTCHA_SITEKEY,
    BASE_SERVER_URL: process.env.BASE_SERVER_URL,
  },
});
