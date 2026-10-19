import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { baseTheme } from '../theme/theme';

type BreakpointKey = keyof typeof baseTheme.breakpoints;

const useBreakpoint = (key: BreakpointKey): boolean => {
  const theme = useTheme();
  const query = `(max-width: ${theme.breakpoints[key]})`;

  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = () => setMatches(media.matches);

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export default useBreakpoint;
