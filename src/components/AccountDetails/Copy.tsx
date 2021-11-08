import { FC } from 'react';
import { Button, HStack, Text, useClipboard } from '@chakra-ui/react';
import { FaRegCopy, FaRegCheckCircle } from 'react-icons/fa';

interface ICopyHelperProps {
  toCopy: string;
}

const CopyHelper: FC<ICopyHelperProps> = ({ toCopy, children }) => {
  const { hasCopied, onCopy } = useClipboard(toCopy);
  return (
    <>
      {!hasCopied ? (
        <Button
          as={HStack}
          spacing={1}
          onClick={onCopy}
          variant='link'
          colorScheme='gray'
          size='sm'
          cursor='pointer'
        >
          <FaRegCopy size='16' />
          <Text lineHeight='4'>Copy Address</Text>
        </Button>
      ) : (
        <Button as={HStack} spacing={1} variant='link' colorScheme='gray' size='sm'>
          <FaRegCheckCircle size='16' />
          <Text lineHeight='4'>Copied</Text>
        </Button>
      )}

      {children}
    </>
  );
};

export default CopyHelper;
