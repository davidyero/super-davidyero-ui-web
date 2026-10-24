import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Wrap = styled.label<{ $disabled: boolean }>(({ $disabled }) => ({
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: space.sm,
  cursor: $disabled ? 'not-allowed' : 'pointer',
  opacity: $disabled ? 0.55 : 1,
  userSelect: 'none',
}));

export const HiddenInput = styled.input({
  position: 'absolute',
  opacity: 0,
  width: '1px',
  height: '1px',
  margin: 0,
});

export const Track = styled.span<{ $checked: boolean }>(({ $checked }) => ({
  position: 'relative',
  flexShrink: 0,
  width: '38px',
  height: '22px',
  borderRadius: v.radius.pill,
  background: $checked ? v.primary : v.borderStrong,
  transition: `background ${transition}`,
  'input:focus-visible + &': focusVisible,
}));

export const Thumb = styled.span<{ $checked: boolean }>(({ $checked }) => ({
  position: 'absolute',
  top: '3px',
  left: $checked ? '19px' : '3px',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  background: $checked ? v.onPrimary : v.surface,
  boxShadow: v.shadow.sm,
  transition: `left ${transition}`,
}));

export const Texts = styled.span({ display: 'flex', flexDirection: 'column', gap: '2px' });
