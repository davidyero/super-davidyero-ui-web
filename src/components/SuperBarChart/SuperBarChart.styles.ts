import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { BarChartTone } from './SuperBarChart.types';

const FILL: Record<BarChartTone, string> = {
  primary: v.primary,
  accent: v.accent,
  success: v.success,
  info: v.info,
};

/** Alto de la barra: visible en móvil sin parecer un botón. */
export const BAR_HEIGHT = '10px';

export const List = styled.div<{ $maxHeight?: string }>(({ $maxHeight }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: space.xxs,
  minWidth: 0,
  maxHeight: $maxHeight,
  overflowY: $maxHeight ? 'auto' : undefined,
}));

export const Row = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.xs,
  padding: `${space.xs} ${space.sm}`,
  borderRadius: v.radius.sm,
  minWidth: 0,
  transition: `background ${transition}`,
  '&:hover, &:focus-within': { background: v.surfaceSunken },
  '&:hover [data-sd-bar-fill]': { opacity: 0.85 },
});

export const RowHead = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space.sm,
  minWidth: 0,
});

export const Name = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space.xs,
  minWidth: 0,
  color: v.textBody,
});

export const Track = styled.span({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: BAR_HEIGHT,
  borderRadius: v.radius.pill,
  // border y no surfaceSunken: la fila al pasar el ratón ya usa surfaceSunken.
  background: v.border,
  overflow: 'hidden',
  '&:focus-visible': focusVisible,
});

export const Fill = styled.span<{ $tone: BarChartTone; $pct: number }>(({ $tone, $pct }) => ({
  display: 'block',
  height: '100%',
  width: `${$pct}%`,
  borderRadius: v.radius.pill,
  background: FILL[$tone],
  transition: 'width 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms ease',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));
