import styled from '@emotion/styled';
import { controlBox, controlText } from '../../styles/field';
import { focusVisible, space } from '../../styles/scale';
import { v } from '../../theme/vars';

const HEIGHT = { sm: '34px', md: '42px', lg: '50px' } as const;

export const Box = styled.div<{ $invalid: boolean; $size: 'sm' | 'md' | 'lg'; $disabled: boolean }>(
  ({ $invalid, $size, $disabled }) => ({
    ...controlBox($invalid),
    height: HEIGHT[$size],
    padding: `0 ${space.md}`,
    opacity: $disabled ? 0.6 : 1,
    color: v.textMuted,
  }),
);

export const Input = styled('input', {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $mono?: boolean }>(controlText, ({ $mono }) => ({
  height: '100%',
  fontFamily: $mono ? v.font.mono : undefined,
  fontVariantNumeric: $mono ? 'tabular-nums' : undefined,
}));

export const Toggle = styled.button({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: space.xxs,
  marginRight: `-${space.xxs}`,
  border: 'none',
  borderRadius: v.radius.sm,
  background: 'transparent',
  color: v.textMuted,
  cursor: 'pointer',
  '&:hover': { color: v.text },
  '&:focus-visible': focusVisible,
});

/** Segmento fijo a la izquierda (`+57`), separado del valor por una línea. */
export const Prefix = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  marginLeft: `-${space.md}`,
  padding: `0 ${space.md}`,
  borderRight: `1px solid ${v.borderStrong}`,
  background: v.surfaceSunken,
  borderRadius: `${v.radius.md} 0 0 ${v.radius.md}`,
  color: v.textBody,
  fontFamily: v.font.base,
  fontSize: '15px',
  fontWeight: 600,
  whiteSpace: 'nowrap',
});
