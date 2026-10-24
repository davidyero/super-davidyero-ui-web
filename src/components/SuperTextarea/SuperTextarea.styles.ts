import styled from '@emotion/styled';
import { controlBox, controlText } from '../../styles/field';
import { space } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Box = styled.div<{ $invalid: boolean; $disabled: boolean }>(
  ({ $invalid, $disabled }) => ({
    ...controlBox($invalid),
    padding: `${space.sm} ${space.md}`,
    opacity: $disabled ? 0.6 : 1,
  }),
);

export const Area = styled.textarea<{ $mono: boolean }>(controlText, ({ $mono }) => ({
  minHeight: '96px',
  resize: 'vertical',
  lineHeight: 1.5,
  ...($mono ? { fontFamily: v.font.mono } : {}),
}));

export const Footer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  gap: space.sm,
});

export const Count = styled.span<{ $over: boolean }>(({ $over }) => ({
  marginLeft: 'auto',
  fontFamily: v.font.mono,
  fontSize: '13px',
  color: $over ? v.dangerText : v.textMuted,
}));
