import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getItem, setItem, removeItem, clear } from './localStorage';

describe('localStorage utilities', () => {
  const silenceWarnings = () =>
    vi.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    globalThis.window = {};

    globalThis.localStorage = {
      store: {},

      getItem(key) {
        return this.store[key] ?? null;
      },

      setItem(key, value) {
        this.store[key] = value;
      },

      removeItem(key) {
        delete this.store[key];
      },

      clear() {
        this.store = {};
      },
    };
  });

  it('does not crash if window is undefined', () => {
    delete globalThis.window;

    expect(() => getItem('key')).not.toThrow();
  });

  it('setItem does nothing when not in browser', () => {
    delete globalThis.window;

    setItem('key', 'value');
    expect(globalThis.localStorage.store['key']).toBeUndefined();
  });

  it('returns initial value when key does not exist', () => {
    const result = getItem('missing', 'initial');
    expect(result).toBe('initial');
  });

  it('returns initial value if getItem throws', () => {
    const warnSpy = silenceWarnings();

    localStorage.getItem = () => {
      throw new Error('fail');
    };

    const result = getItem('key', 'initial');

    expect(result).toBe('initial');
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('returns null when stored value is "null"', () => {
    localStorage.setItem('key', JSON.stringify(null));

    const result = getItem('key', 'initial');

    expect(result).toBe(null);
  });

  it('returns initial value when JSON is invalid', () => {
    localStorage.setItem('bad', 'not-json');

    const warnSpy = silenceWarnings();
    const result = getItem('bad', 'initial');
    expect(result).toBe('initial');
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Invalid JSON'),
      expect.any(Error)
    );
    warnSpy.mockRestore();
  });

  it('stores value as JSON string', () => {
    setItem('key', { foo: 'bar' });

    const expected = '{"foo":"bar"}';

    expect(localStorage.getItem('key')).toBe(expected);
  });

  it('stores and retrieves boolean values correctly', () => {
    setItem('key', true);
    const result = getItem('key');
    expect(result).toBe(true);
  });

  it('stores and retrieves number values correctly', () => {
    setItem('key', 123);
    const result = getItem('key');
    expect(result).toBe(123);
  });

  it('stores and retrieves array correctly', () => {
    const arr = [1, 2, 3];
    setItem('arrayKey', arr);

    const result = getItem('arrayKey');
    expect(result).toEqual(arr);
  });

  it('handles large objects', () => {
    const largeObj = { largeKey: new Array(1000).fill('a').join('') };
    setItem('largeObj', largeObj);

    const result = getItem('largeObj');
    expect(result).toEqual(largeObj);
  });

  it('handles undefined values correctly', () => {
    setItem('key', undefined);
    const result = getItem('key');
    expect(result).toBe(null);
  });

  it('handles null values correctly', () => {
    setItem('key', null);
    const result = getItem('key');
    expect(result).toBe(null);
  });

  it('returns parsed value when key exists', () => {
    localStorage.setItem('test', JSON.stringify({ a: 1 }));
    const result = getItem('test');

    expect(result).toEqual({ a: 1 });
  });

  it('overwrites existing value', () => {
    localStorage.setItem('key', 'old');

    setItem('key', 'new');

    expect(localStorage.getItem('key')).toBe(JSON.stringify('new'));
  });

  it('removes item when value is undefined', () => {
    localStorage.setItem('key', 'value');

    setItem('key', undefined);

    expect(localStorage.getItem('key')).toBe(null);
  });

  it('does not throw if setItem fails', () => {
    const warnSpy = silenceWarnings();

    localStorage.setItem = () => {
      throw new Error('fail');
    };

    expect(() => setItem('key', 'value')).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('removes item from storage', () => {
    localStorage.setItem('key', '123');

    removeItem('key');

    expect(localStorage.getItem('key')).toBe(null);
  });

  it('does not throw if removeItem fails', () => {
    const warnSpy = silenceWarnings();

    localStorage.removeItem = () => {
      throw new Error('fail');
    };

    expect(() => removeItem('key')).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('clears all items', () => {
    setItem('key1', 'value1');
    setItem('key2', 'value2');

    clear();

    expect(localStorage.getItem('key1')).toBe(null);
    expect(localStorage.getItem('key2')).toBe(null);
  });

  it('does not throw if clear fails', () => {
    const warnSpy = silenceWarnings();

    localStorage.clear = () => {
      throw new Error('fail');
    };

    expect(() => clear()).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});
