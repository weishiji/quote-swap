import getConfig from 'next/config';

const {
  publicRuntimeConfig: { INFURA_KEY },
} = getConfig();

export { INFURA_KEY };
