import { ReactNode } from 'react';
import { Flex, Box, AlertStatus, CloseButton, VStack } from '@chakra-ui/react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
interface INotificationProps {
  description?: ReactNode;
  isClosable: boolean;
  onClose(): void;
  status: AlertStatus;
  title?: ReactNode;
}

const NotificationIcon = ({ status }: { status: AlertStatus }) => {
  const STATUSES = {
    info: { icon: FaInfoCircle, colorScheme: 'blue' },
    warning: { icon: FaExclamationCircle, colorScheme: 'orange' },
    success: { icon: FaCheckCircle, colorScheme: 'green' },
    error: { icon: FaTimesCircle, colorScheme: 'red' },
  };
  const { icon: BaseIcon, colorScheme } = STATUSES[status];
  return (
    <Box flexShrink={0} mr={3} py='3px' color={`${colorScheme}.500`}>
      <BaseIcon size='18px' />
    </Box>
  );
};

const Notification = ({ description, isClosable, onClose, status, title }: INotificationProps) => {
  return (
    <Flex
      borderRadius='sm'
      p={4}
      boxShadow='0px 4px 10px rgba(0, 0, 0, 0.25)'
      alignItems='flex-start'
      lineHeight='none'
      animation='none'
      className='notification-container'
      width={{ base: '100%', md: '360px' }}
    >
      <NotificationIcon status={status} />
      <VStack spacing={1} flex={1} py={0.5} alignItems='flex-start'>
        {title && (
          <Box fontSize='sm' lineHeight='5' fontWeight='medium'>
            {title}
          </Box>
        )}
        {description && (
          <Box fontSize='xs' lineHeight='4' className='notification-description'>
            {description}
          </Box>
        )}
      </VStack>
      {isClosable && (
        <CloseButton onClick={onClose} ml={2.5} className='notification-closeButton' />
      )}
    </Flex>
  );
};

export default Notification;
