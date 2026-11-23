import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, reducedMotion, timing } from '../../styles/motion';
import { controlBox, controlText } from '../../styles/field';
import { focusVisible, space } from '../../styles/scale';
import { v } from '../../theme/vars';

const HEIGHT = { sm: '34px', md: '42px', lg: '50px' } as const;

const d = motion.shake.distance;
/** Una sacudida: ±6 px en 4 pasos. */
const shake = keyframes({
  '25%': { transform: `translateX(-${d}px)` },
  '50%': { transform: `translateX(${d}px)` },
  '75%': { transform: `translateX(-${d}px)` },
  '100%': { transform: 'translateX(0)' },
});

export const Box = styled.div<{
  $invalid: boolean;
  $size: 'sm' | 'md' | 'lg';
  $disabled: boolean;
  $shaking: boolean;
}>(({ $invalid, $size, $disabled, $shaking }) => ({
  ...controlBox($invalid),
  height: HEIGHT[$size],
  padding: `0 ${space.md}`,
  opacity: $disabled ? 0.6 : 1,
  color: v.textMuted,
  animation: $shaking ? `${shake} ${timing('slow', 'linear')}` : undefined,
  // Con «Reducir movimiento» no se mueve: el error se ve por el borde y el mensaje.
  [reducedMotion]: { animation: 'none' },
}));

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
