import { ReactNode } from 'react';
import Image from 'next/image';
import {
  Button,
  Box,
  Flex,
  Text,
  HStack,
  useColorModeValue,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
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
  icon: string;
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
  const { colorMode } = useColorMode();
  const hoverBgColor = useColorModeValue('blackAlpha.500', 'gray.500');
  const clickableBgColor = useColorModeValue('blackAlpha.400', 'gray.400');
  const textColor = useColorModeValue('black', 'white');
  const content = (
    <OptionCard
      as={Button}
      id={id}
      justifyContent='space-between'
      alignItems='center'
      borderRadius='md'
      width='full'
      size='lg'
      minHeight='48px'
      height='auto'
      lineHeight='1'
      py={4}
      colorScheme={colorMode === 'dark' ? 'gray' : 'blackAlpha'}
      onClick={onClick}
      cursor={clickable && !active ? 'pointer' : 'default'}
      _hover={{
        bgColor: clickable && !active ? clickableBgColor : hoverBgColor,
      }}
    >
      <VStack spacing={2.5} alignItems='flex-start'>
        <HStack spacing={2} as={Flex} fontSize='md'>
          {active && <GreenCircle bgColor='green.500' />}
          {header && <Text color={color === 'blue' ? 'blue.500' : textColor}>{header}</Text>}
        </HStack>
        {subHeader && (
          <Text fontSize='xs' color={color === 'blue' ? 'blue.500' : textColor}>
            {subHeader}
          </Text>
        )}
      </VStack>

      <Image src={icon} alt='Icon' width={24} height={24} />
    </OptionCard>
  );
  if (link) {
    return (
      <ExternalLink w='full' href={link}>
        {content}
      </ExternalLink>
    );
  }
  return content;
};

export default Option;
