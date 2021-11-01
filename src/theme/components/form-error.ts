import { formErrorAnatomy as parts } from '@chakra-ui/anatomy';

const baseStyleText = {
  color: 'red.500',
  mt: 2,
  fontSize: 'sm',
};

const baseStyleIcon = {
  marginEnd: '0.5em',
  color: 'red.500',
};

const baseStyle = {
  text: baseStyleText,
  icon: baseStyleIcon,
};

export default {
  parts: parts.keys,
  baseStyle,
};
