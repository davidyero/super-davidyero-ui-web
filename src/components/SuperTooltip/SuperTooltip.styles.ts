import styled from '@emotion/styled';
import { space, transition, zIndex } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { TooltipPlacement } from './SuperTooltip.types';

export const Wrap = styled.span({
  position: 'relative',
  display: 'inline-flex',
  '&:hover > [role="tooltip"], &:focus-within > [role="tooltip"]': {
    opacity: 1,
    visibility: 'visible',
  },
});

const PLACEMENT: Record<TooltipPlacement, Record<string, string>> = {
  top: { left: '50%', transform: 'translateX(-50%)', bottom: `calc(100% + ${space.xs})` },
  bottom: { left: '50%', transform: 'translateX(-50%)', top: `calc(100% + ${space.xs})` },
  right: { top: '50%', transform: 'translateY(-50%)', left: `calc(100% + ${space.sm})` },
};

export const Bubble = styled.span<{ $placement: TooltipPlacement }>(({ $placement }) => ({
  position: 'absolute',
  ...PLACEMENT[$placement],
  zIndex: zIndex.tooltip,
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
