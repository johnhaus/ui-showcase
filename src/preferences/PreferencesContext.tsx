import { createContext } from 'react';

type PreferencesContextValue = {
  theme: string
  language: string
  setTheme: (theme: string) => void
  setLanguage: (language: string) => void
  resetPreferences: () => void
};

export const PreferencesContext =
  createContext<PreferencesContextValue | null>(null);
