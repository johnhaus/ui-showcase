import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, removeItem } from '../utils/localStorage';

type SetValueAction<T> =
  | T
  | undefined
  | ((prev: T | undefined | null) => T | undefined);

export const useLocalStorage = <T = null>(
  key: string,
  initialValue: T | null = null
) => {
  const [value, setValueState] = useState<T | null | undefined>(
    () => getItem<T>(key, initialValue)
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
    (newValue: SetValueAction<T | null>) => {
      setValueState((prev) => {
        const resolvedValue =
          typeof newValue === 'function'
            ? (
                newValue as (
                  prev: T | null | undefined
                ) => T | null | undefined
              )(prev)
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
