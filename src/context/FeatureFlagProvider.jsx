import React, { useState, useMemo } from 'react';
import defaultFlagsJson from '../config/featureFlags.json';
import { FeatureFlagContext } from './FeatureFlagContext';
import { mergeFlags } from './featureFlagCore';
import { getItem } from '../utils/localStorage';

const STORAGE_KEY = 'featureFlags';
const defaultFlags = Object.freeze({ ...defaultFlagsJson });

export const FeatureFlagProvider = ({ children }) => {
  const [flags, setFlags] = useState(() => {
    const stored = getItem(STORAGE_KEY, {});
    const safeStored =
      typeof stored === 'object' && stored !== null ? stored : {};
    return mergeFlags(defaultFlags, safeStored);
  });

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
