import { space, focusVisible, transition } from './chunk-UD6QNXPQ.js';
import { v } from './chunk-TRHOZRUW.js';
import styled from '@emotion/styled';

var FieldRoot = styled.div(({ $fullWidth }) => ({
  // Bloque: en un formulario el campo ocupa su fila (con `fullWidth`, el 100%).
  display: "flex",
  flexDirection: "column",
  gap: space.xs,
  width: $fullWidth ? "100%" : "auto",
  minWidth: 0
}));
var FieldLabel = styled.label({
  fontFamily: v.font.base,
  fontSize: "13px",
  fontWeight: 500,
  color: v.textBody
});
var FieldHint = styled.p({
  margin: 0,
  fontFamily: v.font.base,
  fontSize: "13px",
  lineHeight: 1.4,
  color: v.textMuted
});
var FieldError = styled.p({
  margin: 0,
  fontFamily: v.font.base,
  fontSize: "13px",
  lineHeight: 1.4,
  color: v.dangerText
});
var controlBox = (invalid) => ({
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  width: "100%",
  boxSizing: "border-box",
  borderRadius: v.radius.md,
  border: `1px solid ${invalid ? v.danger : v.borderStrong}`,
  background: v.surfaceField,
  color: v.text,
  transition: `border-color ${transition}, box-shadow ${transition}`,
  "&:focus-within": { ...focusVisible, borderColor: invalid ? v.danger : v.primary }
});
var controlText = {
  flex: 1,
  minWidth: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  color: v.text,
  fontFamily: v.font.base,
  fontSize: "14px",
  "&::placeholder": { color: v.textMuted },
  "&:disabled": { cursor: "not-allowed" }
};

export { FieldError, FieldHint, FieldLabel, FieldRoot, controlBox, controlText };
