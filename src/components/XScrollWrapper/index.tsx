import React, { useRef, forwardRef, useEffect } from 'react';
import { useMergeRefs, Box, BoxProps } from '@chakra-ui/react';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

interface IXScrollWrapperProps extends BoxProps, PerfectScrollbar.Options {
  isScroll?: boolean;
  scrollRef?: (ref: PerfectScrollbar) => void;
}

const XScrollWrapper = forwardRef<HTMLDivElement, IXScrollWrapperProps>(
  (
    {
      children,
      isScroll = false,
      suppressScrollX = true,
      suppressScrollY = false,
      wheelPropagation = false,
      scrollRef: customRef,
      ...restProps
    },
    ref
  ) => {
    const scrollRef = useRef();

    const refs = useMergeRefs(scrollRef, ref);

    const instance = useRef<PerfectScrollbar>();

    useEffect(() => {
      if (scrollRef.current && isScroll && !instance.current) {
        instance.current = new PerfectScrollbar(scrollRef.current, {
          suppressScrollX,
          suppressScrollY,
          wheelPropagation,
          useBothWheelAxes: false,
          wheelSpeed: 2,
        });

        if (customRef) {
          customRef(instance.current);
        }
      }
    }, [
      scrollRef,
      instance,
      customRef,
      isScroll,
      suppressScrollX,
      suppressScrollY,
      wheelPropagation,
    ]);
    return (
      <Box
        ref={refs}
        {...restProps}
        style={{ position: 'relative', borderRadius: '2px', ...restProps?.style }}
      >
        {children}
      </Box>
    );
  }
);

export default XScrollWrapper;
