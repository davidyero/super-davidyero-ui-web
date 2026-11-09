import { useSuperModal } from './chunk-QZ5FGYI5.js';
import { SuperIcon } from './chunk-34SSRPSU.js';
import { useSuperLabels } from './chunk-3YBGSPOJ.js';
import { SuperTypography } from './chunk-IMFSKA2U.js';
import { zIndex, media, space, focusVisible } from './chunk-D42FHLD7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { useId } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { jsx, jsxs } from '@emotion/react/jsx-runtime';

var Backdrop = styled.div({
  position: "fixed",
  inset: 0,
  zIndex: zIndex.modal,
  display: "flex",
  justifyContent: "flex-end",
  background: "rgba(42, 33, 30, 0.38)"
});
var Panel = styled.div(({ $width }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  background: v.background,
  color: v.textBody,
  outline: "none",
  [media.sm]: {
    width: `min(${$width}px, 100%)`,
    borderLeft: `1px solid ${v.border}`,
    boxShadow: v.shadow.lg
  }
}));
var Header = styled.div({
  display: "flex",
  alignItems: "flex-start",
  gap: space.md,
  padding: `${space.xl} ${space.xl} ${space.lg}`
});
var Titles = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: space.xs,
  minWidth: 0,
  flex: 1
});
var Close = styled.button({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "44px",
  height: "44px",
  border: `1px solid ${v.border}`,
  borderRadius: v.radius.pill,
  background: v.surface,
  color: v.text,
  cursor: "pointer",
  "&:hover": { background: v.surfaceSunken },
  "&:focus-visible": focusVisible
});
var Body = styled.div({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  padding: `0 ${space.xl} ${space.xl}`
});
var Footer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: space.md,
  padding: `${space.lg} ${space.xl}`,
  borderTop: `1px solid ${v.border}`,
  background: v.surface
});
var SuperDrawer = ({
  open,
  onClose,
  title,
  subtitle,
  eyebrow,
  footer,
  width = 480,
  children
}) => {
  const labels = useSuperLabels();
  const titleId = useId();
  const panelRef = useSuperModal(open, onClose);
  if (!open || typeof document === "undefined") return null;
  return createPortal(
    /* @__PURE__ */ jsx(
      Backdrop,
      {
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) onClose();
        },
        children: /* @__PURE__ */ jsxs(
          Panel,
          {
            ref: panelRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? titleId : void 0,
            "aria-label": title ? void 0 : labels.close,
            tabIndex: -1,
            $width: width,
            children: [
              /* @__PURE__ */ jsxs(Header, { children: [
                /* @__PURE__ */ jsxs(Titles, { children: [
                  eyebrow,
                  title ? /* @__PURE__ */ jsx(SuperTypography, { variant: "display", as: "h2", id: titleId, children: title }) : null,
                  subtitle ? /* @__PURE__ */ jsx(SuperTypography, { variant: "bodySmall", color: "textMuted", children: subtitle }) : null
                ] }),
                /* @__PURE__ */ jsx(Close, { type: "button", "aria-label": labels.close, onClick: onClose, children: /* @__PURE__ */ jsx(SuperIcon, { name: "close", size: 20 }) })
              ] }),
              /* @__PURE__ */ jsx(Body, { children }),
              footer ? /* @__PURE__ */ jsx(Footer, { children: footer }) : null
            ]
          }
        )
      }
    ),
    document.body
  );
};

export { SuperDrawer };
