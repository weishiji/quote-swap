import type { SystemStyleObject } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleObject = {
  fontSize: 'sm',
  lineHeight: 5,
  marginEnd: 3,
  mb: 1.5,
  fontWeight: 'medium',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  opacity: 1,
  _disabled: {
    opacity: 0.4,
  },
};

export default {
  baseStyle,
};
