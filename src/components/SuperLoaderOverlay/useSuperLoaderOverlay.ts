import { useEffect, useState } from 'react';
import { useLoaderActive } from '../../stores/loaderStore';

/** Visible si se fuerza o si hay peticiones activas, con un pequeño retardo anti-parpadeo. */
export const useSuperLoaderOverlay = (visible: boolean | undefined, delayMs: number): boolean => {
  const active = useLoaderActive();
  const wanted = visible ?? active;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!wanted) {
      setShown(false);
      return undefined;
    }
    if (delayMs <= 0) {
      setShown(true);
      return undefined;
    }
    const timer = setTimeout(() => setShown(true), delayMs);
    return () => clearTimeout(timer);
  }, [wanted, delayMs]);

  return shown && wanted;
};
