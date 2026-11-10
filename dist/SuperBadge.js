import { SuperIcon } from './chunk-L2VSLKPS.js';
import './chunk-3YBGSPOJ.js';
import { space } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var TONE = {
  neutral: { background: v.surfaceSunken, color: v.textBody, dot: v.textMuted },
  primary: { background: v.primarySoft, color: v.primarySoftText, dot: v.primary },
  success: { background: v.successSoft, color: v.successText, dot: v.success },
  warning: { background: v.warningSoft, color: v.warningText, dot: v.warning },
  danger: { background: v.dangerSoft, color: v.dangerText, dot: v.danger },
  info: { background: v.infoSoft, color: v.infoText, dot: v.info }
};
var BadgeRoot = styled.span(({ $tone, $size, $mono, $wrap }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: space.xxs,
  maxWidth: "100%",
  minHeight: $size === "sm" ? "22px" : "26px",
  height: $wrap ? "auto" : void 0,
  padding: `0 ${$size === "sm" ? space.xs : space.sm}`,
  borderRadius: v.radius.pill,
  fontFamily: $mono ? v.font.mono : v.font.base,
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: $wrap ? 1.35 : 1,
  whiteSpace: $wrap ? "normal" : "nowrap",
  paddingBlock: $wrap ? "3px" : 0,
  background: TONE[$tone].background,
  color: TONE[$tone].color
}));
var Dot = styled.span(({ $tone }) => ({
  width: "7px",
  height: "7px",
  borderRadius: "50%",
  flexShrink: 0,
  background: TONE[$tone].dot
}));
var Label = styled.span({ overflow: "hidden", textOverflow: "ellipsis" });
var Remove = styled.button({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginInlineEnd: "-4px",
  padding: 0,
  border: 0,
  borderRadius: v.radius.pill,
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
  "&:focus-visible": { outline: `2px solid ${v.focusRing}`, outlineOffset: "1px" }
});
var PLAN_BADGE = {
  free: { icon: "plan-free", tone: "neutral" },
  lite: { icon: "plan-lite", tone: "success" },
  pro: { icon: "plan-pro", tone: "info" },
  thanos: { icon: "plan-thanos", tone: "primary" },
  superthanos: { icon: "plan-superthanos", tone: "warning" }
};
var SuperBadge = ({
  plan,
  tone = plan ? PLAN_BADGE[plan].tone : "neutral",
  size = "md",
  icon = plan ? PLAN_BADGE[plan].icon : void 0,
  dot = false,
  mono = false,
  wrap = false,
  onRemove,
  removeLabel,
  className,
  children
}) => /* @__PURE__ */ jsxs(BadgeRoot, { $tone: tone, $size: size, $mono: mono, $wrap: wrap, className, children: [
  dot ? /* @__PURE__ */ jsx(Dot, { $tone: tone, "aria-hidden": true }) : null,
  icon ? /* @__PURE__ */ jsx(SuperIcon, { name: icon, size: 14 }) : null,
  /* @__PURE__ */ jsx(Label, { children }),
  onRemove ? /* @__PURE__ */ jsx(Remove, { type: "button", "aria-label": removeLabel, onClick: onRemove, children: /* @__PURE__ */ jsx(SuperIcon, { name: "close", size: 14 }) }) : null
] });

export { PLAN_BADGE, SuperBadge };
