import { controlBox, controlText, FieldRoot, FieldLabel, FieldError, FieldHint } from './chunk-AWXBPRQM.js';
import { SuperIcon } from './chunk-F73VLIRK.js';
import './chunk-XMET5A6D.js';
import { space } from './chunk-UD6QNXPQ.js';
import { v } from './chunk-TRHOZRUW.js';
import './chunk-5HHPKIMZ.js';
import { useId } from 'react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var HEIGHT = { sm: "34px", md: "42px", lg: "50px" };
var Box = styled.div(
  ({ $invalid, $size, $disabled }) => ({
    ...controlBox($invalid),
    position: "relative",
    height: HEIGHT[$size],
    opacity: $disabled ? 0.6 : 1
  })
);
var Select = styled.select(controlText, {
  height: "100%",
  padding: `0 36px 0 ${space.md}`,
  appearance: "none",
  cursor: "pointer",
  "& option": { background: v.surface, color: v.text }
});
var Chevron = styled.span({
  position: "absolute",
  right: space.md,
  top: "50%",
  transform: "translateY(-50%)",
  display: "inline-flex",
  pointerEvents: "none",
  color: v.textMuted
});
var SuperDropdown = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  hint,
  disabled = false,
  fullWidth = false,
  size = "md",
  id,
  ariaLabel,
  className
}) => {
  const autoId = useId();
  const selectId = id ?? autoId;
  const describedBy = error ? `${selectId}-error` : hint ? `${selectId}-hint` : void 0;
  const handleChange = (raw) => {
    const match = options.find((o) => o.value === raw);
    if (match) onChange(match.value);
  };
  return /* @__PURE__ */ jsxs(FieldRoot, { $fullWidth: fullWidth, className, children: [
    label ? /* @__PURE__ */ jsx(FieldLabel, { htmlFor: selectId, children: label }) : null,
    /* @__PURE__ */ jsxs(Box, { $invalid: Boolean(error), $size: size, $disabled: disabled, children: [
      /* @__PURE__ */ jsxs(
        Select,
        {
          id: selectId,
          value,
          disabled,
          "aria-label": label ? void 0 : ariaLabel,
          "aria-invalid": error ? true : void 0,
          "aria-describedby": describedBy,
          onChange: (event) => handleChange(event.target.value),
          children: [
            placeholder ? /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: placeholder }) : null,
            options.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value))
          ]
        }
      ),
      /* @__PURE__ */ jsx(Chevron, { children: /* @__PURE__ */ jsx(SuperIcon, { name: "chevronDown", size: 16 }) })
    ] }),
    error ? /* @__PURE__ */ jsx(FieldError, { id: `${selectId}-error`, role: "alert", children: error }) : hint ? /* @__PURE__ */ jsx(FieldHint, { id: `${selectId}-hint`, children: hint }) : null
  ] });
};

export { SuperDropdown };
