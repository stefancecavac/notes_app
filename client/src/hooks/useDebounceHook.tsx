import { useEffect, useState } from "react";

export const useDebounceHook = (value: string, timeout: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debouncing, setDebouncing] = useState(false);

  useEffect(() => {
    setDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setDebouncing(false);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, value]);

  return { debouncedValue, debouncing };
};
