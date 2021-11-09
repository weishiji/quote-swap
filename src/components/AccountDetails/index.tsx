import styled from '@emotion/styled';
import { Avatar, Button, Flex, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';

import CoinbaseWalletIcon from '@/assets/images/coinbaseWalletIcon.svg';
import FortmaticIcon from '@/assets/images/fortmaticIcon.png';
import PortisIcon from '@/assets/images/portisIcon.png';
import WalletConnectIcon from '@/assets/images/walletConnectIcon.svg';
import { fortmatic, injected, portis, walletconnect, walletlink } from '@/connectors';
import { SUPPORTED_WALLETS } from '@/constants/wallet';
import { useActiveWeb3React } from '@/hooks/web3';
import Identicon from '@/components/Identicon';
import { shortenAddress } from '@/utils';
import { ExplorerDataType, getExplorerLink } from '@/utils/getExplorerLink';
import { BiLinkExternal } from 'react-icons/bi';

import CopyHelper from './Copy';
import ExternalLink from '../ExternalLink';

const IconWrapper = styled(Avatar)`
  background-color: transparent;
  & > img {
    object-fit: contain;
  }
`;

interface IAccountDetailsProps {
  toggleWalletModal: () => void;
  pendingTransactions: string[];
  confirmedTransactions: string[];
  ENSName?: string;
  openOptions: () => void;
}

const AccountDetails = ({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
}: IAccountDetailsProps) => {
  const { chainId, account, connector } = useActiveWeb3React();

  const borderColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500');

  const formatConnectorName = () => {
    const { ethereum } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0];

    return name;
  };

  const getStatusIcon = () => {
    if (connector === injected) {
      return <IconWrapper icon={<Identicon />} size='xs' />;
    } else if (connector === walletconnect) {
      return <IconWrapper size='xs' src={WalletConnectIcon} name='WalletConnect logo' />;
    } else if (connector === walletlink) {
      return <IconWrapper size='xs' src={CoinbaseWalletIcon} name='Coinbase Wallet logo' />;
    } else if (connector === fortmatic) {
      return <IconWrapper size='xs' src={FortmaticIcon} name='Fortmatic logo' />;
    } else if (connector === portis) {
      return (
        <>
          <IconWrapper size='xs' src={PortisIcon} name='Portis logo' />
          <Button
            size='xs'
            borderRadius='full'
            onClick={() => {
              portis.portis.showPortis();
            }}
          >
            Show Portis
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <VStack
      alignItems='flex-start'
      borderRadius='md'
      borderStyle='solid'
      borderWidth='1px'
      borderColor={borderColor}
      p={4}
      spacing={2.5}
    >
      <Flex justifyContent='space-between' alignItems='center' w='full'>
        <Text fontSize='sm' color='gray.500'>
          Connected with {formatConnectorName()}
        </Text>
        <HStack spacing={2}>
          {connector !== injected && connector !== walletlink && (
            <Button
              size='xs'
              borderRadius='full'
              onClick={() => {
                (connector as any).close();
              }}
            >
              Disconnect
            </Button>
          )}
          <Button
            size='xs'
            borderRadius='full'
            onClick={() => {
              openOptions();
            }}
          >
            Change
          </Button>
        </HStack>
      </Flex>
      <HStack spacing={2}>
        {ENSName ? (
          <>
            {getStatusIcon()}
            <Text fontSize='xl' fontWeight='medium'>
              {ENSName}
            </Text>
          </>
        ) : (
          <>
            {getStatusIcon()}
            {account && (
              <Text fontSize='xl' fontWeight='medium'>
                {shortenAddress(account)}
              </Text>
            )}
          </>
        )}
      </HStack>
      <HStack>
        {account && <CopyHelper toCopy={account} />}
        {account && chainId && (
          <ExternalLink
            display='flex'
            alignItems='center'
            href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
            color='gray.500'
            _hover={{
              color: 'blue.500',
            }}
          >
            <BiLinkExternal size='16' />
            <Text as='span' ml={1} fontSize='sm' lineHeight='4'>
              View on Explorer
            </Text>
          </ExternalLink>
        )}
      </HStack>
    </VStack>
  );
};

export default AccountDetails;
