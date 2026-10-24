import { space, focusVisible, transition } from './chunk-OJWPWQVY.js';
import { v } from './chunk-BSDVG7PM.js';
import styled from '@emotion/styled';

var FieldRoot = styled.div(({ $fullWidth }) => ({
  display: "inline-flex",
  flexDirection: "column",
  gap: space.xs,
  width: $fullWidth ? "100%" : "auto",
  minWidth: 0
}));
var FieldLabel = styled.label({
  fontFamily: v.font.base,
  fontSize: "13px",
  fontWeight: 600,
  color: v.text
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
  background: v.surface,
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
