import { createContext } from 'react';
import type { FeatureFlag, FeatureFlags } from './featureFlagConfig';

export interface FeatureFlagContextValue {
  flags: FeatureFlags;
  updateFlag: (key: FeatureFlag, value: boolean) => void;
  toggleFlag: (key: FeatureFlag) => void;
  resetFlags: () => void;
}

export const FeatureFlagContext =
  createContext<FeatureFlagContextValue | null>(null);
