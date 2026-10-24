import styled from '@emotion/styled';
import { focusVisible, space, transition } from './scale';
import { v } from '../theme/vars';

/** Piezas comunes de campo (label, ayuda, error) para Input, Textarea, Dropdown… */
export const FieldRoot = styled.div<{ $fullWidth: boolean }>(({ $fullWidth }) => ({
  // Bloque: en un formulario el campo ocupa su fila (con `fullWidth`, el 100%).
  display: 'flex',
  flexDirection: 'column',
  gap: space.xs,
  width: $fullWidth ? '100%' : 'auto',
  minWidth: 0,
}));

export const FieldLabel = styled.label({
  fontFamily: v.font.base,
  fontSize: '13px',
  fontWeight: 500,
  color: v.textBody,
});

export const FieldHint = styled.p({
  margin: 0,
  fontFamily: v.font.base,
  fontSize: '13px',
  lineHeight: 1.4,
  color: v.textMuted,
});

export const FieldError = styled.p({
  margin: 0,
  fontFamily: v.font.base,
  fontSize: '13px',
  lineHeight: 1.4,
  color: v.dangerText,
});

/** Caja de control con borde, foco y estado de error. */
export const controlBox = (invalid: boolean) =>
  ({
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: v.radius.md,
    border: `1px solid ${invalid ? v.danger : v.borderStrong}`,
    background: v.surfaceField,
    color: v.text,
    transition: `border-color ${transition}, box-shadow ${transition}`,
    '&:focus-within': { ...focusVisible, borderColor: invalid ? v.danger : v.primary },
  }) as const;

export const controlText = {
  flex: 1,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: v.text,
  fontFamily: v.font.base,
  fontSize: '14px',
  '&::placeholder': { color: v.textMuted },
  '&:disabled': { cursor: 'not-allowed' },
} as const;
