import { ThemeDirection } from '@chakra-ui/react';
import components from './components';
import foundations from './foundations';
import styles from './styles';

const direction: ThemeDirection = 'ltr';

const theme = {
  direction,
  ...foundations,
  components,
  styles,
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
    cssVarPrefix: 'chakra',
  },
};

export default theme;
