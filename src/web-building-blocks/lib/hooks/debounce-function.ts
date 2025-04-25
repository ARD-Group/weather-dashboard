export const useDebounceFunction = <T>(op: (...args: T[]) => void, interval: number) => {
  let lastTimeoutId: NodeJS.Timeout;
  const debounced = (...args: T[]) => {
    clearTimeout(lastTimeoutId);
    lastTimeoutId = setTimeout(() => op(...args), interval);
  };

  return debounced;
};
