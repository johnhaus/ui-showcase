import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

const useBreakpoint = (key: 'mobile') => {
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
