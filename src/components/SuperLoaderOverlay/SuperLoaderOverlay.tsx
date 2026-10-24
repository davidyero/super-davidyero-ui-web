import type { ReactElement } from 'react';
import { useSuperLabels } from '../../theme/SuperThemeContext';
import { SuperLoader } from '../SuperLoader/SuperLoader';
import { Backdrop } from './SuperLoaderOverlay.styles';
import type { SuperLoaderOverlayProps } from './SuperLoaderOverlay.types';
import { useSuperLoaderOverlay } from './useSuperLoaderOverlay';

/**
 * Loader de pantalla completa: atenúa el fondo y bloquea el toque. Lo activa
 * `loaderStore` desde los interceptores HTTP, o a mano para acciones críticas.
 * Montar una sola vez en la raíz; nunca uno por vista.
 */
export const SuperLoaderOverlay = ({
  visible,
  delayMs = 120,
}: SuperLoaderOverlayProps): ReactElement | null => {
  const labels = useSuperLabels();
  const shown = useSuperLoaderOverlay(visible, delayMs);
  if (!shown) return null;
  return (
    <Backdrop role="alert" aria-busy="true" aria-live="assertive" aria-label={labels.loading}>
      <SuperLoader size="lg" decorative />
    </Backdrop>
  );
};

export type { SuperLoaderOverlayProps } from './SuperLoaderOverlay.types';
