import styled from '@emotion/styled';
import { v } from '../../theme/vars';
import { space } from '../../styles/scale';
import type { LoaderLayout, LoaderSize } from './SuperLoader.types';

export const Center = styled.div<{ $layout: Exclude<LoaderLayout, 'inline'> }>(({ $layout }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: space.xl,
  minHeight: $layout === 'page' ? '60vh' : undefined,
}));

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
      color: $color === 'primary' ? v.accent : 'currentColor',
      animation: 'sd-spin 0.75s linear infinite',
      '@media (prefers-reduced-motion: reduce)': { animationDuration: '1.6s' },
    };
  },
);
