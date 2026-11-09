import { useId, type ReactElement } from 'react';
import { FLAG_PATHS } from './SuperFlag.paths';
import type { SuperFlagProps } from './SuperFlag.types';

/**
 * Bandera redonda de un país, para selectores de idioma o de prefijo telefónico.
 * Decorativa salvo que reciba `label`.
 */
export const SuperFlag = ({
  country,
  size = 24,
  label,
  className,
}: SuperFlagProps): ReactElement => {
  const clipId = `sd-flag-${useId().replace(/:/g, '')}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={className}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <clipPath id={clipId}>
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>{FLAG_PATHS[country]}</g>
    </svg>
  );
};

export type { SuperFlagCountry, SuperFlagProps } from './SuperFlag.types';
