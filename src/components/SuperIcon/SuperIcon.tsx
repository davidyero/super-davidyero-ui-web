import { Icon } from '@iconify/react';
import type { ReactElement } from 'react';
import { useSuperTheme } from '../../theme/SuperThemeContext';
import { IconWrap } from './SuperIcon.styles';
import type { SuperIconProps } from './SuperIcon.types';

/** Icono por nombre semántico. Todo icono de la app pasa por aquí. */
export const SuperIcon = ({
  name,
  size = 20,
  color = 'inherit',
  spin = false,
  label,
  className,
}: SuperIconProps): ReactElement => {
  const { icons } = useSuperTheme();
  const id = name.includes(':') ? name : icons[name];

  return (
    <IconWrap
      $spin={spin}
      $size={size}
      $color={color}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-icon={name}
    >
      {id ? <Icon icon={id} width={size} height={size} /> : null}
    </IconWrap>
  );
};

export type { SuperIconProps, IconColor } from './SuperIcon.types';
