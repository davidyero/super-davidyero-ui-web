import styled from '@emotion/styled';
import { space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { ProgressTone } from './SuperProgressBar.types';

const FILL: Record<ProgressTone, string> = {
  primary: v.primary,
  success: v.success,
  warning: v.warning,
  danger: v.danger,
  info: v.info,
};

export const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: space.sm,
  width: '100%',
});

export const Track = styled.div<{ $size: 'sm' | 'md' }>(({ $size }) => ({
  flex: 1,
  height: $size === 'sm' ? '6px' : '10px',
  borderRadius: v.radius.pill,
  background: v.surfaceSunken,
  overflow: 'hidden',
}));

export const Fill = styled.div<{ $pct: number; $tone: ProgressTone }>(({ $pct, $tone }) => ({
  width: `${$pct}%`,
  height: '100%',
  borderRadius: 'inherit',
  background: FILL[$tone],
  transition: `width ${transition}`,
}));

export const Value = styled.span({
  minWidth: '40px',
  textAlign: 'right',
  fontFamily: v.font.mono,
  fontSize: '13px',
  color: v.textMuted,
});
