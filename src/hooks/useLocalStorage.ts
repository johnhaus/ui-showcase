import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, removeItem } from '../utils/localStorage';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValueState] = useState<T>(() =>
    getItem<T>(key, initialValue)
  );

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        setValueState(getItem<T>(key, initialValue));
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValueState((prev) => {
        const resolvedValue =
          typeof newValue === 'function'
            ? (newValue as (prev: T) => T)(prev)
            : newValue;

        setItem(key, resolvedValue);
        return resolvedValue;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    removeItem(key);
    setValueState(initialValue);
  }, [key, initialValue]);

  return { value, setValue, remove };
};
