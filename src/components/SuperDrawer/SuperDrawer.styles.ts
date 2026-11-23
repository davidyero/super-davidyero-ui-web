import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { reducedMotion, timing } from '../../styles/motion';
import { focusVisible, media, scrim, space, zIndex } from '../../styles/scale';
import { v } from '../../theme/vars';
import { fadeIn, fadeOut, scrimMotion } from '../../styles/overlayMotion';

const slideIn = keyframes({ from: { transform: 'translateX(100%)' } });
const slideOut = keyframes({ to: { transform: 'translateX(100%)' } });

export const Backdrop = styled.div<{ $closing: boolean }>(({ $closing }) => ({
  ...scrimMotion($closing),
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.modal,
  display: 'flex',
  justifyContent: 'flex-end',
  background: scrim,
}));

export const Panel = styled.div<{ $width: number; $closing: boolean }>(({ $width, $closing }) => ({
  // Entra desde la derecha en `slow` y sale en `base`; con «Reducir movimiento», fundido.
  animation: $closing
    ? `${slideOut} ${timing('base', 'in')} both`
    : `${slideIn} ${timing('slow')} both`,
  [reducedMotion]: {
    animation: `${$closing ? fadeOut : fadeIn} ${timing('fast')} both`,
  },
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  background: v.background,
  color: v.textBody,
  outline: 'none',
  [media.sm]: {
    width: `min(${$width}px, 100%)`,
    borderLeft: `1px solid ${v.border}`,
    boxShadow: v.shadow.lg,
  },
}));

export const Header = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: space.md,
  padding: `${space.xl} ${space.xl} ${space.lg}`,
});

export const Titles = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.xs,
  minWidth: 0,
  flex: 1,
});

export const Close = styled.button({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '44px',
  height: '44px',
  border: `1px solid ${v.border}`,
  borderRadius: v.radius.pill,
  background: v.surface,
  color: v.text,
  cursor: 'pointer',
  '&:hover': { background: v.surfaceSunken },
  '&:focus-visible': focusVisible,
});

export const Body = styled.div({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: `0 ${space.xl} ${space.xl}`,
});

export const Footer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: space.md,
  padding: `${space.lg} ${space.xl}`,
  borderTop: `1px solid ${v.border}`,
  background: v.surface,
});
