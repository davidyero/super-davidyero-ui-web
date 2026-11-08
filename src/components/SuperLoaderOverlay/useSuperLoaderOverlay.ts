import { useEffect, useState } from 'react';
import { useLoaderActive } from '../../stores/loaderStore';

/** Visible si se fuerza o si hay peticiones activas, con un pequeño retardo anti-parpadeo. */
export const useSuperLoaderOverlay = (visible: boolean | undefined, delayMs: number): boolean => {
  const active = useLoaderActive();
  const wanted = visible ?? active;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!wanted || delayMs <= 0) return undefined;
    const timer = setTimeout(() => setShown(true), delayMs);
    // Al dejar de quererse, se reinicia: la próxima vez vuelve a esperar el retardo.
    return () => {
      clearTimeout(timer);
      setShown(false);
    };
  }, [wanted, delayMs]);

  if (!wanted) return false;
  return delayMs <= 0 || shown;
};
