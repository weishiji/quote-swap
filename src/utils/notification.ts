import { createStandaloneToast, UseToastOptions, AlertStatus } from '@chakra-ui/react';

import Notification from '@/components/Notification';

import theme from '@/theme';

type TExclude = 'render' | 'variant' | 'status';

const notification: {
  [key: string]: (options: Omit<UseToastOptions, TExclude>) => string | number | undefined;
} = {};

const notificationStatus = ['info', 'warning', 'success', 'error'];

const toast = createStandaloneToast({ theme });

notificationStatus.forEach((value) => {
  notification[value] = ({
    title,
    description,
    duration = 1000 * 3,
    position = 'top-right',
    isClosable = false,
    ...rest
  }: Omit<UseToastOptions, TExclude>) => {
    return toast({
      duration,
      position,
      render: ({ onClose }) => {
        return Notification({
          onClose,
          title,
          status: value as AlertStatus,
          description,
          isClosable,
        });
      },
      ...rest,
    });
  };
});

export default notification;
