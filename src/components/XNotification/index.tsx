import React, { FC, ReactNode } from 'react';
import { CloseButton, Flex, Icon, Text, ToastId } from '@chakra-ui/react';

import { CheckCircle, ExclamationCircle, XCircle } from '@/components/icons/regular';
import { isType } from '@/utils';

export type NotificationType = 'success' | 'error' | 'warning';

export interface NotificationProps {
  title?: ReactNode;
  description?(id: ToastId): ReactNode;
  isClosable?: boolean;
  duration?: number;
  status: NotificationType;
  onClose: () => void;
  id: ToastId;
}

const createStatusIcon = (status: NotificationType) => {
  switch (status) {
    case 'warning':
      return ExclamationCircle;
    case 'error':
      return XCircle;
    default:
      return CheckCircle;
  }
};
const createStatusColor = (status: NotificationType) => {
  switch (status) {
    case 'warning':
      return 'orange.400';
    case 'error':
      return 'red.400';
    default:
      return 'green.400';
  }
};

const XNotification: FC<NotificationProps> = ({ title, description, status, onClose, id }) => {
  const createDescEle = () => {
    if (!description) {
      return null;
    }
    if (isType(description) === 'string' || isType(description) === 'number') {
      return (
        <Text mt={title && 1} fontSize='sm' lineHeight='20px' color='whiteAlpha.800'>
          {description}
        </Text>
      );
    }

    if (isType(description) === 'function') {
      return description(id);
    }

    return description;
  };
  return (
    <Flex
      as='div'
      alignItems='flex-center'
      bg='#1a1f2f'
      p={4}
      pr='42px'
      position='relative'
      boxShadow='0px 4px 10px rgba(0, 0, 0, 0.25)'
    >
      <Flex alignSelf='flex-start' alignItems='center' mr={2.5} h={5}>
        <Icon
          as={createStatusIcon(status)}
          width='18px'
          h='18px'
          color={createStatusColor(status)}
        />
      </Flex>
      <Flex flex={1} flexDirection='column'>
        {title && (
          <Text fontSize='md' lineHeight='20px' color='white'>
            {title}
          </Text>
        )}
        {createDescEle()}
      </Flex>
      <CloseButton
        alignSelf='flex-start'
        right={2.5}
        top={2.5}
        color='gray.400'
        onClick={() => onClose()}
        _focus={{
          boxShadow: 'unset',
        }}
        position='absolute'
      />
    </Flex>
  );
};

export default XNotification;
