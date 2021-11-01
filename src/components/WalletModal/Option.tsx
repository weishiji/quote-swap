import { ReactNode } from 'react';
import Image, { ImageProps } from 'next/image';
import styled from '@emotion/styled';
import { Button, Flex, Text } from '@chakra-ui/react';
import ExternalLink from '../ExternalLink';

interface IOptionProps {
  link?: string;
  clickable?: boolean;
  size?: number;
  onClick?: () => void;
  color: string;
  header: ReactNode;
  subHeader: ReactNode;
  icon: ImageProps;
  active?: boolean;
  id: string;
}

const Option = ({
  link,
  clickable,
  size,
  onClick,
  color,
  header,
  subHeader,
  icon,
  active,
  id,
}: IOptionProps) => {
  const content = (
    <Button
      as={Flex}
      justifyContent='space-between'
      alignItems='center'
      w='full'
      variant='outline'
      size='lg'
      colorScheme='gray'
      borderRadius='lg'
    >
      <Text>{header}</Text>
      <Image {...icon} alt='Icon' width={24} height={24} />
    </Button>
  );
  if (link) {
    return <ExternalLink href={link}>{content}</ExternalLink>;
  }
  return content;
};

export default Option;
