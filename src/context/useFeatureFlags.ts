import { useContext } from 'react';
import { FeatureFlagContext } from './FeatureFlagContext';
import type { FeatureFlag } from './featureFlagConfig';

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    throw new Error(
      'useFeatureFlags must be used within FeatureFlagProvider'
    );
  }

  return context;
};

export const useFeatureFlag = (key: FeatureFlag) => {
  const { flags, toggleFlag, updateFlag } = useFeatureFlags();

  return {
    isEnabled: flags[key],
    toggle: () => toggleFlag(key),
    setEnabled: (value: boolean) => updateFlag(key, value),
  };
};
