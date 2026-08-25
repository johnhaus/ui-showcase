const isBrowser = (): boolean => typeof window !== 'undefined';

const logError = (message: string, error: unknown): void => {
  if (import.meta.env.DEV) {
    console.warn(message, error);
  }
};

export function getItem(key: string): null;
export function getItem<T>(key: string, initialValue: T): T;
export function getItem<T>(
  key: string,
  initialValue: T | null = null
): T | null {
  if (!isBrowser()) return initialValue;

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return initialValue;

    try {
      return JSON.parse(stored) as T;
    } catch (e: unknown) {
      logError(`Invalid JSON for key "${key}"`, e);
      return initialValue;
    }
  } catch (e: unknown) {
    logError(`localStorage getItem failed for key "${key}"`, e);
    return initialValue;
  }
}

export const setItem = <T>(key: string, value: T): void => {
  if (!isBrowser()) return;

  try {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  } catch (e: unknown) {
    logError(`localStorage setItem failed for key "${key}"`, e);
  }
};

export const removeItem = (key: string): void => {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(key);
  } catch (e: unknown) {
    logError(`localStorage removeItem failed for key "${key}"`, e);
  }
};

export const clear = (): void => {
  if (!isBrowser()) return;

  try {
    localStorage.clear();
  } catch (e: unknown) {
    logError('localStorage clear failed', e);
  }
};
