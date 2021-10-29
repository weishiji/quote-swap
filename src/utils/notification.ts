import { createStandaloneToast } from '@chakra-ui/react';

import XNotification, { NotificationType, NotificationProps } from '@/components/XNotification';

const notification: {
  [key: string]: (data: Omit<NotificationProps, 'onClose' | 'id' | 'status'>) => string | number;
} = {};

const STATUS: NotificationType[] = ['success', 'error', 'warning'];

const customToast = createStandaloneToast();

STATUS.forEach((status: NotificationType) => {
  notification[status] = ({ title, description, isClosable, duration = 1000 * 3 }) =>
    customToast({
      position: 'top-right',
      variant: 'left-accent',
      render: ({ id, onClose }) =>
        XNotification({
          title,
          description,
          isClosable,
          onClose,
          status,
          id,
        }),
      duration,
    });
});

export default notification;
