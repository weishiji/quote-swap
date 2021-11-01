import { ReactNode } from 'react';
import Image, { ImageProps } from 'next/image';
import { Button, Box, Flex, Text, HStack } from '@chakra-ui/react';
import ExternalLink from '../ExternalLink';
import styled from '@emotion/styled';

const OptionCard = styled(Flex)``;
const GreenCircle = styled(Box)`
  width: 8px;
  height: 8px;
  border-radius: 8px;
`;

interface IOptionProps {
  link?: string;
  clickable?: boolean;
  onClick?: () => void;
  color: string;
  header: ReactNode;
  subHeader: ReactNode;
  icon: ImageProps;
  active?: boolean;
  id: string;
}

const Option = ({
  link = null,
  clickable = true,
  onClick = null,
  color,
  header,
  subHeader = null,
  icon,
  active = false,
  id,
}: IOptionProps) => {
  const content = (
    <OptionCard
      as={Button}
      id={id}
      justifyContent='space-between'
      alignItems='center'
      borderRadius='md'
      width='full'
      size='lg'
      variant='outline'
      colorScheme={clickable && !active ? 'blue' : 'gray'}
      onClick={onClick}
    >
      <HStack spacing={2} as={Flex} fontSize='md'>
        {active && <GreenCircle bgColor='green.500' />}
        {header && <Text color={color}>{header}</Text>}
      </HStack>
      <Image {...icon} alt='Icon' width={24} height={24} />
    </OptionCard>
  );
  if (link) {
    return <ExternalLink href={link}>{content}</ExternalLink>;
  }
  return content;
};

export default Option;
