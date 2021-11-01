import getConfig from 'next/config';

const {
  publicRuntimeConfig: { INFURA_KEY, PORTIS_ID, FORTMATIC_KEY, GOOGLE_ANALYTICS_ID, FIREBASE_KEY },
} = getConfig();

export { INFURA_KEY, PORTIS_ID, FORTMATIC_KEY, GOOGLE_ANALYTICS_ID, FIREBASE_KEY };
