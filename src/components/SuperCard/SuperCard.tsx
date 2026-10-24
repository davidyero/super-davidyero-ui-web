import type { ReactElement } from 'react';
import { CardRoot } from './SuperCard.styles';
import type { SuperCardProps } from './SuperCard.types';

/** Contenedor de bloque. Variantes por `variant`/`padding`, nunca una card nueva. */
export const SuperCard = ({
  variant = 'default',
  padding = 'md',
  interactive = false,
  as,
  onClick,
  className,
  id,
  children,
}: SuperCardProps): ReactElement => (
  <CardRoot
    as={as}
    $variant={variant}
    $padding={padding}
    $interactive={interactive}
    onClick={onClick}
    className={className}
    id={id}
  >
    {children}
  </CardRoot>
);

export type { SuperCardProps, CardVariant, CardPadding } from './SuperCard.types';
