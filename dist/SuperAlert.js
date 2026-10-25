import { SuperTypography } from './chunk-XCRJXV2B.js';
import { SuperIcon } from './chunk-ZLC5VFBD.js';
import { useSuperLabels } from './chunk-V6RXFFM7.js';
import { space, focusVisible } from './chunk-BJDG5RNM.js';
import { v } from './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var ALERT_TONE = {
  info: { bg: v.infoSoft, fg: v.infoText, accent: v.info, icon: "info" },
  success: { bg: v.successSoft, fg: v.successText, accent: v.success, icon: "success" },
  warning: { bg: v.warningSoft, fg: v.warningText, accent: v.warning, icon: "warning" },
  danger: { bg: v.dangerSoft, fg: v.dangerText, accent: v.danger, icon: "danger" }
};
var Root = styled.div(({ $tone }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: space.md,
  padding: `${space.md} ${space.lg}`,
  borderRadius: v.radius.md,
  borderLeft: `3px solid ${ALERT_TONE[$tone].accent}`,
  background: ALERT_TONE[$tone].bg,
  color: ALERT_TONE[$tone].fg
}));
var Body = styled.div({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: space.xxs
});
var Close = styled.button({
  display: "inline-flex",
  padding: space.xxs,
  margin: `-${space.xxs}`,
  border: "none",
  borderRadius: v.radius.sm,
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
  "&:focus-visible": focusVisible
});
var SuperAlert = ({
  tone = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  action,
  className
}) => {
  const labels = useSuperLabels();
  return /* @__PURE__ */ jsxs(Root, { $tone: tone, role: tone === "danger" ? "alert" : "status", className, children: [
    /* @__PURE__ */ jsx(SuperIcon, { name: ALERT_TONE[tone].icon, size: 20 }),
    /* @__PURE__ */ jsxs(Body, { children: [
      title ? /* @__PURE__ */ jsx(SuperTypography, { variant: "label", color: "inherit", as: "p", children: title }) : null,
      /* @__PURE__ */ jsx(SuperTypography, { variant: "body", color: "inherit", as: "div", children }),
      action
    ] }),
    dismissible ? /* @__PURE__ */ jsx(Close, { type: "button", "aria-label": labels.dismiss, onClick: onDismiss, children: /* @__PURE__ */ jsx(SuperIcon, { name: "close", size: 18 }) }) : null
  ] });
};

export { SuperAlert };
