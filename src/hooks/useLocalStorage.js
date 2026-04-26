import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, removeItem } from '../utils/localStorage';

export const useLocalStorage = (key, initialValue = null) => {
  const [value, setValueState] = useState(() => getItem(key, initialValue));

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === key) {
        setValueState(getItem(key, initialValue));
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

  const setValue = useCallback(
    (newValue) => {
      setValueState((prev) => {
        const resolvedValue =
          typeof newValue === 'function' ? newValue(prev) : newValue;

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
