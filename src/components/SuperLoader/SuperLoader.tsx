import type { ReactElement } from 'react';
import { useSuperLabels } from '../../theme/SuperThemeContext';
import { Center, Spinner } from './SuperLoader.styles';
import type { SuperLoaderProps } from './SuperLoader.types';

/** Indicador de carga. Para bloquear la pantalla usa `SuperLoaderOverlay`. */
export const SuperLoader = ({
  size = 'md',
  layout = 'inline',
  color = 'primary',
  decorative = false,
  className,
}: SuperLoaderProps): ReactElement => {
  const labels = useSuperLabels();
  const spinner = (
    <Spinner
      $size={size}
      $color={color}
      className={className}
      role={decorative ? undefined : 'status'}
      aria-label={decorative ? undefined : labels.loading}
      aria-hidden={decorative ? true : undefined}
    />
  );
  return layout === 'inline' ? spinner : <Center $layout={layout}>{spinner}</Center>;
};

export type { SuperLoaderProps, LoaderSize, LoaderLayout } from './SuperLoader.types';
