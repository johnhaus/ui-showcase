import React, { useState, useMemo } from 'react';
import defaultFlagsJson from '../config/featureFlags.json';
import { FeatureFlagContext } from './FeatureFlagContext';

const defaultFlags = Object.freeze({ ...defaultFlagsJson });

export const FeatureFlagProvider = ({ children }) => {
  const [flags, setFlags] = useState(() => {
    return defaultFlags;
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
