import { mode, Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: (props) => ({
    'body': {
      fontSize: 'md',
      fontFamily: 'body',
      color: mode('black', 'white')(props),
      bg: mode('white', '#101721')(props),
      transitionProperty: 'background-color',
      transitionDuration: 'normal',
      lineHeight: 'base',
      webkitTapHighlightColor: 'transparent',
      fontFeatureSettings: '"zero" on, "salt" on, "kern" off',
    },
    '.news-detail p': {
      marginTop: 2.5,
    },
    '.news-detail h2': {
      fontWeight: 700,
      marginTop: 4,
      marginBottom: 4,
      fontSize: 'md',
      lineHeight: '24px',
    },
    '.news-detail p, .text': {
      fontSize: 'sm',
      lineHeight: '20px',
      color: mode('#b3bac8', '#b3bac8')(props),
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.500')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
    '.grecaptcha-badge': {
      display: 'none',
    },
    '.animation': {
      visibility: 'hidden',
    },
  }),
};

export default styles;
