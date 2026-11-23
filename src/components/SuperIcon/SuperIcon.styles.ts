import styled from '@emotion/styled';
import { motion, reducedMotion, timing } from '../../styles/motion';
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
    ...($spin ? { animation: `sd-spin ${timing('spin', 'linear')} infinite` } : {}),
    [reducedMotion]: $spin ? { animationDuration: `${motion.duration.spin * 2}ms` } : {},
  }),
);
