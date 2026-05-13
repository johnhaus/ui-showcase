import React, { useState, useEffect, useMemo } from 'react';
import defaultFlagsJson from '../config/featureFlags.json';
import { FeatureFlagContext } from './FeatureFlagContext';
import {
  mergeFlags,
  extractOverrides,
  shallowEqualFlags,
} from './featureFlagCore';
import { getItem, setItem, removeItem } from '../utils/localStorage';

const STORAGE_KEY = 'featureFlags';
const defaultFlags = Object.freeze({ ...defaultFlagsJson });

export const FeatureFlagProvider = ({ children }) => {
  const [flags, setFlags] = useState(() => {
    const stored = getItem(STORAGE_KEY, {});
    const safeStored =
      typeof stored === 'object' && stored !== null ? stored : {};
    return mergeFlags(defaultFlags, safeStored);
  });

  useEffect(() => {
    const overrides = extractOverrides(flags, defaultFlags);
    const currentStored = getItem(STORAGE_KEY, {});

    if (shallowEqualFlags(overrides, currentStored)) return;

    if (Object.keys(overrides).length === 0) {
      removeItem(STORAGE_KEY);
    } else {
      setItem(STORAGE_KEY, overrides);
    }
  }, [flags]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;

      const overrides = getItem(STORAGE_KEY, {});
      const safeOverrides =
        typeof overrides === 'object' && overrides !== null ? overrides : {};
      const next = mergeFlags(defaultFlags, safeOverrides);

      setFlags((prev) => (shallowEqualFlags(prev, next) ? prev : next));
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value = useMemo(
    () => ({
      flags,
    }),
    [flags]
  );

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
