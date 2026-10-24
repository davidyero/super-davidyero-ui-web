import styled from '@emotion/styled';
import { controlBox, controlText } from '../../styles/field';
import { space } from '../../styles/scale';
import { v } from '../../theme/vars';

const HEIGHT = { sm: '34px', md: '42px', lg: '50px' } as const;

export const Box = styled.div<{ $invalid: boolean; $size: 'sm' | 'md' | 'lg'; $disabled: boolean }>(
  ({ $invalid, $size, $disabled }) => ({
    ...controlBox($invalid),
    position: 'relative',
    height: HEIGHT[$size],
    opacity: $disabled ? 0.6 : 1,
  }),
);

export const Select = styled.select(controlText, {
  height: '100%',
  padding: `0 36px 0 ${space.md}`,
  appearance: 'none',
  cursor: 'pointer',
  '& option': { background: v.surface, color: v.text },
});

export const Chevron = styled.span({
  position: 'absolute',
  right: space.md,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'inline-flex',
  pointerEvents: 'none',
  color: v.textMuted,
});
