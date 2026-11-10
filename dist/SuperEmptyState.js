import { SuperIcon } from './chunk-L2VSLKPS.js';
import './chunk-3YBGSPOJ.js';
import { SuperTypography } from './chunk-6OHDPNJ7.js';
import { space } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Root = styled.div(({ $compact }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: space.sm,
  padding: $compact ? space.lg : `${space.xxl} ${space.lg}`,
  maxWidth: "420px",
  margin: "0 auto"
}));
var IconCircle = styled.span({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: v.surfaceSunken,
  color: v.textMuted,
  marginBottom: space.xxs
});
var Action = styled.div({ marginTop: space.sm });
var SuperEmptyState = ({
  icon = "empty",
  title,
  description,
  action,
  compact = false,
  className
}) => /* @__PURE__ */ jsxs(Root, { $compact: compact, className, children: [
  /* @__PURE__ */ jsx(IconCircle, { children: /* @__PURE__ */ jsx(SuperIcon, { name: icon, size: 24 }) }),
  /* @__PURE__ */ jsx(SuperTypography, { variant: "h4", as: "p", children: title }),
  description ? /* @__PURE__ */ jsx(SuperTypography, { variant: "body", color: "textMuted", children: description }) : null,
  action ? /* @__PURE__ */ jsx(Action, { children: action }) : null
] });

export { SuperEmptyState };
