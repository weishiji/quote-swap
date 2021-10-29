import getConfig from 'next/config';

const {
  publicRuntimeConfig: { GOOGLE_RECAPTCHA_SITEKEY, BASE_SERVER_URL },
} = getConfig();

export { GOOGLE_RECAPTCHA_SITEKEY, BASE_SERVER_URL };
