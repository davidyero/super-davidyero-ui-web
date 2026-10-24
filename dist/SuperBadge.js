import { SuperIcon } from './chunk-HTU3L4JR.js';
import './chunk-XMET5A6D.js';
import { space } from './chunk-OJWPWQVY.js';
import { v } from './chunk-BSDVG7PM.js';
import './chunk-ASN2VLDU.js';
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
var BadgeRoot = styled.span(
  ({ $tone, $size, $mono }) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: space.xxs,
    maxWidth: "100%",
    height: $size === "sm" ? "22px" : "26px",
    padding: `0 ${$size === "sm" ? space.xs : space.sm}`,
    borderRadius: v.radius.pill,
    fontFamily: $mono ? v.font.mono : v.font.base,
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: "nowrap",
    background: TONE[$tone].background,
    color: TONE[$tone].color
  })
);
var Dot = styled.span(({ $tone }) => ({
  width: "7px",
  height: "7px",
  borderRadius: "50%",
  flexShrink: 0,
  background: TONE[$tone].dot
}));
var Label = styled.span({ overflow: "hidden", textOverflow: "ellipsis" });
var SuperBadge = ({
  tone = "neutral",
  size = "md",
  icon,
  dot = false,
  mono = false,
  className,
  children
}) => /* @__PURE__ */ jsxs(BadgeRoot, { $tone: tone, $size: size, $mono: mono, className, children: [
  dot ? /* @__PURE__ */ jsx(Dot, { $tone: tone, "aria-hidden": true }) : null,
  icon ? /* @__PURE__ */ jsx(SuperIcon, { name: icon, size: 14 }) : null,
  /* @__PURE__ */ jsx(Label, { children })
] });

export { SuperBadge };
