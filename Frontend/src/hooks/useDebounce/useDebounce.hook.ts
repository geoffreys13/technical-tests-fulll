import { useEffect, useState } from "react";

const DEBOUNCE_DELAY = 500;

function useDebounce(initialValue: string, delay?: number) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return {
    debouncedValue,
    setValue,
  };
}

export default useDebounce;
