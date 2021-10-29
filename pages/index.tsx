/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { LAOZI, UNISWAP } from '@/utils/abi';

import { Button } from '@chakra-ui/button';

const HomePage = () => {
  const web3Modal = useRef<any>();
  const provider = useRef<any>();
  let LaoZiContract = undefined;
  let UniSwwapContract = undefined;
  const [web3Instance, setWeb3Instance] = useState<Web3>();

  useEffect(() => {
    const initWeb3Modal = async () => {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            // Mikko's test key - don't copy as your mileage may vary
            infuraId: '2b01711c393c4635915aeb814898fee1',
          },
        },
      };
      web3Modal.current = new Web3Modal({
        network: 'goerli', // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });
      if (web3Modal.current.cachedProvider) {
        handleConnect();
      }
    };
    initWeb3Modal();
  }, []);

  const handleConnect = async () => {
    console.log('Opening a dialog', web3Modal);
    try {
      provider.current = await web3Modal.current.connect();
    } catch (e) {
      console.log('Could not get a wallet connection', e);
      return;
    }

    const web3 = new Web3(provider.current);

    setWeb3Instance(web3);
  };

  const initContract = () => {
    LaoZiContract = new web3Instance.eth.Contract(
      LAOZI,
      '0x72035Cdc5B39ae2686Db775FE0037A8B4f22C45f'
    );

    UniSwwapContract = new web3Instance.eth.Contract(
      UNISWAP,
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    );
    UniSwwapContract.methods
      .quote(web3Instance.utils.toWei(web3Instance.utils.toBN(1)), 1, 1)
      .call()
      .then((data) => {
        console.log(data, 'this is data');
      });

    console.log(UniSwwapContract.methods, 'this is UniSwwapContract');
    LaoZiContract.methods.name().call().then(console.log);
    LaoZiContract.methods
      .balanceOf('0xD5734D612B4E942Ee44aaA1c134d406613Bf87e7')
      .call()
      .then(console.log);
  };

  useEffect(() => {
    if (web3Instance) {
      initContract();
    }
  }, [web3Instance]);

  const handleApprove = () => {
    // contract.
    console.log(LaoZiContract);
    LaoZiContract.methods.approve(
      '0xD5734D612B4E942Ee44aaA1c134d406613Bf87e7',
      web3Instance.utils.toWei(web3Instance.utils.toBN(1), 'ether')
    );
  };

  return (
    <>
      <Button onClick={handleConnect}>Connect Wallet</Button>
      <Button onClick={handleApprove}>授权</Button>
    </>
  );
};

HomePage.getInitialProps = async () => {
  return {};
};

export default HomePage;
