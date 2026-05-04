import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFeatureFlags, useFeatureFlag } from './useFeatureFlags';
import { FeatureFlagContext } from './FeatureFlagContext';

describe('useFeatureFlags', () => {
  it('throws if used outside provider', () => {
    expect(() => renderHook(() => useFeatureFlags())).toThrow(
      'useFeatureFlags must be used within FeatureFlagProvider'
    );
  });

  it('returns context inside provider', () => {
    const mockContext = {
      flags: { test: true },
      toggleFlag: vi.fn(),
      updateFlag: vi.fn(),
    };
    const { result } = renderHook(() => useFeatureFlags(), {
      wrapper: ({ children }) => (
        <FeatureFlagContext.Provider value={mockContext}>
          {children}
        </FeatureFlagContext.Provider>
      ),
    });
    expect(result.current).toBe(mockContext);
  });
});

describe('useFeatureFlag', () => {
  const mockToggle = vi.fn();
  const mockUpdate = vi.fn();
  const mockFlags = { betaDashboard: true, testFlag: false };

  const wrapper = ({ children }) => (
    <FeatureFlagContext.Provider
      value={{
        flags: mockFlags,
        toggleFlag: mockToggle,
        updateFlag: mockUpdate,
      }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );

  beforeEach(() => {
    mockToggle.mockReset();
    mockUpdate.mockReset();
  });

  it('returns correct isEnabled value', () => {
    const { result } = renderHook(() => useFeatureFlag('betaDashboard'), {
      wrapper,
    });
    expect(result.current.isEnabled).toBe(true);

    const { result: r2 } = renderHook(() => useFeatureFlag('testFlag'), {
      wrapper,
    });
    expect(r2.current.isEnabled).toBe(false);
  });

  it('calls toggleFlag when toggle is called', () => {
    const { result } = renderHook(() => useFeatureFlag('betaDashboard'), {
      wrapper,
    });
    act(() => result.current.toggle());
    expect(mockToggle).toHaveBeenCalledWith('betaDashboard');
  });

  it('calls updateFlag with correct value', () => {
    const { result } = renderHook(() => useFeatureFlag('testFlag'), {
      wrapper,
    });
    act(() => result.current.setEnabled(true));
    expect(mockUpdate).toHaveBeenCalledWith('testFlag', true);
  });
});
