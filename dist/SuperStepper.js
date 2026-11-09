import { space, focusVisible, transition } from './chunk-D42FHLD7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Root = styled.div({
  display: "inline-flex",
  alignItems: "center",
  gap: space.xxs,
  padding: space.xxs,
  border: `1px solid ${v.borderStrong}`,
  borderRadius: v.radius.pill,
  background: v.surface
});
var StepButton = styled.button({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  border: "none",
  borderRadius: v.radius.pill,
  background: "transparent",
  color: v.text,
  fontFamily: v.font.base,
  fontSize: "18px",
  fontWeight: 600,
  cursor: "pointer",
  transition: `background ${transition}`,
  "&:hover:not(:disabled)": { background: v.surfaceSunken },
  "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
  "&:focus-visible": focusVisible
});
var Value = styled.output({
  minWidth: "96px",
  padding: `0 ${space.xs}`,
  textAlign: "center",
  color: v.text,
  fontFamily: v.font.base,
  fontSize: "14px",
  fontWeight: 600,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap"
});
var SuperStepper = ({
  value,
  onChange,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  formatValue = String,
  ariaLabel,
  decrementLabel,
  incrementLabel,
  disabled = false,
  className
}) => {
  const clamp = (next) => Math.min(max, Math.max(min, next));
  const text = formatValue(value);
  return /* @__PURE__ */ jsxs(Root, { role: "group", "aria-label": ariaLabel, className, children: [
    /* @__PURE__ */ jsx(
      StepButton,
      {
        type: "button",
        "aria-label": decrementLabel,
        disabled: disabled || value <= min,
        onClick: () => onChange(clamp(value - step)),
        children: "\u2212"
      }
    ),
    /* @__PURE__ */ jsx(Value, { "aria-live": "polite", children: text }),
    /* @__PURE__ */ jsx(
      StepButton,
      {
        type: "button",
        "aria-label": incrementLabel,
        disabled: disabled || value >= max,
        onClick: () => onChange(clamp(value + step)),
        children: "+"
      }
    )
  ] });
};

export { SuperStepper };
