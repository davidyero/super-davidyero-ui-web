import styled from '@emotion/styled';
import { space } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Shimmer = styled.span<{ $w: string; $h: string; $round: boolean }>(
  ({ $w, $h, $round }) => ({
    display: 'block',
    width: $w,
    height: $h,
    borderRadius: $round ? '50%' : v.radius.sm,
    // border/borderStrong y no surfaceSunken: sobre `surface` oscuro el sunken casi
    // no se distingue y el esqueleto desaparecía.
    background: `linear-gradient(90deg, ${v.border} 25%, ${v.borderStrong} 37%, ${v.border} 63%)`,
    backgroundSize: '400% 100%',
    animation: 'sd-shimmer 1.4s ease infinite',
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  }),
);

export const Lines = styled.span({ display: 'flex', flexDirection: 'column', gap: space.sm });
