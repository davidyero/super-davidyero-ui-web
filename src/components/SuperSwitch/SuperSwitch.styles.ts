import styled from '@emotion/styled';
import { reducedMotion, timing } from '../../styles/motion';
import { focusVisible, transition } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Track = styled.span<{ $checked: boolean }>(({ $checked }) => ({
  position: 'relative',
  flexShrink: 0,
  width: '38px',
  height: '22px',
  borderRadius: v.radius.pill,
  background: $checked ? v.accent : v.borderStrong,
  transition: `background ${transition}`,
  'input:focus-visible + &': focusVisible,
}));

export const Thumb = styled.span<{ $checked: boolean }>(({ $checked }) => ({
  position: 'absolute',
  top: '3px',
  left: '3px',
  transform: $checked ? 'translateX(16px)' : 'none',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  background: $checked ? v.onAccent : v.surface,
  boxShadow: v.shadow.sm,
  transition: `transform ${timing('fast', 'overshoot')}, background ${transition}`,
  [reducedMotion]: { transition: `background ${transition}` },
}));
