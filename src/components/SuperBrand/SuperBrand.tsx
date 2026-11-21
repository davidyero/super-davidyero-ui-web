import type { ReactElement } from 'react';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Initial, LogoBox, Root } from './SuperBrand.styles';
import type { SuperBrandProps } from './SuperBrand.types';

/**
 * Marca de la web (logo + nombre), igual en todas las de uso propio: en el login con
 * `size="md"` y en el sidebar con `size="sm"`. El logo es decorativo: el nombre lo nombra.
 */
export const SuperBrand = ({
  name,
  logo,
  size = 'md',
  hideName = false,
  className,
}: SuperBrandProps): ReactElement => (
  <Root
    className={className}
    role={hideName ? 'img' : undefined}
    aria-label={hideName ? name : undefined}
  >
    <LogoBox $size={size} aria-hidden>
      {logo ?? <Initial $size={size}>{name.trim().charAt(0).toUpperCase()}</Initial>}
    </LogoBox>
    {hideName ? null : (
      <SuperTypography
        variant={size === 'md' ? 'h3' : 'label'}
        weight={size === 'md' ? undefined : 'bold'}
        as="span"
        truncate
      >
        {name}
      </SuperTypography>
    )}
  </Root>
);

export type { SuperBrandProps, SuperBrandSize } from './SuperBrand.types';
