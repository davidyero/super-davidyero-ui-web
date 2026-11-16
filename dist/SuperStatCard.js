import { SuperBadge } from './chunk-2WF27ERT.js';
import { SuperSkeleton } from './chunk-ZJKOTCBT.js';
import { SuperIcon } from './chunk-DGDXZTZH.js';
import './chunk-2OYI3VCV.js';
import { SuperCard } from './chunk-NCYRWR4T.js';
import { SuperTypography } from './chunk-6OHDPNJ7.js';
import { space, textScale } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Top = styled.div({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: space.sm,
  minWidth: 0
});
var IconCircle = styled.span({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: v.primarySoft,
  color: v.primarySoftText
});
var lineBox = ({ fontSize, lineHeight }) => `calc(${fontSize} * ${lineHeight})`;
var VALUE_SKELETON_HEIGHT = {
  md: lineBox(textScale.display),
  sm: lineBox(textScale.h1)
};
var Value = styled.div(({ $size }) => ({
  marginTop: $size === "md" ? space.md : space.sm,
  minWidth: 0,
  fontVariantNumeric: "tabular-nums"
}));
var DeltaRow = styled.div({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: space.xs,
  marginTop: space.sm,
  minWidth: 0
});
var TREND_TONE = {
  up: "success",
  down: "danger",
  neutral: "neutral"
};
var TREND_ICON = {
  up: "trendUp",
  down: "trendDown",
  neutral: void 0
};
var SuperStatCard = ({
  label,
  value,
  icon,
  delta,
  trend = "neutral",
  deltaLabel,
  size = "md",
  loading = false,
  className
}) => /* @__PURE__ */ jsxs(SuperCard, { padding: size === "md" ? "md" : "sm", className, "aria-busy": loading, children: [
  /* @__PURE__ */ jsxs(Top, { children: [
    loading ? /* @__PURE__ */ jsx(SuperSkeleton, { variant: "text", width: "60%" }) : /* @__PURE__ */ jsx(SuperTypography, { variant: "label", color: "textMuted", truncate: true, children: label }),
    icon ? /* @__PURE__ */ jsx(IconCircle, { "aria-hidden": true, children: /* @__PURE__ */ jsx(SuperIcon, { name: icon, size: 18 }) }) : null
  ] }),
  /* @__PURE__ */ jsx(Value, { $size: size, children: loading ? /* @__PURE__ */ jsx(SuperSkeleton, { variant: "block", width: "50%", height: VALUE_SKELETON_HEIGHT[size] }) : /* @__PURE__ */ jsx(SuperTypography, { variant: size === "md" ? "display" : "h1", color: "text", truncate: true, children: value }) }),
  loading ? /* @__PURE__ */ jsx(DeltaRow, { children: /* @__PURE__ */ jsx(SuperSkeleton, { variant: "text", width: "70%" }) }) : delta ? /* @__PURE__ */ jsxs(DeltaRow, { children: [
    /* @__PURE__ */ jsx(SuperBadge, { tone: TREND_TONE[trend], icon: TREND_ICON[trend], size: "sm", mono: true, children: delta }),
    deltaLabel ? /* @__PURE__ */ jsx(SuperTypography, { variant: "caption", color: "textMuted", children: deltaLabel }) : null
  ] }) : null
] });

export { SuperStatCard };
