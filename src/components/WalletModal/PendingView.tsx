import { AbstractConnector } from '@web3-react/abstract-connector';
import { Box, Button, HStack, useColorModeValue, VStack, Text, Spinner } from '@chakra-ui/react';
import { injected } from '@/connectors';
import { SUPPORTED_WALLETS } from '@/constants/wallet';
import Option from './Option';

interface IPendingViewProps {
  connector?: AbstractConnector;
  error?: boolean;
  setPendingError: (error: boolean) => void;
  tryActivation: (connector: AbstractConnector) => void;
}

const PendingView = ({
  connector,
  error = false,
  setPendingError,
  tryActivation,
}: IPendingViewProps) => {
  const borderColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500');
  const isMetamask = window?.ethereum?.isMetaMask;

  return (
    <VStack spacing={5} alignItems='flex-start'>
      <Box
        w='full'
        borderRadius='md'
        borderColor={error ? 'red.500' : borderColor}
        borderWidth='1px'
        borderStyle='solid'
        p={4}
      >
        {error ? (
          <HStack spacing={2.5}>
            <Text color='red.500' fontSize='md'>
              Error connecting
            </Text>
            <Button
              onClick={() => {
                setPendingError(false);
                connector && tryActivation(connector);
              }}
              colorScheme='blue'
              borderRadius='3xl'
              size='xs'
            >
              Try Again
            </Button>
          </HStack>
        ) : (
          <HStack spacing={2.5}>
            <Spinner color='blue' size='sm' />
            <Text fontSize='md'>Initializing...</Text>
          </HStack>
        )}
      </Box>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key];
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null;
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null;
            }
          }
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              clickable={false}
              color={option.color}
              header={option.name}
              subHeader={option.description}
              icon={option.iconURL}
            />
          );
        }
        return null;
      })}
    </VStack>
  );
};

export default PendingView;
