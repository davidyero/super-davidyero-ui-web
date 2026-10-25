import { space, transition } from './chunk-BJDG5RNM.js';
import { v } from './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var FILL = {
  primary: v.primary,
  success: v.success,
  warning: v.warning,
  danger: v.danger,
  info: v.info
};
var Row = styled.div({
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  width: "100%"
});
var Track = styled.div(({ $size }) => ({
  flex: 1,
  height: $size === "sm" ? "6px" : "10px",
  borderRadius: v.radius.pill,
  background: v.surfaceSunken,
  overflow: "hidden"
}));
var Fill = styled.div(({ $pct, $tone }) => ({
  width: `${$pct}%`,
  height: "100%",
  borderRadius: "inherit",
  background: FILL[$tone],
  transition: `width ${transition}`
}));
var Value = styled.span({
  minWidth: "40px",
  textAlign: "right",
  fontFamily: v.font.mono,
  fontSize: "13px",
  color: v.textMuted
});
var SuperProgressBar = ({
  value,
  max = 100,
  tone = "primary",
  size = "md",
  label,
  showValue = false,
  className
}) => {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const pct = Math.round(clamped / safeMax * 100);
  return /* @__PURE__ */ jsxs(Row, { className, children: [
    /* @__PURE__ */ jsx(
      Track,
      {
        $size: size,
        role: "progressbar",
        "aria-label": label,
        "aria-valuemin": 0,
        "aria-valuemax": safeMax,
        "aria-valuenow": clamped,
        children: /* @__PURE__ */ jsx(Fill, { $pct: pct, $tone: tone })
      }
    ),
    showValue ? /* @__PURE__ */ jsxs(Value, { "aria-hidden": true, children: [
      pct,
      "%"
    ] }) : null
  ] });
};

export { SuperProgressBar };
