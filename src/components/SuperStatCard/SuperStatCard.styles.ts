import styled from '@emotion/styled';
import { space, textScale } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Top = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: space.sm,
  minWidth: 0,
});

export const IconCircle = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: v.primarySoft,
  color: v.primarySoftText,
});

const lineBox = ({ fontSize, lineHeight }: { fontSize: string; lineHeight: number }): string =>
  `calc(${fontSize} * ${lineHeight})`;

/** Alto del esqueleto de la cifra: una línea de `display` (md) o de `h1` (sm). */
export const VALUE_SKELETON_HEIGHT = {
  md: lineBox(textScale.display),
  sm: lineBox(textScale.h1),
} as const;

export const Value = styled.div<{ $size: 'sm' | 'md' }>(({ $size }) => ({
  marginTop: $size === 'md' ? space.md : space.sm,
  minWidth: 0,
  fontVariantNumeric: 'tabular-nums',
}));

export const DeltaRow = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: space.xs,
  marginTop: space.sm,
  minWidth: 0,
});
