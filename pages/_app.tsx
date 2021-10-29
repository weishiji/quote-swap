import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/provider';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';

import ReactGA from 'react-ga';
import theme from '@/theme';

import '@/assets/styles/carbon.scss';

Router.events.on('routeChangeComplete', () => {
  ReactGA.pageview(global.location.href);
});

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation('common');

  useEffect(() => {
    const gaId = global?.location?.host?.includes('cyberx.com')
      ? 'UA-194067374-1'
      : 'UA-194067374-2';
    ReactGA.initialize(gaId);
    ReactGA.pageview(global.location.href);
    const ScrollReveal = require('scrollreveal').default;
    const commonConfig = {
      opacity: 0,
      reset: false,
    };
    const animationDom = document.querySelectorAll('.animation');
    Array.from(animationDom).forEach((_, index) => {
      ScrollReveal().reveal(animationDom[index], {
        ...commonConfig,
        delay: index * 100,
        duration: 1000,
        origin: 'bottom',
        distance: '14px',
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      });
    });
  }, []);

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='user-scalable=no,width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0'
        />
        <link rel='shortcut icon' type='image/x-icon' href='/static/images/favicon.ico' />
      </Head>
      <NextSeo
        title={t('common:meta.title')}
        description={t('common:meta.description')}
        canonical='https://www.cyberx.com'
        openGraph={{
          title: t('common:meta.og_title'),
          type: 'website',
          url: t('common:meta.og_url'),
          images: [
            {
              url: t('common:meta.og_image'),
              alt: t('common:meta.title'),
            },
          ],
          description: t('common:meta.og_description'),
        }}
        twitter={{
          handle: t('common:meta.twitter_creator'),
          site: t('common:meta.twitter_site'),
          cardType: t('common:meta.twitter_image'),
        }}
      />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
