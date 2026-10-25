import { useToasts, toast } from './chunk-Y3WTWHVJ.js';
import { SuperButton } from './chunk-5SSHZZ5D.js';
import './chunk-EQLP6N2V.js';
import { SuperTypography } from './chunk-XCRJXV2B.js';
import { SuperIcon } from './chunk-ZLC5VFBD.js';
import { useSuperLabels } from './chunk-V6RXFFM7.js';
import { space, zIndex, focusVisible } from './chunk-BJDG5RNM.js';
import { v } from './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import styled from '@emotion/styled';
import { jsx, jsxs } from '@emotion/react/jsx-runtime';

var POS = {
  "top-right": { top: space.lg, right: space.lg, alignItems: "flex-end" },
  "top-center": { top: space.lg, left: "50%", transform: "translateX(-50%)", alignItems: "center" },
  "bottom-right": { bottom: space.lg, right: space.lg, alignItems: "flex-end" },
  "bottom-center": {
    bottom: space.lg,
    left: "50%",
    transform: "translateX(-50%)",
    alignItems: "center"
  }
};
var TOAST_TONE = {
  success: { accent: v.success, icon: "success" },
  danger: { accent: v.danger, icon: "danger" },
  warning: { accent: v.warning, icon: "warning" },
  info: { accent: v.info, icon: "info" }
};
var Viewport = styled.div(({ $position }) => ({
  position: "fixed",
  zIndex: zIndex.toast,
  display: "flex",
  flexDirection: "column",
  gap: space.sm,
  width: `min(380px, calc(100vw - ${space.xxl}))`,
  pointerEvents: "none",
  ...POS[$position]
}));
var Item = styled.div(({ $tone }) => ({
  pointerEvents: "auto",
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "flex-start",
  gap: space.md,
  padding: `${space.md} ${space.lg}`,
  borderRadius: v.radius.md,
  borderLeft: `3px solid ${TOAST_TONE[$tone].accent}`,
  background: v.surfaceElevated,
  boxShadow: v.shadow.lg,
  color: v.text
}));
var IconSlot = styled.span(({ $tone }) => ({
  display: "inline-flex",
  color: TOAST_TONE[$tone].accent
}));
var Texts = styled.div({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  // La acción del toast (p. ej. «Deshacer») no se estira a todo el ancho.
  "& > button": { alignSelf: "flex-start", marginTop: "4px" }
});
var Dismiss = styled.button({
  display: "inline-flex",
  padding: space.xxs,
  margin: `-${space.xxs}`,
  border: "none",
  borderRadius: v.radius.sm,
  background: "transparent",
  color: v.textMuted,
  cursor: "pointer",
  "&:hover": { color: v.text },
  "&:focus-visible": focusVisible
});
var SuperToast = ({ position = "top-right" }) => {
  const items = useToasts();
  const labels = useSuperLabels();
  return /* @__PURE__ */ jsx(Viewport, { $position: position, "aria-live": "polite", "aria-relevant": "additions", children: items.map((item) => /* @__PURE__ */ jsxs(Item, { $tone: item.tone, role: item.tone === "danger" ? "alert" : "status", children: [
    /* @__PURE__ */ jsx(IconSlot, { $tone: item.tone, children: /* @__PURE__ */ jsx(SuperIcon, { name: TOAST_TONE[item.tone].icon, size: 20 }) }),
    /* @__PURE__ */ jsxs(Texts, { children: [
      item.title ? /* @__PURE__ */ jsx(SuperTypography, { variant: "label", as: "p", children: item.title }) : null,
      /* @__PURE__ */ jsx(SuperTypography, { variant: "body", color: "textBody", as: "p", children: item.message }),
      item.action ? /* @__PURE__ */ jsx(
        SuperButton,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => {
            item.action?.onClick();
            toast.dismiss(item.id);
          },
          children: item.action.label
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsx(Dismiss, { type: "button", "aria-label": labels.dismiss, onClick: () => toast.dismiss(item.id), children: /* @__PURE__ */ jsx(SuperIcon, { name: "close", size: 18 }) })
  ] }, item.id)) });
};

export { SuperToast };
