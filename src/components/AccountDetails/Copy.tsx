import { Button, HStack, Text, useClipboard } from '@chakra-ui/react';
import { BiCopy } from 'react-icons/bi';
import { FaRegCheckCircle } from 'react-icons/fa';

interface ICopyHelperProps {
  toCopy: string;
}

const CopyHelper = ({ toCopy }: ICopyHelperProps) => {
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
          <BiCopy size='16' />
          <Text lineHeight='4'>Copy Address</Text>
        </Button>
      ) : (
        <Button as={HStack} spacing={1} variant='link' colorScheme='gray' size='sm'>
          <FaRegCheckCircle size='16' />
          <Text lineHeight='4'>Copied</Text>
        </Button>
      )}
    </>
  );
};

export default CopyHelper;
