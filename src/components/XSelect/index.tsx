import React, { cloneElement, forwardRef, FC, ReactNode, useRef, useEffect } from 'react';
import ReactSelect, { components as selectComponents } from 'react-select';
import PerfectScrollbar from 'perfect-scrollbar';

import {
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Divider,
  CloseButton,
  Center,
  Box,
  Portal,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  useTheme,
  useColorModeValue,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

import XScrollWrapper from '@/components/XScrollWrapper';

const chakraStyles = {
  input: (provided) => ({
    ...provided,
    color: 'inherit',
    lineHeight: 1,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'rgb(179, 186, 200)',
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: 'none',
  }),
  valueContainer: (provided, { selectProps: { size } }) => {
    const px = {
      sm: '0.75rem',
      md: '1rem',
      lg: '1rem',
    };

    return {
      ...provided,
      padding: `0.125rem ${px[size]}`,
    };
  },
  loadingMessage: (provided, { selectProps: { size } }) => {
    const fontSizes = {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
    };

    const paddings = {
      sm: '6px 9px',
      md: '8px 12px',
      lg: '10px 15px',
    };

    return {
      ...provided,
      fontSize: fontSizes[size],
      padding: paddings[size],
    };
  },
  // Add the chakra style for when a TagCloseButton has focus
  multiValueRemove: (provided, { isFocused, selectProps: { multiValueRemoveFocusStyle } }) =>
    isFocused ? multiValueRemoveFocusStyle : {},
  menuList: () => ({}),
  // control: () => ({}),
  option: () => ({}),
  multiValue: () => ({}),
  multiValueLabel: () => ({}),
  group: () => ({}),
};

export interface IOption {
  value: string | number;
  label: ReactNode;
}

interface IChakraReactSelect {
  options: IOption[];
  inputId: string;
  instanceId: string;
  name: string;
  onChange: (option: IOption) => void;
  blurInputOnSelect?: boolean;
  placeholder?: string;
  closeMenuOnSelect?: boolean;
  children?: any;
  styles?: Record<string, unknown>;
  components?: Record<string, unknown>;
  colorScheme?: string;
  size?: string;
  theme?: (baseTheme: any) => any;
  value?: IOption | string;
  isLoading?: boolean;
  isSearchable?: boolean;
}

const Menu: FC<any> = ({ children, ...props }) => {
  const menuStyles = useMultiStyleConfig('Menu', {});
  return (
    <selectComponents.Menu {...props}>
      <StylesProvider value={menuStyles}>{children}</StylesProvider>
    </selectComponents.Menu>
  );
};

const chakraComponents = {
  // Control components
  Control: (controlProps) => {
    const {
      children,
      innerRef,
      innerProps,
      isDisabled,
      isFocused,
      getStyles,
      selectProps: { size },
    } = controlProps;
    const defaultStyles = getStyles('control', controlProps);
    delete defaultStyles.borderColor;
    const inputStyles = useMultiStyleConfig('Input', { size });
    const heights = {
      sm: 8,
      md: 10,
      lg: 12,
    };

    return (
      <StylesProvider value={inputStyles}>
        <Flex
          ref={innerRef}
          sx={{
            ...defaultStyles,
            ...inputStyles.field,
            p: 0,
            overflow: 'hidden',
            h: 'auto',
            minH: heights[size],
          }}
          {...innerProps}
          {...(isFocused && { 'data-focus': true })}
          {...(isDisabled && { disabled: true })}
        >
          {children}
        </Flex>
      </StylesProvider>
    );
  },
  MultiValueContainer: ({ children, innerRef, innerProps, data, selectProps }) => (
    <Tag
      ref={innerRef}
      {...innerProps}
      m='0.125rem'
      variant={data.isFixed ? 'solid' : 'subtle'}
      colorScheme={data.colorScheme || selectProps.colorScheme}
      size={selectProps.size}
    >
      {children}
    </Tag>
  ),
  MultiValueLabel: ({ children, innerRef, innerProps }) => (
    <TagLabel ref={innerRef} {...innerProps}>
      {children}
    </TagLabel>
  ),
  MultiValueRemove: ({ children, innerRef, innerProps, data: { isFixed } }) => {
    if (isFixed) {
      return null;
    }

    return (
      <TagCloseButton ref={innerRef} {...innerProps} tabIndex={-1}>
        {children}
      </TagCloseButton>
    );
  },
  IndicatorSeparator: ({ innerProps }) => (
    <Divider {...innerProps} orientation='vertical' opacity='1' />
  ),
  ClearIndicator: ({ innerProps, selectProps: { size } }) => (
    <CloseButton {...innerProps} size={size} mx={2} tabIndex={-1} />
  ),
  DropdownIndicator: ({ innerProps, selectProps: { size, menuIsOpen } }) => {
    const { addon } = useStyles();

    const iconSizes = {
      sm: 4,
      md: 5,
      lg: 6,
    };
    const iconSize = iconSizes[size];

    return (
      <Center
        {...innerProps}
        sx={{
          ...addon,
          h: '100%',
          borderRadius: 0,
          borderWidth: 0,
          cursor: 'pointer',
          bg: 'transparent',
        }}
      >
        <ChevronDownIcon
          w={iconSize}
          h={iconSize}
          transition='transform .3s linear'
          transform={`rotate(${menuIsOpen ? '180deg' : '0deg'})`}
        />
      </Center>
    );
  },
  // Menu components
  MenuPortal: ({ children }) => <Portal>{children}</Portal>,
  Menu,
  MenuList: ({ innerRef, children, maxHeight, selectProps: { inputValue } }) => {
    const scrollRef = useRef<PerfectScrollbar>();
    const { list } = useStyles();

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.element.scrollTop = 0;
        scrollRef.current.update();
      }
    }, [scrollRef, inputValue]);

    useEffect(() => {
      return () => {
        scrollRef.current = undefined;
      };
    }, []);

    return (
      <XScrollWrapper
        isScroll
        sx={{
          ...list,
          maxH: `${maxHeight}px`,
          border: 0,
        }}
        ref={innerRef}
        scrollRef={(scrollInstance) => {
          scrollRef.current = scrollInstance;
        }}
      >
        {children}
      </XScrollWrapper>
    );
  },
  GroupHeading: ({ innerProps, children }) => {
    const { groupTitle } = useStyles();
    return (
      <Box sx={groupTitle} {...innerProps}>
        {children}
      </Box>
    );
  },
  Option: ({ innerRef, innerProps, children, isFocused, isDisabled, selectProps: { size } }) => {
    const { item }: Record<string, any> = useStyles();
    return (
      <Box
        role='button'
        sx={{
          ...item,
          w: '100%',
          textAlign: 'left',
          bg: isFocused ? item._focus.bg : 'transparent',
          fontSize: size,
          ...(isDisabled && item._disabled),
        }}
        ref={innerRef}
        {...innerProps}
        {...(isDisabled && { disabled: true })}
      >
        {children}
      </Box>
    );
  },
};

