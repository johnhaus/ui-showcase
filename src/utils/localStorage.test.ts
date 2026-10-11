import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getItem, setItem, removeItem, clear } from './localStorage';

describe('localStorage utilities', () => {
  let store: Record<string, string>;
  let originalWindow: typeof globalThis.window;
  let originalLocalStorage: Storage;

  const silenceWarnings = () =>
    vi.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    store = {};
    originalWindow = globalThis.window;
    originalLocalStorage = globalThis.localStorage;

    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      writable: true,
      value: {},
    });

    const mockStorage: Storage = {
      get length() {
        return Object.keys(store).length;
      },

      key(index: number): string | null {
        return Object.keys(store)[index] ?? null;
      },

      getItem(key: string): string | null {
        return store[key] ?? null;
      },

      setItem(key: string, value: string): void {
        store[key] = String(value);
      },

      removeItem(key: string): void {
        delete store[key];
      },

      clear(): void {
        store = {};
      },
    };

    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      writable: true,
      value: mockStorage,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();

    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      writable: true,
      value: originalWindow,
    });

    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      writable: true,
      value: originalLocalStorage,
    });
  });

  it('does not crash if window is undefined', () => {
    Reflect.deleteProperty(globalThis, 'window');

    expect(() => getItem('key')).not.toThrow();
  });

  it('setItem does nothing when not in browser', () => {
    Reflect.deleteProperty(globalThis, 'window');

    setItem('key', 'value');
    expect(store['key']).toBeUndefined();
  });

  it('returns initial value when key does not exist', () => {
    const result = getItem('missing', 'initial');
    expect(result).toBe('initial');
  });

  it('returns initial value if getItem throws', () => {
    const warnSpy = silenceWarnings();

    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('fail');
    });

    const result = getItem('key', 'initial');

    expect(result).toBe('initial');
    expect(warnSpy).toHaveBeenCalled();
  });

  it('returns null when stored value is "null"', () => {
    localStorage.setItem('key', JSON.stringify(null));

    const result = getItem('key', 'initial');

    expect(result).toBeNull();
  });

  it('returns initial value when JSON is invalid', () => {
    localStorage.setItem('bad', 'not-json');

    const warnSpy = silenceWarnings();
    const result = getItem('bad', 'initial');

    expect(result).toBe('initial');
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Invalid JSON'),
      expect.any(Error),
    );
  });

  it('stores value as JSON string', () => {
    setItem('key', { foo: 'bar' });

    expect(localStorage.getItem('key')).toBe('{"foo":"bar"}');
  });

  it('stores and retrieves boolean values correctly', () => {
    setItem('key', true);
    expect(getItem('key')).toBe(true);
  });

  it('stores and retrieves number values correctly', () => {
    setItem('key', 123);
    expect(getItem('key')).toBe(123);
  });

  it('stores and retrieves array correctly', () => {
    const arr = [1, 2, 3];
    setItem('arrayKey', arr);

    expect(getItem('arrayKey')).toEqual(arr);
  });

  it('handles large objects', () => {
    const largeObj = { largeKey: new Array(1000).fill('a').join('') };
    setItem('largeObj', largeObj);

    expect(getItem('largeObj')).toEqual(largeObj);
  });

  it('handles undefined values correctly', () => {
    setItem('key', undefined);
    expect(getItem('key')).toBeNull();
  });

  it('handles null values correctly', () => {
    setItem('key', null);
    expect(getItem('key')).toBeNull();
  });

  it('returns parsed value when key exists', () => {
    localStorage.setItem('test', JSON.stringify({ a: 1 }));

    expect(getItem('test')).toEqual({ a: 1 });
  });

  it('overwrites existing value', () => {
    localStorage.setItem('key', 'old');
    setItem('key', 'new');

    expect(localStorage.getItem('key')).toBe(JSON.stringify('new'));
  });

  it('removes item when value is undefined', () => {
    localStorage.setItem('key', 'value');
    setItem('key', undefined);

    expect(localStorage.getItem('key')).toBeNull();
  });

  it('does not throw if setItem fails', () => {
    const warnSpy = silenceWarnings();

    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('fail');
    });

    expect(() => setItem('key', 'value')).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  it('removes item from storage', () => {
    localStorage.setItem('key', '123');
    removeItem('key');

    expect(localStorage.getItem('key')).toBeNull();
  });

  it('does not throw if removeItem fails', () => {
    const warnSpy = silenceWarnings();

    vi.spyOn(localStorage, 'removeItem').mockImplementation(() => {
      throw new Error('fail');
    });

    expect(() => removeItem('key')).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  it('clears all items', () => {
    setItem('key1', 'value1');
    setItem('key2', 'value2');

    clear();

    expect(localStorage.getItem('key1')).toBeNull();
    expect(localStorage.getItem('key2')).toBeNull();
  });

  it('does not throw if clear fails', () => {
    const warnSpy = silenceWarnings();

    vi.spyOn(localStorage, 'clear').mockImplementation(() => {
      throw new Error('fail');
    });

    expect(() => clear()).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });
});
