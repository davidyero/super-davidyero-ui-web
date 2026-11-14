import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { breakpoints, focusVisible, scrim, space, zIndex } from '../../styles/scale';
import { v } from '../../theme/vars';

/** Por debajo de `md` (móvil y Fold) el modal con `mobileSheet` sube desde abajo. */
const belowMd = `@media (max-width: ${breakpoints.md - 1}px)`;
const reduced = '@media (prefers-reduced-motion: reduce)';

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
});

export const Backdrop = styled.div<{ $align: 'center' | 'top'; $sheet: boolean }>(
  ({ $align, $sheet }) => ({
    position: 'fixed',
    inset: 0,
    zIndex: zIndex.modal,
    display: 'flex',
    justifyContent: 'center',
    alignItems: $align === 'center' ? 'center' : 'flex-start',
    padding: $align === 'center' ? space.lg : `10vh ${space.lg} ${space.lg}`,
    background: scrim,
    overflowY: 'auto',
    ...($sheet ? { [belowMd]: { alignItems: 'flex-end', padding: `${space.xl} 0 0` } } : {}),
  }),
);

export const Dialog = styled.div<{ $width: number; $padded: boolean; $sheet: boolean }>(
  ({ $width, $padded, $sheet }) => ({
    width: '100%',
    maxWidth: `${$width}px`,
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: v.radius.lg,
    background: v.surfaceElevated,
    border: `1px solid ${v.border}`,
    boxShadow: v.shadow.lg,
    color: v.textBody,
    outline: 'none',
    '& > [data-sd-modal-body]': { padding: $padded ? `0 ${space.xl} ${space.xl}` : 0 },
    ...($sheet
      ? {
          [belowMd]: {
            maxWidth: 'none',
            maxHeight: '90dvh',
            borderRadius: `${v.radius.lg} ${v.radius.lg} 0 0`,
            borderBottom: 'none',
            paddingBottom: 'env(safe-area-inset-bottom)',
            animation: `${slideUp} 220ms ease-out`,
            '& > [data-sd-modal-header]': { padding: `${space.md} ${space.lg}` },
            '& > [data-sd-modal-body]': {
              padding: $padded ? `0 ${space.lg} ${space.lg}` : 0,
            },
            [reduced]: { animation: 'none' },
          },
        }
      : {}),
  }),
);

/** Asa del bottom sheet: solo se ve en móvil. */
export const Grabber = styled.div({
  display: 'none',
  [belowMd]: {
    display: 'block',
    flexShrink: 0,
    width: '40px',
    height: '4px',
    margin: `${space.sm} auto 0`,
    borderRadius: v.radius.pill,
    background: v.border,
  },
});

export const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space.md,
  padding: `${space.lg} ${space.xl}`,
});

export const Body = styled.div({ overflowY: 'auto', minHeight: 0 });

export const Footer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  gap: space.sm,
  padding: `${space.md} ${space.xl} ${space.lg}`,
  borderTop: `1px solid ${v.border}`,
});

export const Close = styled.button({
  display: 'inline-flex',
  marginLeft: 'auto',
  padding: space.xxs,
  border: 'none',
  borderRadius: v.radius.sm,
  background: 'transparent',
  color: v.textMuted,
  cursor: 'pointer',
  '&:hover': { color: v.text },
  '&:focus-visible': focusVisible,
});
