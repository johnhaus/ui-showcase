import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  PreferencesContext,
  type Preferences,
  type Theme,
} from './PreferencesContext';

const defaultPreferences: Preferences = {
  theme: 'system',
  language: 'en',
};

type PreferencesProviderProps = {
  children: ReactNode;
};

export function PreferencesProvider({
  children,
}: PreferencesProviderProps) {
  const {
    value: preferences,
    setValue: setPreferences,
    remove: removePreferences,
  } = useLocalStorage<Preferences>('preferences', defaultPreferences);

  const mergedPreferences: Preferences = {
    ...defaultPreferences,
    ...(preferences ?? {}),
  };

  const setTheme = (theme: Theme): void => {
    setPreferences((prev) => ({
      ...defaultPreferences,
      ...prev,
      theme,
    }));
  };

  const setLanguage = (language: string): void => {
    setPreferences((prev) => ({
      ...defaultPreferences,
      ...prev,
      language,
    }));
  };

  const resetPreferences = (): void => {
    removePreferences();
  };

  return (
    <PreferencesContext.Provider
      value={{
        ...mergedPreferences,
        setTheme,
        setLanguage,
        resetPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
