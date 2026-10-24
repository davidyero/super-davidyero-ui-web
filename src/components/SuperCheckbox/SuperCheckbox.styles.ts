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

export const Box = styled.span<{ $checked: boolean; $invalid: boolean }>(
  ({ $checked, $invalid }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '20px',
    height: '20px',
    marginTop: '1px',
    borderRadius: v.radius.sm,
    border: `1.5px solid ${$invalid ? v.danger : $checked ? v.accent : v.borderStrong}`,
    background: $checked ? v.accent : v.surface,
    color: v.onAccent,
    transition: `background ${transition}, border-color ${transition}`,
    'input:focus-visible + &': focusVisible,
  }),
);

export const Texts = styled.span({ display: 'flex', flexDirection: 'column', gap: '2px' });
