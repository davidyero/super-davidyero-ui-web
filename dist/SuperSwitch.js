import { ChoiceWrap, ChoiceHiddenInput, ChoiceTexts } from './chunk-YHSVMANL.js';
import { SuperTypography } from './chunk-IMFSKA2U.js';
import { focusVisible, transition } from './chunk-D42FHLD7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { useId } from 'react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Track = styled.span(({ $checked }) => ({
  position: "relative",
  flexShrink: 0,
  width: "38px",
  height: "22px",
  borderRadius: v.radius.pill,
  background: $checked ? v.accent : v.borderStrong,
  transition: `background ${transition}`,
  "input:focus-visible + &": focusVisible
}));
var Thumb = styled.span(({ $checked }) => ({
  position: "absolute",
  top: "3px",
  left: $checked ? "19px" : "3px",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  background: $checked ? v.onAccent : v.surface,
  boxShadow: v.shadow.sm,
  transition: `left ${transition}`
}));
var SuperSwitch = ({
  checked,
  onChange,
  label,
  hint,
  disabled = false,
  id,
  ariaLabel,
  className
}) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  return /* @__PURE__ */ jsxs(ChoiceWrap, { $disabled: disabled, htmlFor: inputId, className, children: [
    /* @__PURE__ */ jsx(
      ChoiceHiddenInput,
      {
        id: inputId,
        type: "checkbox",
        role: "switch",
        checked,
        disabled,
        "aria-checked": checked,
        "aria-label": label ? void 0 : ariaLabel,
        "aria-describedby": hint ? `${inputId}-hint` : void 0,
        onChange: (event) => onChange(event.target.checked)
      }
    ),
    /* @__PURE__ */ jsx(Track, { $checked: checked, "aria-hidden": true, children: /* @__PURE__ */ jsx(Thumb, { $checked: checked }) }),
    label || hint ? /* @__PURE__ */ jsxs(ChoiceTexts, { children: [
      label ? /* @__PURE__ */ jsx(SuperTypography, { variant: "body", color: "text", as: "span", children: label }) : null,
      hint ? /* @__PURE__ */ jsx(SuperTypography, { variant: "caption", as: "span", id: `${inputId}-hint`, children: hint }) : null
    ] }) : null
  ] });
};

export { SuperSwitch };
