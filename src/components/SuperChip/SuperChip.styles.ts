import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { SuperChipSize } from './SuperChip.types';

const HEIGHT: Record<SuperChipSize, string> = { sm: '32px', md: '40px' };
const PAD: Record<SuperChipSize, string> = { sm: space.sm, md: space.md };

interface ChipState {
  $size: SuperChipSize;
  $selected: boolean;
  $leading: boolean;
  $interactive: boolean;
}

// Marcado: fondo soft con su token de texto (primarySoft → primarySoftText), en los dos temas.
export const ChipRoot = styled('button', {
  shouldForwardProp: (prop) => prop !== 'as' && !prop.startsWith('$'),
})<ChipState>(({ $size, $selected, $leading, $interactive }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space.xs,
  maxWidth: '100%',
  minHeight: HEIGHT[$size],
  boxSizing: 'border-box',
  padding: `0 ${PAD[$size]}`,
  paddingLeft: $leading ? space.xxs : PAD[$size],
  border: `1px solid ${$selected ? v.primarySoftText : v.border}`,
  borderRadius: v.radius.pill,
  background: $selected ? v.primarySoft : 'transparent',
  color: $selected ? v.primarySoftText : v.textBody,
  font: 'inherit',
  whiteSpace: 'nowrap',
  transition: `background ${transition}, border-color ${transition}, color ${transition}`,
  ...($interactive
    ? {
        cursor: 'pointer',
        '&:hover:not(:disabled)': {
          background: $selected ? v.primarySoft : v.surfaceSunken,
          color: $selected ? v.primarySoftText : v.text,
        },
        '&:focus-visible': focusVisible,
        '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
      }
    : {}),
}));

export const Leading = styled.span({ display: 'inline-flex', flexShrink: 0 });

/** Fila de chips: salta de línea si no caben. */
export const Group = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: space.xs,
});
