import styled from '@emotion/styled';
import { zIndex } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Backdrop = styled.div({
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.overlay,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `color-mix(in srgb, ${v.background} 70%, transparent)`,
  backdropFilter: 'blur(2px)',
  cursor: 'progress',
});
