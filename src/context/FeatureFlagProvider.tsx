import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { FeatureFlagContext } from './FeatureFlagContext';
import {
  defaultFlags,
  type FeatureFlag,
  type FeatureFlags,
} from './featureFlagConfig';
import {
  extractOverrides,
  mergeFlags,
  shallowEqualFlags,
} from './featureFlagCore';
import { getItem, setItem, removeItem } from '../utils/localStorage';

const STORAGE_KEY = 'featureFlags';

interface FeatureFlagProviderProps {
  children: ReactNode;
}

const loadFlags = (): FeatureFlags => {
  const stored = getItem(STORAGE_KEY, {});

  if (typeof stored !== 'object' || stored === null) {
    return { ...defaultFlags };
  }

  return mergeFlags(defaultFlags, stored);
};

export const FeatureFlagProvider = ({
  children,
}: FeatureFlagProviderProps) => {
  const [flags, setFlags] = useState<FeatureFlags>(loadFlags);

  useEffect(() => {
    const overrides = extractOverrides(flags, defaultFlags);
    const currentStored = getItem(STORAGE_KEY, {});

    if (shallowEqualFlags(overrides, currentStored)) {
      return;
    }

    if (Object.keys(overrides).length === 0) {
      removeItem(STORAGE_KEY);
    } else {
      setItem(STORAGE_KEY, overrides);
    }
  }, [flags]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) {
        return;
      }

      const next = loadFlags();

      setFlags((previous) =>
        shallowEqualFlags(previous, next) ? previous : next
      );
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const updateFlag = useCallback(
    (key: FeatureFlag, value: boolean) => {
      setFlags((previous) => ({
        ...previous,
        [key]: value,
      }));
    },
    []
  );

  const toggleFlag = useCallback((key: FeatureFlag) => {
    setFlags((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }, []);

  const resetFlags = useCallback(() => {
    setFlags({ ...defaultFlags });
  }, []);

  const value = useMemo(
    () => ({
      flags,
      updateFlag,
      toggleFlag,
      resetFlags,
    }),
    [flags, updateFlag, toggleFlag, resetFlags]
  );

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
