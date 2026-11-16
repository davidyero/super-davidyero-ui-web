import type { ReactElement } from 'react';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { ChipRoot, Group, Leading } from './SuperChip.styles';
import type { SuperChipGroupProps, SuperChipProps } from './SuperChip.types';

/**
 * Chip: filtro de selección (con `selected`, un interruptor con `aria-pressed`), acción
 * corta (con `onClick`) o etiqueta (sin ninguno de los dos).
 */
export const SuperChip = ({
  children,
  selected,
  onClick,
  leading,
  size = 'sm',
  disabled = false,
  className,
}: SuperChipProps): ReactElement => {
  const interactive = selected !== undefined || onClick !== undefined;
  return (
    <ChipRoot
      as={interactive ? 'button' : 'span'}
      type={interactive ? 'button' : undefined}
      aria-pressed={selected}
      disabled={interactive ? disabled : undefined}
      onClick={interactive ? onClick : undefined}
      $size={size}
      $selected={selected === true}
      $leading={leading !== undefined}
      $interactive={interactive}
      className={className}
    >
      {leading !== undefined ? <Leading aria-hidden>{leading}</Leading> : null}
      <SuperTypography
        variant="caption"
        weight={selected ? 'semibold' : 'medium'}
        color="inherit"
        truncate
        as="span"
      >
        {children}
      </SuperTypography>
    </ChipRoot>
  );
};

/** Fila de chips con nombre de grupo (`role="group"`). */
export const SuperChipGroup = ({
  ariaLabel,
  children,
  className,
}: SuperChipGroupProps): ReactElement => (
  <Group role="group" aria-label={ariaLabel} className={className}>
    {children}
  </Group>
);

export type { SuperChipGroupProps, SuperChipProps, SuperChipSize } from './SuperChip.types';
