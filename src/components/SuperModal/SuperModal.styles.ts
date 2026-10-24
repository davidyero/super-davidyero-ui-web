import styled from '@emotion/styled';
import { focusVisible, space, zIndex } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Backdrop = styled.div<{ $align: 'center' | 'top' }>(({ $align }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.modal,
  display: 'flex',
  justifyContent: 'center',
  alignItems: $align === 'center' ? 'center' : 'flex-start',
  padding: $align === 'center' ? space.lg : `10vh ${space.lg} ${space.lg}`,
  background: 'rgba(0, 0, 0, 0.45)',
  overflowY: 'auto',
}));

export const Dialog = styled.div<{ $width: number; $padded: boolean }>(({ $width, $padded }) => ({
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
}));

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
