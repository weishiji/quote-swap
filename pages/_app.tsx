import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/provider';
import theme from '@/theme';
import dynamic from 'next/dynamic';

const Web3ReactManager = dynamic(() => import('../src/components/Web3ReactManager'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='user-scalable=no,width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0'
        />
        <link rel='shortcut icon' type='image/x-icon' href='/static/images/favicon.ico' />
      </Head>
      <ChakraProvider theme={theme}>
        <Web3ReactManager>
          <Component {...pageProps}></Component>
        </Web3ReactManager>
      </ChakraProvider>
    </>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

export default MyApp;
