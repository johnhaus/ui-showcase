const isBrowser = (): boolean => typeof window !== 'undefined';

const logError = (message: string, error: unknown): void => {
  if (import.meta.env.DEV) {
    console.warn(message, error);
  }
};

export const getItem = <T>(key: string, initialValue: T): T => {
  if (!isBrowser()) {
    return initialValue;
  }

  let stored: string | null;

  try {
    stored = localStorage.getItem(key);
  } catch (e) {
    logError(`localStorage getItem failed for key "${key}"`, e);
    return initialValue;
  }

  if (stored === null) {
    return initialValue;
  }

  try {
    return JSON.parse(stored) as T;
  } catch (e) {
    logError(`Invalid JSON for key "${key}"`, e);
    return initialValue;
  }
};

export const setItem = <T>(key: string, value: T | undefined): void => {
  if (!isBrowser()) {
    return;
  }

  try {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    logError(`localStorage setItem failed for key "${key}"`, e);
  }
};

export const removeItem = (key: string): void => {
  if (!isBrowser()) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (e) {
    logError(`localStorage removeItem failed for key "${key}"`, e);
  }
};

export const clear = (): void => {
  if (!isBrowser()) {
    return;
  }

  try {
    localStorage.clear();
  } catch (e) {
    logError('localStorage clear failed', e);
  }
};
