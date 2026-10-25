import { controlBox, controlText, FieldRoot, FieldLabel, FieldError, FieldHint } from './chunk-ZNUXLCOE.js';
import { SuperIcon } from './chunk-ZLC5VFBD.js';
import { useSuperLabels } from './chunk-V6RXFFM7.js';
import { space, focusVisible } from './chunk-BJDG5RNM.js';
import { v } from './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import { forwardRef, useId, useState } from 'react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var HEIGHT = { sm: "34px", md: "42px", lg: "50px" };
var Box = styled.div(
  ({ $invalid, $size, $disabled }) => ({
    ...controlBox($invalid),
    height: HEIGHT[$size],
    padding: `0 ${space.md}`,
    opacity: $disabled ? 0.6 : 1,
    color: v.textMuted
  })
);
var Input = styled("input", {
  shouldForwardProp: (prop) => !prop.startsWith("$")
})(controlText, ({ $mono }) => ({
  height: "100%",
  fontFamily: $mono ? v.font.mono : void 0,
  fontVariantNumeric: $mono ? "tabular-nums" : void 0
}));
var Toggle = styled.button({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: space.xxs,
  marginRight: `-${space.xxs}`,
  border: "none",
  borderRadius: v.radius.sm,
  background: "transparent",
  color: v.textMuted,
  cursor: "pointer",
  "&:hover": { color: v.text },
  "&:focus-visible": focusVisible
});
var useSuperInput = ({ id, type, error, hint }) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const describedBy = [error ? `${inputId}-error` : null, !error && hint ? `${inputId}-hint` : null].filter(Boolean).join(" ") || void 0;
  return {
    inputId,
    isPassword,
    revealed,
    toggleReveal: () => setRevealed((r) => !r),
    effectiveType: isPassword && revealed ? "text" : type,
    describedBy
  };
};
var SuperInput = forwardRef(function SuperInput2({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  size = "md",
  fullWidth = false,
  invalid = false,
  mono = false,
  onClear,
  id,
  type = "text",
  disabled,
  className,
  ...rest
}, ref) {
  const labels = useSuperLabels();
  const { inputId, isPassword, revealed, toggleReveal, effectiveType, describedBy } = useSuperInput(
    { id, type, error, hint }
  );
  return /* @__PURE__ */ jsxs(FieldRoot, { $fullWidth: fullWidth, className, children: [
    label ? /* @__PURE__ */ jsx(FieldLabel, { htmlFor: inputId, children: label }) : null,
    /* @__PURE__ */ jsxs(Box, { $invalid: Boolean(error) || invalid, $size: size, $disabled: Boolean(disabled), children: [
      leftIcon ? /* @__PURE__ */ jsx(SuperIcon, { name: leftIcon, size: 18 }) : null,
      /* @__PURE__ */ jsx(
        Input,
        {
          ...rest,
          ref,
          id: inputId,
          type: effectiveType,
          disabled,
          $mono: mono,
          "aria-invalid": error || invalid ? true : void 0,
          "aria-describedby": describedBy
        }
      ),
      isPassword ? /* @__PURE__ */ jsx(
        Toggle,
        {
          type: "button",
          onClick: toggleReveal,
          "aria-label": revealed ? labels.hidePassword : labels.showPassword,
          "aria-pressed": revealed,
          "aria-controls": inputId,
          disabled,
          children: /* @__PURE__ */ jsx(SuperIcon, { name: revealed ? "eyeOff" : "eye", size: 18 })
        }
      ) : onClear && rest.value !== void 0 && rest.value !== "" ? /* @__PURE__ */ jsx(
        Toggle,
        {
          type: "button",
          onClick: onClear,
          "aria-label": labels.clear ?? labels.close,
          disabled,
          children: /* @__PURE__ */ jsx(SuperIcon, { name: "close", size: 18 })
        }
      ) : rightIcon ? /* @__PURE__ */ jsx(SuperIcon, { name: rightIcon, size: 18 }) : null
    ] }),
    error ? /* @__PURE__ */ jsx(FieldError, { id: `${inputId}-error`, role: "alert", children: error }) : hint ? /* @__PURE__ */ jsx(FieldHint, { id: `${inputId}-hint`, children: hint }) : null
  ] });
});

export { SuperInput };
