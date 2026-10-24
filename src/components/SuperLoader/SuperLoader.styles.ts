import styled from '@emotion/styled';
import { v } from '../../theme/vars';
import type { LoaderSize } from './SuperLoader.types';

export const LOADER_PX: Record<LoaderSize, number> = { sm: 16, md: 24, lg: 40 };

export const Spinner = styled.span<{ $size: LoaderSize; $color: 'primary' | 'inherit' }>(
  ({ $size, $color }) => {
    const px = LOADER_PX[$size];
    return {
      display: 'inline-block',
      flexShrink: 0,
      width: `${px}px`,
      height: `${px}px`,
      borderRadius: '50%',
      border: `${Math.max(2, Math.round(px / 10))}px solid currentColor`,
      borderRightColor: 'transparent',
      color: $color === 'primary' ? v.primary : 'currentColor',
      animation: 'sd-spin 0.75s linear infinite',
      '@media (prefers-reduced-motion: reduce)': { animationDuration: '1.6s' },
    };
  },
);
