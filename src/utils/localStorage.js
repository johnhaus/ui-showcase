const isBrowser = () => typeof window !== 'undefined';

const logError = (message, error) => {
  if (import.meta.env.DEV) {
    console.warn(message, error);
  }
};

export const getItem = (key, initialValue = null) => {
  if (!isBrowser()) return initialValue;

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return initialValue;

    try {
      return JSON.parse(stored);
    } catch (e) {
      logError(`Invalid JSON for key "${key}"`, e);
      return initialValue;
    }
  } catch (e) {
    logError(`localStorage getItem failed for key "${key}"`, e);
    return initialValue;
  }
};

export const setItem = (key, value) => {
  if (!isBrowser()) return;

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

export const removeItem = (key) => {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(key);
  } catch (e) {
    logError(`localStorage removeItem failed for key "${key}"`, e);
  }
};

export const clear = () => {
  if (!isBrowser()) return;

  try {
    localStorage.clear();
  } catch (e) {
    logError('localStorage clear failed', e);
  }
};
