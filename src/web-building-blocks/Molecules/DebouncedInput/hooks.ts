import { useState, useEffect } from 'react';

export const useDebouncing = <T>(value: T, delay: number): { debouncedValue: T; isLoading: boolean } => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, delay);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue, isLoading };
};
