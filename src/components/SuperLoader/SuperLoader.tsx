import type { ReactElement } from 'react';
import { useSuperLabels } from '../../theme/SuperThemeContext';
import { Spinner } from './SuperLoader.styles';
import type { SuperLoaderProps } from './SuperLoader.types';

/** Indicador de carga. Para bloquear la pantalla usa `SuperLoaderOverlay`. */
export const SuperLoader = ({
  size = 'md',
  color = 'primary',
  decorative = false,
  className,
}: SuperLoaderProps): ReactElement => {
  const labels = useSuperLabels();
  return (
    <Spinner
      $size={size}
      $color={color}
      className={className}
      role={decorative ? undefined : 'status'}
      aria-label={decorative ? undefined : labels.loading}
      aria-hidden={decorative ? true : undefined}
    />
  );
};

export type { SuperLoaderProps, LoaderSize } from './SuperLoader.types';
