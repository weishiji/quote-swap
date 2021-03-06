import { extendTheme } from '@chakra-ui/react';
import components from './components';
import foundations from './foundations';
import styles from './styles';
import type { ThemeConfig, ThemeDirection } from './theme.types';

const direction: ThemeDirection = 'ltr';

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'chakra',
};

export const theme = extendTheme({
  direction,
  ...foundations,
  components,
  styles,
  config,
});

export type Theme = typeof theme;

/**
 * @deprecated
 * Duplicate theme type. Please use `Theme`
 */
export type DefaultChakraTheme = Theme;

export * from './theme.types';
export * from './utils';

export default theme;
