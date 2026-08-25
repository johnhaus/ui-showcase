import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PreferencesContext } from './PreferencesContext';

type Preferences = {
  theme: string
  language: string
};

type PreferencesProviderProps = {
  children: ReactNode;
};

const defaultPreferences: Preferences = {
  theme: 'system',
  language: 'en',
};

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const {
    value: preferences,
    setValue: setPreferences,
    remove: removePreferences,
  } = useLocalStorage('preferences', defaultPreferences);

  const mergedPreferences = { ...defaultPreferences, ...preferences };

  const setTheme = (theme: string) => setPreferences((prev) => ({ ...prev, theme }));

  const setLanguage = (language: string) =>
    setPreferences((prev) => ({ ...prev, language }));

  const resetPreferences = () => {
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
