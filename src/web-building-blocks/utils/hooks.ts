import React from 'react';

export const useTranslation = () => ({
  t: (text: string) => text,
});

/**
 * Debounce a function
 * @returns run - trigger Debounced function
 * @returns isWaiting - Boolean indicating if the function is currently debouncing
 * @example
 * const { run , isWaiting } = useDebounce((value: string) => console.log(value), 500);
 * run('Hello World');
 * // 'Hello World' will be logged after 500ms
 */
export const useDebounce = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
  const callbackRef = React.useRef(callback);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isWaiting, setIsWaiting] = React.useState(false);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debounce = (func: T, delayMs: number, ...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsWaiting(true);

    timerRef.current = setTimeout(() => {
      func(...args);
      setIsWaiting(false); // Timer finished, set isLoading to false
    }, delayMs);
  };

  const debouncedFunction = React.useMemo(
    () =>
      (...args: Parameters<T>) =>
        debounce(callbackRef.current, delay, ...args),
    [delay],
  );

  return { run: debouncedFunction, isWaiting };
};

const isMatching = (query: string) => {
  return window.matchMedia(query).matches;
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(isMatching(query));

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export const useResponsive = () => {
  const isMobile = useMediaQuery('(max-width: 430px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return { isMobile, isTablet, isDesktop };
};

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const breakpointValue = breakpoints[breakpointKey as keyof typeof breakpoints];
  const bool = useMediaQuery(`(max-width: ${breakpointValue})`);
  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  type KeyAbove = `isAbove${Capitalize<K>}`;
  type KeyBelow = `isBelow${Capitalize<K>}`;

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, '')),
    [`isAbove${capitalizedKey}`]: !bool,
    [`isBelow${capitalizedKey}`]: bool,
  } as Record<K, number> & Record<KeyAbove | KeyBelow, boolean>;
}
