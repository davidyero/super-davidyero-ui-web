import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';

const SLIDE = '260ms cubic-bezier(0.22, 1, 0.36, 1)';

// La línea base (1px) va dentro de la lista como pseudo-elemento, y el indicador
// (2px) por encima: así la tapa y ambos se desplazan con el scroll horizontal.
export const List = styled.div({
  position: 'relative',
  display: 'flex',
  gap: space.xs,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '1px',
    background: v.border,
    pointerEvents: 'none',
  },
});

/** Subrayado de la pestaña activa: se desliza a la nueva al cambiar. */
export const Indicator = styled.span<{ $animate: boolean }>(({ $animate }) => ({
  position: 'absolute',
  left: 0,
  bottom: 0,
  height: '2px',
  zIndex: 1,
  borderRadius: '2px',
  background: v.accent,
  pointerEvents: 'none',
  transition: $animate ? `transform ${SLIDE}, width ${SLIDE}` : 'none',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));

export const Tab = styled.button<{ $active: boolean; $size: 'sm' | 'md' }>(
  ({ $active, $size }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.xs,
    padding: $size === 'sm' ? `${space.xs} ${space.sm}` : `${space.sm} ${space.md}`,
    border: 'none',
    background: 'transparent',
    color: $active ? v.text : v.textMuted,
    fontFamily: v.font.base,
    fontSize: $size === 'sm' ? '13px' : '14px',
    fontWeight: $active ? 600 : 500,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: `color ${transition}`,
    '&:hover:not(:disabled)': { color: v.text },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
    '&:focus-visible': { ...focusVisible, borderRadius: v.radius.sm },
  }),
);

export const Count = styled.span<{ $active: boolean }>(({ $active }) => ({
  minWidth: '20px',
  padding: `1px ${space.xs}`,
  borderRadius: v.radius.pill,
  background: $active ? v.primarySoft : v.surfaceSunken,
  color: $active ? v.primarySoftText : v.textMuted,
  fontSize: '13px',
  fontWeight: 600,
  lineHeight: 1.4,
  textAlign: 'center',
}));
