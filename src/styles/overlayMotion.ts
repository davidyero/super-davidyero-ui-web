import { keyframes } from '@emotion/react';
import { timing } from './motion';

export const fadeIn = keyframes({ from: { opacity: 0 } });
export const fadeOut = keyframes({ to: { opacity: 0 } });

/**
 * Velo de SuperModal y SuperDrawer: se funde en `fast`. Mientras sale ya no recibe
 * toques, para que nada espere a la animación.
 */
export const scrimMotion = (closing: boolean) =>
  ({
    animation: `${closing ? fadeOut : fadeIn} ${timing('fast')} both`,
    pointerEvents: closing ? 'none' : undefined,
  }) as const;
