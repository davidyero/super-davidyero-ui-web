import styled from '@emotion/styled';
import { focusVisible, slide, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';

type Variant = 'default' | 'icon';
type Size = 'sm' | 'md';

const reduceMotion = '@media (prefers-reduced-motion: reduce)';

const iconSide = (size: Size): string => (size === 'sm' ? '36px' : '44px');

export const Track = styled.div<{ $fullWidth: boolean; $variant: Variant }>(
  ({ $fullWidth, $variant }) => ({
    position: 'relative',
    display: $fullWidth ? 'flex' : 'inline-flex',
    width: $fullWidth ? '100%' : undefined,
    maxWidth: '100%',
    gap: space.xxs,
    padding: space.xxs,
    border: `1px solid ${v.border}`,
    borderRadius: v.radius.pill,
    background: $variant === 'icon' ? v.surfaceSunken : v.surface,
    overflowX: 'auto',
    scrollbarWidth: 'none',
  }),
);

/** Fondo de la opción activa: se desliza de una opción a otra al cambiar. */
export const Thumb = styled.span<{ $variant: Variant; $animate: boolean }>(
  ({ $variant, $animate }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: v.radius.pill,
    background: $variant === 'icon' ? v.surface : v.text,
    boxShadow: $variant === 'icon' ? v.shadow.sm : 'none',
    pointerEvents: 'none',
    transition: $animate ? `transform ${slide}, width ${slide}` : 'none',
    [reduceMotion]: { transition: 'none' },
  }),
);

export const Option = styled.button<{
  $active: boolean;
  $size: Size;
  $fullWidth: boolean;
  $variant: Variant;
}>(({ $active, $size, $fullWidth, $variant }) => ({
  position: 'relative',
  zIndex: 1,
  flex: $fullWidth ? '1 1 0' : '0 0 auto',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space.xs,
  minHeight: $size === 'sm' ? '36px' : '44px',
  minWidth: $variant === 'icon' ? iconSide($size) : undefined,
  padding: $variant === 'icon' ? 0 : `0 ${$size === 'sm' ? space.md : space.lg}`,
  border: 'none',
  borderRadius: v.radius.pill,
  // El fondo de la activa lo pone el Thumb; aquí solo el color del texto.
  background: 'transparent',
  color: $active ? v.surface : v.textBody,
  fontFamily: v.font.base,
  fontSize: '14px',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: `color ${transition}`,
  '&:hover:not(:disabled)': { color: $active ? v.surface : v.text },
  '&:disabled': { opacity: 0.55, cursor: 'not-allowed' },
  '&:focus-visible': focusVisible,
  ...($variant === 'icon' && {
    color: v.text,
    '& > svg': {
      opacity: $active ? 1 : 0.55,
      filter: $active ? 'none' : 'saturate(0.4)',
      transform: $active ? 'scale(1)' : 'scale(0.86)',
      transition: `opacity ${slide}, filter ${slide}, transform ${slide}`,
    },
    '&:hover:not(:disabled) > svg': { opacity: 1, filter: 'none' },
    [reduceMotion]: { '& > svg': { transition: 'none' } },
  }),
}));
