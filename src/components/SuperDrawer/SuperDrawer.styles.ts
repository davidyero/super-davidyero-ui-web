import styled from '@emotion/styled';
import { focusVisible, media, space, zIndex } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Backdrop = styled.div({
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.modal,
  display: 'flex',
  justifyContent: 'flex-end',
  background: 'rgba(42, 33, 30, 0.38)',
});

export const Panel = styled.div<{ $width: number }>(({ $width }) => ({
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
