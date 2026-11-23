import { controlBox, controlText, FieldRoot, FieldLabel, FieldMessage, describedBy } from './chunk-S3WIIN6X.js';
import { SuperIcon } from './chunk-5FQD532Q.js';
import { useSuperLabels } from './chunk-2OYI3VCV.js';
import { space, focusVisible } from './chunk-HF3T4CF3.js';
import { motion, reducedMotion, timing } from './chunk-KETZYNAG.js';
import { v } from './chunk-VQ2WXUA7.js';
import { forwardRef, useId, useState } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var HEIGHT = { sm: "34px", md: "42px", lg: "50px" };
var d = motion.shake.distance;
var shake = keyframes({
  "25%": { transform: `translateX(-${d}px)` },
  "50%": { transform: `translateX(${d}px)` },
  "75%": { transform: `translateX(-${d}px)` },
  "100%": { transform: "translateX(0)" }
});
var Box = styled.div(({ $invalid, $size, $disabled, $shaking }) => ({
  ...controlBox($invalid),
  height: HEIGHT[$size],
  padding: `0 ${space.md}`,
  opacity: $disabled ? 0.6 : 1,
  color: v.textMuted,
  animation: $shaking ? `${shake} ${timing("slow", "linear")}` : void 0,
  // Con «Reducir movimiento» no se mueve: el error se ve por el borde y el mensaje.
  [reducedMotion]: { animation: "none" }
}));
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
var Prefix = styled.span({
  display: "inline-flex",
  alignItems: "center",
  alignSelf: "stretch",
  marginLeft: `-${space.md}`,
  padding: `0 ${space.md}`,
  borderRight: `1px solid ${v.borderStrong}`,
  background: v.surfaceSunken,
  borderRadius: `${v.radius.md} 0 0 ${v.radius.md}`,
  color: v.textBody,
  fontFamily: v.font.base,
  fontSize: "15px",
  fontWeight: 600,
  whiteSpace: "nowrap"
});
var useSuperInput = ({
  id,
  type,
  error,
  hint,
  ariaDescribedBy,
  invalid,
  shakeKey
}) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const describedBy2 = describedBy(inputId, error, hint, ariaDescribedBy);
  const trigger = error || invalid ? `${error ?? ""}|${shakeKey ?? ""}|${invalid ? 1 : 0}` : "";
  const [lastTrigger, setLastTrigger] = useState(trigger);
  const [shaking, setShaking] = useState(false);
  if (trigger !== lastTrigger) {
    setLastTrigger(trigger);
    if (trigger) setShaking(true);
  }
  return {
    inputId,
    isPassword,
    revealed,
    toggleReveal: () => setRevealed((r) => !r),
    effectiveType: isPassword && revealed ? "text" : type,
    describedBy: describedBy2,
    shaking,
    stopShaking: () => setShaking(false)
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
  shakeKey,
  prefix,
  id,
  type = "text",
  disabled,
  className,
  ...rest
}, ref) {
  const labels = useSuperLabels();
  const {
    inputId,
    isPassword,
    revealed,
    toggleReveal,
    effectiveType,
    describedBy: describedBy2,
    shaking,
    stopShaking
  } = useSuperInput({
    id,
    type,
    error,
    hint,
    ariaDescribedBy: rest["aria-describedby"],
    invalid,
    shakeKey
  });
  return /* @__PURE__ */ jsxs(FieldRoot, { $fullWidth: fullWidth, className, children: [
    label ? /* @__PURE__ */ jsx(FieldLabel, { htmlFor: inputId, children: label }) : null,
    /* @__PURE__ */ jsxs(
      Box,
      {
        $invalid: Boolean(error) || invalid,
        $size: size,
        $disabled: Boolean(disabled),
        $shaking: shaking,
        onAnimationEnd: (event) => {
          if (event.target === event.currentTarget) stopShaking();
        },
        children: [
          prefix ? /* @__PURE__ */ jsx(Prefix, { "aria-hidden": "true", children: prefix }) : null,
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
              "aria-describedby": describedBy2
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
        ]
      }
    ),
    /* @__PURE__ */ jsx(FieldMessage, { id: inputId, error, hint })
  ] });
});

export { SuperInput };
