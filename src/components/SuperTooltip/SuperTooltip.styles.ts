import styled from '@emotion/styled';
import { space, transition, zIndex } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Wrap = styled.span({
  position: 'relative',
  display: 'inline-flex',
  '&:hover > [role="tooltip"], &:focus-within > [role="tooltip"]': {
    opacity: 1,
    visibility: 'visible',
  },
});

export const Bubble = styled.span<{ $placement: 'top' | 'bottom' }>(({ $placement }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  ...($placement === 'top'
    ? { bottom: `calc(100% + ${space.xs})` }
    : { top: `calc(100% + ${space.xs})` }),
  zIndex: zIndex.dropdown,
  padding: `${space.xxs} ${space.sm}`,
  borderRadius: v.radius.sm,
  background: v.surfaceElevated,
  border: `1px solid ${v.border}`,
  boxShadow: v.shadow.md,
  color: v.text,
  fontFamily: v.font.base,
  fontSize: '13px',
  lineHeight: 1.35,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  opacity: 0,
  visibility: 'hidden',
  transition: `opacity ${transition}`,
}));
