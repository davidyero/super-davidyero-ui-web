import { Icon } from '@iconify/react';
import { useId, type ReactElement } from 'react';
import { useSuperTheme } from '../../theme/SuperThemeContext';
import { CUSTOM_ICONS } from './SuperIcon.custom';
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
  const uid = `sd-icon-${useId().replace(/:/g, '')}`;
  const custom = CUSTOM_ICONS[name]?.(uid);
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
      {custom ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
        >
          {custom}
        </svg>
      ) : id ? (
        <Icon icon={id} width={size} height={size} />
      ) : null}
    </IconWrap>
  );
};

export type { SuperIconProps, IconColor } from './SuperIcon.types';
