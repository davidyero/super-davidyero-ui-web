import styled from '@emotion/styled';
import { v } from '../../theme/vars';
import type { IconColor } from './SuperIcon.types';

export const iconColor = (color: IconColor): string =>
  color === 'inherit' ? 'currentColor' : v[color];

export const IconWrap = styled.span<{ $spin: boolean; $size: number; $color: IconColor }>(
  ({ $spin, $size, $color }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: `${$size}px`,
    height: `${$size}px`,
    color: iconColor($color),
    ...($spin ? { animation: 'sd-spin 0.9s linear infinite' } : {}),
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  }),
);
