import React from 'react';
import { FeatureFlagContext } from './FeatureFlagContext';

export const FeatureFlagProvider = ({ children }) => {
  return (
    <FeatureFlagContext.Provider value={{}}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
