import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { CardPadding, CardVariant } from './SuperCard.types';

const PAD: Record<CardPadding, string> = { none: '0', sm: space.md, md: space.lg, lg: space.xl };

const BG: Record<CardVariant, { background: string; border: string; boxShadow: string }> = {
  default: { background: v.surface, border: `1px solid ${v.border}`, boxShadow: v.shadow.sm },
  sunken: { background: v.surfaceSunken, border: '1px solid transparent', boxShadow: 'none' },
  elevated: {
    background: v.surfaceElevated,
    border: `1px solid ${v.border}`,
    boxShadow: v.shadow.md,
  },
  outline: { background: 'transparent', border: `1px solid ${v.borderStrong}`, boxShadow: 'none' },
};

export const CardRoot = styled.div<{
  $variant: CardVariant;
  $padding: CardPadding;
  $interactive: boolean;
}>(({ $variant, $padding, $interactive }) => ({
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  padding: PAD[$padding],
  borderRadius: v.radius.lg,
  color: v.textBody,
  textAlign: 'left',
  font: 'inherit',
  ...BG[$variant],
  ...($interactive
    ? {
        cursor: 'pointer',
        transition: `border-color ${transition}, box-shadow ${transition}`,
        '&:hover': { borderColor: v.accent, boxShadow: v.shadow.md },
        '&:focus-visible': focusVisible,
      }
    : {}),
}));
