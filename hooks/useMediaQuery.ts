import { useEffect, useState } from 'react';

/**
 * Hook para evaluar media queries en tiempo real
 * @param query string de media query, por ejemplo "(max-width: 600px)"
 * @returns booleano si la condición se cumple
 */
export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const handleChange = () => setMatches(media.matches);
    handleChange(); // evalúa inicialmente

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
