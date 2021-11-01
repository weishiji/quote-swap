import { mode, Styles, transparentize } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: (props) => ({
    'body': {
      'fontSize': 'md',
      'fontFamily': 'body',
      'color': mode('#000000', '#ffffff')(props),
      'bg': mode('white', '#101721')(props),
      'transitionProperty': 'background-color',
      'transitionDuration': 'normal',
      'lineHeight': 'base',
      'msOverflowStyle': 'none',
      'scrollbarWidth': 'none',
      'fontFeatureSettings': '"zero" on, "salt" on, "kern" off',
      'fontWeight': 'normal',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '*::placeholder': {
      color: mode('blackAlpha.500', 'whiteAlpha.500')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('blackAlpha.300', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
    // 通知
    '.notification': {
      '&-container': {
        backgroundColor: mode('white', 'gray.700')(props),
      },
      '&-description': {
        color: mode('blackAlpha.600', 'whiteAlpha.600')(props),
      },
      '&-closeButton': {
        color: mode('#6d7387 !important', '#6d7387 !important')(props),
      },
    },
    '#__next': {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    'main': {
      flex: 1,
    },
    '.sell, .fall': {
      color: 'red.500',
    },
    '.buy, .rise': {
      color: 'green.500',
    },
    '.orderBook, .trades': {
      '&-row': {
        'fontFamily': 'mono',
        'cursor': 'pointer',
        'position': 'relative',
        'px': 4,
        'py': 0.5,
        'overflow': 'hidden',
        '&:hover': {
          background: mode('blackAlpha.50', 'whiteAlpha.50')(props),
        },
      },
      '&-content': {
        position: 'relative',
        zIndex: 2,
      },
      '&-percent': {
        'position': 'absolute',
        'left': 0,
        'top': 0,
        'bottom': 0,
        'width': 'full',
        'zIndex': 1,
        '&-sell': {
          background: transparentize('red.500', 0.2)(props.theme),
        },
        '&-buy': {
          background: transparentize('green.500', 0.2)(props.theme),
        },
      },
    },
  }),
};

export default styles;
