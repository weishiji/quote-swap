import type { SystemStyleFunction } from '@chakra-ui/theme-tools';
import { cssVar, mode } from '@chakra-ui/theme-tools';

const $size = cssVar('close-button-size');

const baseStyle: SystemStyleFunction = (props) => {
  const hoverBg = mode('blackAlpha.100', 'whiteAlpha.500')(props);
  const activeBg = mode('blackAlpha.200', 'whiteAlpha.200')(props);

  return {
    w: [$size.reference],
    h: [$size.reference],
    borderRadius: 'sm',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    _hover: { bg: hoverBg },
    _active: { bg: activeBg },
    _focus: {
      boxShadow: 'none',
    },
  };
};

const sizes = {
  lg: {
    [$size.variable]: '40px',
    fontSize: '16px',
  },
  md: {
    [$size.variable]: '32px',
    fontSize: '14px',
  },
  sm: {
    [$size.variable]: '24px',
    fontSize: '12px',
  },
};

const defaultProps = {
  size: 'sm',
};

export default {
  baseStyle,
  sizes,
  defaultProps,
};
