import { space, focusVisible, transition } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

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
var fieldErrorId = (id) => `${id}-error`;
var fieldHintId = (id) => `${id}-hint`;
var describedBy = (id, error, hint, ...extra) => {
  const own = error ? fieldErrorId(id) : hint ? fieldHintId(id) : void 0;
  return [own, ...extra].filter(Boolean).join(" ") || void 0;
};
var FieldMessage = ({
  id,
  error,
  hint
}) => {
  if (error)
    return /* @__PURE__ */ jsx(FieldError, { id: fieldErrorId(id), role: "alert", children: error });
  if (hint) return /* @__PURE__ */ jsx(FieldHint, { id: fieldHintId(id), children: hint });
  return null;
};
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
  // En pantallas táctiles, 16px: con menos, iOS amplía la página al enfocar el campo
  // y no la devuelve a su tamaño.
  "@media (pointer: coarse)": { fontSize: "16px" },
  "&::placeholder": { color: v.textMuted },
  "&:disabled": { cursor: "not-allowed" }
};

export { FieldLabel, FieldMessage, FieldRoot, controlBox, controlText, describedBy };
