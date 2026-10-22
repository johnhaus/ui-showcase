import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, removeItem } from '../utils/localStorage';

type SetValueAction<T> =
  | T
  | null
  | undefined
  | ((prev: T | null | undefined) => T | null | undefined);

function isUpdater<T>(
  value: SetValueAction<T>
): value is (prev: T | null | undefined) => T | null | undefined {
  return typeof value === 'function';
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | null = null
) => {
  const [value, setValueState] = useState<T | null | undefined>(
    () => getItem<T>(key, initialValue)
  );

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key || e.key === null) {
        setValueState(getItem<T>(key, initialValue));
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

  const setValue = useCallback(
    (newValue: SetValueAction<T>) => {
      setValueState((prev) => {
        const resolvedValue = isUpdater(newValue)
          ? newValue(prev)
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
