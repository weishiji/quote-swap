import { useWeb3React } from '@web3-react/core';

import { Button, Box, Container, Flex, HStack } from '@chakra-ui/react';

import Logo from '@/components/Svg/Logo';
import Web3Status from '@/components/Web3Status';

import useENSName from '@/hooks/useENSName';
import { NetworkContextName } from '@/constants/misc';
import WalletModal from '@/components/WalletModal';
import { useWalletModalToggle } from '@/hooks/application';

const Header = () => {
  const { active, account } = useWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);
  const toggleWalletModal = useWalletModalToggle();

  const { ENSName } = useENSName(account ?? undefined);
  console.log({ ENSName });
  return (
    <>
      <Box as='header' py={4}>
        <Container as={Flex} minW='full' alignItems='center'>
          <Logo height={6} width='auto' />
          <HStack spacing={2} flex={1} justifyContent='flex-end'>
            <Box>123</Box>
            <Web3Status />
            <Button onClick={toggleWalletModal}>Connect Wallet</Button>
          </HStack>
        </Container>
      </Box>
      {(contextNetwork.active || active) && <WalletModal />}
    </>
  );
};

export default Header;
