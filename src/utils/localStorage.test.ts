import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clear, getItem, removeItem, setItem } from './localStorage';

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('getItem', () => {
    it('returns the initial value when key does not exist', () => {
      expect(getItem('missing', 'initial')).toBe('initial');
    });

    it('returns the parsed value when key exists', () => {
      localStorage.setItem('test', JSON.stringify({ a: 1 }));

      expect(getItem('test', {})).toEqual({ a: 1 });
    });

    it('supports different value types', () => {
      localStorage.setItem('boolean', JSON.stringify(true));
      localStorage.setItem('number', JSON.stringify(123));
      localStorage.setItem('array', JSON.stringify([1, 2, 3]));

      expect(getItem('boolean', false)).toBe(true);
      expect(getItem('number', 0)).toBe(123);
      expect(getItem<number[]>('array', [])).toEqual([1, 2, 3]);
    });

    it('returns null when stored value is null', () => {
      localStorage.setItem('key', JSON.stringify(null));

      expect(getItem<string | null>('key', 'initial')).toBeNull();
    });

    it('returns the initial value when stored JSON is invalid', () => {
      localStorage.setItem('bad', 'not-json');

      const warnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      expect(getItem('bad', 'initial')).toBe('initial');

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid JSON'),
        expect.anything()
      );
    });

    it('returns the initial value when localStorage.getItem throws', () => {
      const warnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('fail');
      });

      expect(getItem('key', 'initial')).toBe('initial');

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('localStorage getItem failed'),
        expect.any(Error)
      );
    });

    it('returns the initial value when window is undefined', () => {
      vi.stubGlobal('window', undefined);

      expect(getItem('key', 'initial')).toBe('initial');
    });
  });

  describe('setItem', () => {
    it('stores values as JSON', () => {
      setItem('key', { foo: 'bar' });

      expect(localStorage.getItem('key')).toBe('{"foo":"bar"}');
    });

    it('stores and retrieves boolean values correctly', () => {
      setItem('key', true);

      expect(getItem('key', false)).toBe(true);
    });

    it('stores and retrieves number values correctly', () => {
      setItem('key', 123);

      expect(getItem('key', 0)).toBe(123);
    });

    it('stores and retrieves arrays correctly', () => {
      const value = [1, 2, 3];

      setItem('array', value);

      expect(getItem<number[]>('array', [])).toEqual(value);
    });

    it('overwrites an existing value', () => {
      setItem('key', 'old');
      setItem('key', 'new');

      expect(localStorage.getItem('key')).toBe(JSON.stringify('new'));
    });

    it('removes the item when value is undefined', () => {
      setItem('key', 'value');

      setItem('key', undefined);

      expect(localStorage.getItem('key')).toBeNull();
    });

    it('stores null correctly', () => {
      setItem('key', null);

      expect(getItem<string | null>('key', 'initial')).toBeNull();
    });

    it('does nothing when window is undefined', () => {
      vi.stubGlobal('window', undefined);

      setItem('key', 'value');

      expect(localStorage.getItem('key')).toBeNull();
    });

    it('does not throw when localStorage.setItem fails', () => {
      const warnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('fail');
      });

      expect(() => setItem('key', 'value')).not.toThrow();

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('localStorage setItem failed'),
        expect.any(Error)
      );
    });
  });

  describe('removeItem', () => {
    it('removes an item from storage', () => {
      localStorage.setItem('key', 'value');

      removeItem('key');

      expect(localStorage.getItem('key')).toBeNull();
    });

    it('does nothing when window is undefined', () => {
      localStorage.setItem('key', 'value');

      vi.stubGlobal('window', undefined);

      removeItem('key');

      expect(localStorage.getItem('key')).toBe('value');
    });

    it('does not throw when localStorage.removeItem fails', () => {
      const warnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('fail');
      });

      expect(() => removeItem('key')).not.toThrow();

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('localStorage removeItem failed'),
        expect.any(Error)
      );
    });
  });

  describe('clear', () => {
    it('clears all items', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');

      clear();

      expect(localStorage.getItem('key1')).toBeNull();
      expect(localStorage.getItem('key2')).toBeNull();
    });

    it('does nothing when window is undefined', () => {
      localStorage.setItem('key1', 'value1');

      vi.stubGlobal('window', undefined);

      clear();

      expect(localStorage.getItem('key1')).toBe('value1');
    });

    it('does not throw when localStorage.clear fails', () => {
      const warnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      vi.spyOn(Storage.prototype, 'clear').mockImplementation(() => {
        throw new Error('fail');
      });

      expect(() => clear()).not.toThrow();

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('localStorage clear failed'),
        expect.any(Error)
      );
    });
  });
});
