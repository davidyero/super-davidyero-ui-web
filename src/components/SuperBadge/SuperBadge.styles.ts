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

export const BadgeRoot = styled.span<{ $tone: BadgeTone; $size: BadgeSize; $mono: boolean }>(
  ({ $tone, $size, $mono }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.xxs,
    maxWidth: '100%',
    height: $size === 'sm' ? '22px' : '26px',
    padding: `0 ${$size === 'sm' ? space.xs : space.sm}`,
    borderRadius: v.radius.pill,
    fontFamily: $mono ? v.font.mono : v.font.base,
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    background: TONE[$tone].background,
    color: TONE[$tone].color,
  }),
);

export const Dot = styled.span<{ $tone: BadgeTone }>(({ $tone }) => ({
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  flexShrink: 0,
  background: TONE[$tone].dot,
}));

export const Label = styled.span({ overflow: 'hidden', textOverflow: 'ellipsis' });
