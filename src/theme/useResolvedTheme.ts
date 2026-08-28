import { useEffect, useState } from 'react';

type ThemePreference = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

export function useResolvedTheme(
  themePreference: ThemePreference
): ResolvedTheme {
  const getSystemTheme = (): ResolvedTheme =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    themePreference === 'system' ? getSystemTheme() : themePreference
  );

  useEffect(() => {
    if (themePreference !== 'system') {
      setResolvedTheme(themePreference);
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => setResolvedTheme(getSystemTheme());

    listener();
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [themePreference]);

  return resolvedTheme;
}
