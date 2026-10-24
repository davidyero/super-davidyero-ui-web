import styled from '@emotion/styled';
import { v } from '../../theme/vars';

export const Circle = styled.span<{ $size: number }>(({ $size }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: `${$size}px`,
  height: `${$size}px`,
  borderRadius: '50%',
  overflow: 'hidden',
  background: v.primarySoft,
  color: v.primarySoftText,
  fontFamily: v.font.base,
  fontWeight: 700,
  fontSize: `${Math.max(13, Math.round($size * 0.4))}px`,
  lineHeight: 1,
  userSelect: 'none',
}));

export const Img = styled.img({ width: '100%', height: '100%', objectFit: 'cover' });
