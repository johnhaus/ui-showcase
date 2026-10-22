import { createContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export type Preferences = {
  theme: Theme;
  language: string;
};

export type PreferencesContextValue = Preferences & {
  setTheme: (theme: Theme) => void;
  setLanguage: (language: string) => void;
  resetPreferences: () => void;
};

export const PreferencesContext =
  createContext<PreferencesContextValue | null>(null);