const ChakraReactSelect: FC<IChakraReactSelect> = ({
  children,
  styles = {},
  components = {},
  theme = () => ({}),
  size = 'md',
  colorScheme = 'gray',
  ...props
}) => {
  const chakraTheme = useTheme();

  // The chakra theme styles for TagCloseButton when focused
  const closeButtonFocus = chakraTheme.components.Tag.baseStyle.closeButton._focus;
  const multiValueRemoveFocusStyle = {
    background: closeButtonFocus.bg,
    boxShadow: chakraTheme.shadows[closeButtonFocus.boxShadow],
  };

  // The chakra UI global placeholder color
  // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts#L13
  const placeholderColor = useColorModeValue(
    chakraTheme.colors.gray[400],
    chakraTheme.colors.whiteAlpha[400]
  );

  // Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
  let realSize = size;
  const sizeOptions = ['sm', 'md', 'lg'];
  if (!sizeOptions.includes(size)) {
    realSize = 'md';
  }

  const select = cloneElement(children, {
    components: {
      ...chakraComponents,
      ...components,
    },
    styles: {
      ...chakraStyles,
      ...styles,
    },
    theme: (baseTheme) => {
      const propTheme = theme(baseTheme);
      return {
        ...baseTheme,
        ...propTheme,
        colors: {
          ...baseTheme.colors,
          neutral50: placeholderColor, // placeholder text color
          neutral40: placeholderColor, // noOptionsMessage color
          ...propTheme.colors,
        },
        spacing: {
          ...baseTheme.spacing,
          ...propTheme.spacing,
        },
      };
    },
    colorScheme,
    size: realSize,
    multiValueRemoveFocusStyle,
    ...props,
  });
  return select;
};

const XSelect = forwardRef<any, IChakraReactSelect>((props, ref) => (
  <ChakraReactSelect {...props}>
    <ReactSelect ref={ref} />
  </ChakraReactSelect>
));

XSelect.displayName = 'XSelect';

export default XSelect;
