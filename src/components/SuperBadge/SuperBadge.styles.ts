import styled from '@emotion/styled';
import { space } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { BadgeSize, BadgeTone } from './SuperBadge.types';

// Cada fondo soft con su token de texto (regla de contraste).
export const TONE: Record<BadgeTone, { background: string; color: string; dot: string }> = {
  neutral: { background: v.surfaceSunken, color: v.textBody, dot: v.textMuted },
  primary: { background: v.primarySoft, color: v.primarySoftText, dot: v.primary },
  success: { background: v.successSoft, color: v.successText, dot: v.success },
  warning: { background: v.warningSoft, color: v.warningText, dot: v.warning },
  danger: { background: v.dangerSoft, color: v.dangerText, dot: v.danger },
  info: { background: v.infoSoft, color: v.infoText, dot: v.info },
};

export const BadgeRoot = styled.span<{
  $tone: BadgeTone;
  $size: BadgeSize;
  $mono: boolean;
  $wrap: boolean;
}>(({ $tone, $size, $mono, $wrap }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space.xxs,
  maxWidth: '100%',
  minHeight: $size === 'sm' ? '22px' : '26px',
  height: $wrap ? 'auto' : undefined,
  padding: `0 ${$size === 'sm' ? space.xs : space.sm}`,
  borderRadius: v.radius.pill,
  fontFamily: $mono ? v.font.mono : v.font.base,
  fontSize: '13px',
  fontWeight: 600,
  lineHeight: $wrap ? 1.35 : 1,
  whiteSpace: $wrap ? 'normal' : 'nowrap',
  paddingBlock: $wrap ? '3px' : 0,
  background: TONE[$tone].background,
  color: TONE[$tone].color,
}));

export const Dot = styled.span<{ $tone: BadgeTone }>(({ $tone }) => ({
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  flexShrink: 0,
  background: TONE[$tone].dot,
}));

export const Label = styled.span({ overflow: 'hidden', textOverflow: 'ellipsis' });

export const Remove = styled.button({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginInlineEnd: '-4px',
  padding: 0,
  border: 0,
  borderRadius: v.radius.pill,
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  '&:focus-visible': { outline: `2px solid ${v.focusRing}`, outlineOffset: '1px' },
});
