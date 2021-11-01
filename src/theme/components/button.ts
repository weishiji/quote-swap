import { mode, transparentize } from '@chakra-ui/theme-tools';
import type { SystemStyleObject, SystemStyleFunction } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleObject = {
  borderRadius: 'sm',
  fontWeight: 'normal',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  _focus: {
    boxShadow: 'none',
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  _hover: {
    _disabled: {
      bg: 'initial',
    },
  },
};

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  const hoverBg = transparentize(`${c}.500`, 0.12)(theme);
  const activeBg = transparentize(`${c}.500`, 0.24)(theme);

  return {
    color: mode(`${c}.500`, 'white')(props),
    bg: 'transparent',
    _hover: {
      bg: hoverBg,
    },
    _active: {
      bg: activeBg,
    },
  };
};

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;
  return {
    border: '1px solid',
    borderColor: transparentize(`${c}.500`, 0.12)(theme),
    ...variantGhost(props),
  };
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.500`,
    color: 'white',
    _hover: {
      bg: `${c}.400`,
      _disabled: {
        bg: `${c}.500`,
      },
    },
    _active: { bg: `${c}.600` },
  };
};

const variantLink: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: 'auto',
    lineHeight: 'normal',
    verticalAlign: 'middle',
    color: `${c}.500`,
    _hover: {
      color: `${c}.400`,
      textDecoration: 'none',
      _disabled: {
        textDecoration: 'none',
      },
    },
    _active: {
      color: `${c}.600`,
    },
  };
};

const variantUnstyled: SystemStyleObject = {
  bg: 'none',
  color: 'inherit',
  display: 'inline',
  lineHeight: 'inherit',
  m: 0,
  p: 0,
};

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
};

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: '2xl',
    px: 6,
    lineHeight: 8,
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: 'md',
    px: 4,
    lineHeight: 6,
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: 'sm',
    px: 3,
    lineHeight: 5,
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: 'xs',
    px: 2,
    lineHeight: 4,
  },
};

const defaultProps = {
  variant: 'solid',
  size: 'sm',
  colorScheme: 'blue',
};

export default {
  baseStyle,
  variants,
  sizes,
  defaultProps,
};
