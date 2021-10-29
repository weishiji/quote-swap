import { mode, transparentize } from '@chakra-ui/theme-tools';
import type {
  SystemStyleObject,
  SystemStyleFunction,
} from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleObject = {
  lineHeight: '1.2',
  borderRadius: 'sm',
  fontWeight: 'semibold',
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

  const color = mode(`${c}.500`, `${c}.500`)(props);
  const darkHoverBg = transparentize(`${c}.400`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.600`, 0.24)(theme);

  return {
    color,
    bg: 'transparent',
    _hover: {
      bg: mode(darkHoverBg, darkHoverBg)(props),
    },
    _active: {
      bg: mode(darkHoverBg, darkActiveBg)(props),
    },
  };
};

const variantOutline: SystemStyleFunction = (props) => {
  return {
    border: '1px solid',
    borderColor: 'currentColor',
    ...variantGhost(props),
  };
};

type AccessibleColor = {
  bg?: string
  color?: string
  hoverBg?: string
  activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: 'yellow.400',
    color: 'black',
    hoverBg: 'yellow.500',
    activeBg: 'yellow.600',
  },
  cyan: {
    bg: 'cyan.400',
    color: 'black',
    hoverBg: 'cyan.500',
    activeBg: 'cyan.600',
  },
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  const {
    bg = `${c}.500`,
    color = 'white',
    hoverBg = `${c}.400`,
    activeBg = `${c}.600`,
  } = accessibleColorMap[c] ?? {};

  const background = mode(bg, bg)(props);

  return {
    bg: background,
    color: mode(color, color)(props),
    _hover: {
      bg: mode(hoverBg, hoverBg)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, activeBg)(props) },
  };
};

const variantLink: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: 'auto',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
    color: mode(`${c}.500`, `${c}.500`)(props),
    _hover: {
      textDecoration: 'none',
      _disabled: {
        textDecoration: 'none',
      },
    },
    _active: {
      color: mode(`${c}.600`, `${c}.600`)(props),
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
    fontSize: 'lg',
    px: 6,
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: 'md',
    px: 4,
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: 'sm',
    px: 3,
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: 'xs',
    px: 2,
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
