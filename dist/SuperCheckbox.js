import { SuperTypography } from './chunk-YHFTDPNA.js';
import { space, focusVisible, transition } from './chunk-OJWPWQVY.js';
import { v } from './chunk-BSDVG7PM.js';
import './chunk-ASN2VLDU.js';
import { useId } from 'react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Wrap = styled.label(({ $disabled }) => ({
  display: "inline-flex",
  alignItems: "flex-start",
  gap: space.sm,
  cursor: $disabled ? "not-allowed" : "pointer",
  opacity: $disabled ? 0.55 : 1,
  userSelect: "none"
}));
var HiddenInput = styled.input({
  position: "absolute",
  opacity: 0,
  width: "1px",
  height: "1px",
  margin: 0
});
var Box = styled.span(
  ({ $checked, $invalid }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "20px",
    height: "20px",
    marginTop: "1px",
    borderRadius: v.radius.sm,
    border: `1.5px solid ${$invalid ? v.danger : $checked ? v.primary : v.borderStrong}`,
    background: $checked ? v.primary : v.surface,
    color: v.onPrimary,
    transition: `background ${transition}, border-color ${transition}`,
    "input:focus-visible + &": focusVisible
  })
);
var Texts = styled.span({ display: "flex", flexDirection: "column", gap: "2px" });
var CheckMark = () => /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M2.5 6.2 5 8.6l4.5-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }
) });
var SuperCheckbox = ({
  checked,
  onChange,
  label,
  hint,
  error,
  disabled = false,
  id,
  ariaLabel,
  className
}) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : void 0;
  return /* @__PURE__ */ jsxs(Wrap, { $disabled: disabled, htmlFor: inputId, className, children: [
    /* @__PURE__ */ jsx(
      HiddenInput,
      {
        id: inputId,
        type: "checkbox",
        checked,
        disabled,
        "aria-label": label ? void 0 : ariaLabel,
        "aria-invalid": error ? true : void 0,
        "aria-describedby": describedBy,
        onChange: (event) => onChange(event.target.checked)
      }
    ),
    /* @__PURE__ */ jsx(Box, { $checked: checked, $invalid: Boolean(error), "aria-hidden": true, children: checked ? /* @__PURE__ */ jsx(CheckMark, {}) : null }),
    label || hint || error ? /* @__PURE__ */ jsxs(Texts, { children: [
      label ? /* @__PURE__ */ jsx(SuperTypography, { variant: "body", color: "text", as: "span", children: label }) : null,
      error ? /* @__PURE__ */ jsx(SuperTypography, { variant: "caption", color: "danger", as: "span", id: `${inputId}-error`, children: error }) : hint ? /* @__PURE__ */ jsx(SuperTypography, { variant: "caption", as: "span", id: `${inputId}-hint`, children: hint }) : null
    ] }) : null
  ] });
};

export { SuperCheckbox };
