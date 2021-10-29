import { FC } from 'react';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import getLibrary from '@/utils/getLibrary';
import { NetworkContextName } from '@/constants/misc';
import Web3ReactManager from './Manager';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const Web3Provider: FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>{children}</Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
};

export default Web3Provider;
