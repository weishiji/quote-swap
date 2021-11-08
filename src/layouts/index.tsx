import { FC } from 'react';

import Web3ReactManager from '@/components/Web3ReactManager';

import Header from './Header';

const DefaultLayout: FC = ({ children }) => {
  return (
    <Web3ReactManager>
      <Header />
      <main>{children}</main>
    </Web3ReactManager>
  );
};

export default DefaultLayout;
