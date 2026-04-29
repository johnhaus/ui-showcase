import { FeatureFlagContext } from './FeatureFlagContext';

export function FeatureFlagProvider({ children }) {
  return (
    <FeatureFlagContext.Provider value={{}}>
      {children}
    </FeatureFlagContext.Provider>
  );
}
