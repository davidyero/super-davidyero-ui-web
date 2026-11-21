import styled from '@emotion/styled';
import { fontWeight, space } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { SuperBrandSize } from './SuperBrand.types';

export const LOGO_PX: Record<SuperBrandSize, number> = { sm: 28, md: 36 };

export const Root = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space.xs,
  minWidth: 0,
  maxWidth: '100%',
});

/** Hueco cuadrado del logo: el SVG de la app lo llena entero. */
export const LogoBox = styled('span', {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $size: SuperBrandSize }>(({ $size }) => ({
  display: 'inline-flex',
  flexShrink: 0,
  width: LOGO_PX[$size],
  height: LOGO_PX[$size],
  '& > svg, & > img': { width: '100%', height: '100%', display: 'block' },
}));

/** Logo por defecto: la inicial sobre el color de marca. */
export const Initial = styled('span', {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $size: SuperBrandSize }>(({ $size }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  borderRadius: $size === 'md' ? 10 : 8,
  background: v.primary,
  color: v.onPrimary,
  fontWeight: fontWeight.bold,
  fontSize: $size === 'md' ? 18 : 15,
  lineHeight: 1,
}));
