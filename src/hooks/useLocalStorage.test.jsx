import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with initialValue when storage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorage(key, 'initial')
    );

    expect(result.current.value).toBe('initial');
  });

  it('falls back to initialValue if stored value is invalid JSON', () => {
    localStorage.setItem('bad', 'not-json');

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() =>
      useLocalStorage('bad', 'initial')
    );

    expect(result.current.value).toBe('initial');

    warnSpy.mockRestore();
  });

  it('initializes with stored value when present', () => {
    localStorage.setItem(key, JSON.stringify('stored'));

    const { result } = renderHook(() =>
      useLocalStorage(key, 'initial')
    );

    expect(result.current.value).toBe('stored');
  });

  it('persists value to localStorage when setValue is called', () => {
    const { result } = renderHook(() =>
      useLocalStorage(key, 'initial')
    );

    act(() => {
      result.current.setValue('new-value');
    });

    expect(result.current.value).toBe('new-value');
    expect(JSON.parse(localStorage.getItem(key))).toBe('new-value');
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() =>
      useLocalStorage(key, 1)
    );

    act(() => {
      result.current.setValue((prev) => prev + 1);
    });

    expect(result.current.value).toBe(2);
    expect(JSON.parse(localStorage.getItem(key))).toBe(2);
  });

  it('removes value and resets to initialValue', () => {
    const { result } = renderHook(() =>
      useLocalStorage(key, 'initial')
    );

    act(() => {
      result.current.remove();
    });

    expect(result.current.value).toBe('initial');
    expect(localStorage.getItem(key)).toBe(null);
  });

  it('updates state when storage event fires (cross-tab simulation)', () => {
    const { result } = renderHook(() =>
      useLocalStorage(key, 'initial')
    );

    act(() => {
      localStorage.setItem(key, JSON.stringify('external'));

      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: JSON.stringify('external'),
        })
      );
    });

    expect(result.current.value).toBe('external');
  });

  it('ignores storage events for different keys', () => {
    const { result } = renderHook(() =>
      useLocalStorage(key, 'initial')
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'other-key',
          newValue: JSON.stringify('nope'),
        })
      );
    });

    expect(result.current.value).toBe('initial');
  });

  it('handles undefined value by removing from localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage(key, 'initial')
    );

    act(() => {
      result.current.setValue(undefined);
    });

    expect(localStorage.getItem(key)).toBe(null);
    expect(result.current.value).toBe(undefined);
  });
});
