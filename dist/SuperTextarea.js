import { controlBox, controlText, FieldRoot, FieldLabel, FieldError, FieldHint } from './chunk-ZNUXLCOE.js';
import { space } from './chunk-BJDG5RNM.js';
import { v } from './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import { forwardRef, useId } from 'react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Box = styled.div(
  ({ $invalid, $disabled }) => ({
    ...controlBox($invalid),
    padding: `${space.sm} ${space.md}`,
    opacity: $disabled ? 0.6 : 1
  })
);
var Area = styled.textarea(controlText, ({ $mono }) => ({
  minHeight: "96px",
  resize: "vertical",
  lineHeight: 1.5,
  ...$mono ? { fontFamily: v.font.mono } : {}
}));
var Footer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  gap: space.sm
});
var Count = styled.span(({ $over }) => ({
  marginLeft: "auto",
  fontFamily: v.font.mono,
  fontSize: "13px",
  color: $over ? v.dangerText : v.textMuted
}));
var SuperTextarea = forwardRef(
  function SuperTextarea2({
    label,
    error,
    hint,
    fullWidth = false,
    showCount = false,
    maxCount,
    mono = false,
    id,
    disabled,
    className,
    value,
    maxLength,
    ...rest
  }, ref) {
    const autoId = useId();
    const areaId = id ?? autoId;
    const length = typeof value === "string" ? value.length : 0;
    const countMax = maxCount ?? (showCount ? maxLength : void 0);
    const describedBy = error ? `${areaId}-error` : hint ? `${areaId}-hint` : void 0;
    return /* @__PURE__ */ jsxs(FieldRoot, { $fullWidth: fullWidth, className, children: [
      label ? /* @__PURE__ */ jsx(FieldLabel, { htmlFor: areaId, children: label }) : null,
      /* @__PURE__ */ jsx(Box, { $invalid: Boolean(error), $disabled: Boolean(disabled), children: /* @__PURE__ */ jsx(
        Area,
        {
          ...rest,
          ref,
          id: areaId,
          $mono: mono,
          value,
          maxLength,
          disabled,
          "aria-invalid": error ? true : void 0,
          "aria-describedby": describedBy
        }
      ) }),
      /* @__PURE__ */ jsxs(Footer, { children: [
        error ? /* @__PURE__ */ jsx(FieldError, { id: `${areaId}-error`, role: "alert", children: error }) : hint ? /* @__PURE__ */ jsx(FieldHint, { id: `${areaId}-hint`, children: hint }) : null,
        countMax ? /* @__PURE__ */ jsxs(Count, { $over: maxCount ? length > maxCount : length >= countMax, "aria-live": "polite", children: [
          length,
          "/",
          countMax
        ] }) : null
      ] })
    ] });
  }
);

export { SuperTextarea };
