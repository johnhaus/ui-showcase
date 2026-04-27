import { useLocalStorage } from '../hooks/useLocalStorage';
import { PreferencesContext } from './PreferencesContext';

const defaultPreferences = {
  theme: 'system',
  language: 'en',
};

export function PreferencesProvider({ children }) {
  const {
    value: preferences,
    setValue: setPreferences,
    remove: removePreferences,
  } = useLocalStorage('preferences', defaultPreferences);

  const mergedPreferences = { ...defaultPreferences, ...preferences };

  const setTheme = (theme) => setPreferences((prev) => ({ ...prev, theme }));

  const setLanguage = (language) =>
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
