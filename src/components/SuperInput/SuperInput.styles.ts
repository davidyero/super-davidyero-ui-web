import styled from '@emotion/styled';
import { controlBox, controlText } from '../../styles/field';
import { focusVisible, space } from '../../styles/scale';
import { v } from '../../theme/vars';

const HEIGHT = { sm: '34px', md: '42px', lg: '50px' } as const;

export const Box = styled.div<{ $invalid: boolean; $size: 'sm' | 'md' | 'lg'; $disabled: boolean }>(
  ({ $invalid, $size, $disabled }) => ({
    ...controlBox($invalid),
    height: HEIGHT[$size],
    padding: `0 ${space.md}`,
    opacity: $disabled ? 0.6 : 1,
    color: v.textMuted,
  }),
);

export const Input = styled.input(controlText, { height: '100%' });

export const Toggle = styled.button({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: space.xxs,
  marginRight: `-${space.xxs}`,
  border: 'none',
  borderRadius: v.radius.sm,
  background: 'transparent',
  color: v.textMuted,
  cursor: 'pointer',
  '&:hover': { color: v.text },
  '&:focus-visible': focusVisible,
});
