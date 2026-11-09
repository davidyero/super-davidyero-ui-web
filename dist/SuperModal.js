import { useSuperModal } from './chunk-QZ5FGYI5.js';
import { SuperIcon } from './chunk-34SSRPSU.js';
import { useSuperLabels } from './chunk-3YBGSPOJ.js';
import { SuperTypography } from './chunk-IMFSKA2U.js';
import { space, zIndex, focusVisible } from './chunk-D42FHLD7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { useId } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { jsx, jsxs } from '@emotion/react/jsx-runtime';

var Backdrop = styled.div(({ $align }) => ({
  position: "fixed",
  inset: 0,
  zIndex: zIndex.modal,
  display: "flex",
  justifyContent: "center",
  alignItems: $align === "center" ? "center" : "flex-start",
  padding: $align === "center" ? space.lg : `10vh ${space.lg} ${space.lg}`,
  background: "rgba(0, 0, 0, 0.45)",
  overflowY: "auto"
}));
var Dialog = styled.div(({ $width, $padded }) => ({
  width: "100%",
  maxWidth: `${$width}px`,
  maxHeight: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: v.radius.lg,
  background: v.surfaceElevated,
  border: `1px solid ${v.border}`,
  boxShadow: v.shadow.lg,
  color: v.textBody,
  outline: "none",
  "& > [data-sd-modal-body]": { padding: $padded ? `0 ${space.xl} ${space.xl}` : 0 }
}));
var Header = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: space.md,
  padding: `${space.lg} ${space.xl}`
});
var Body = styled.div({ overflowY: "auto", minHeight: 0 });
var Footer = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  gap: space.sm,
  padding: `${space.md} ${space.xl} ${space.lg}`,
  borderTop: `1px solid ${v.border}`
});
var Close = styled.button({
  display: "inline-flex",
  marginLeft: "auto",
  padding: space.xxs,
  border: "none",
  borderRadius: v.radius.sm,
  background: "transparent",
  color: v.textMuted,
  cursor: "pointer",
  "&:hover": { color: v.text },
  "&:focus-visible": focusVisible
});
var SuperModal = ({
  open,
  onClose,
  title,
  subtitle,
  footer,
  align = "center",
  width = 520,
  padded = true,
  closeOnBackdrop = true,
  children
}) => {
  const labels = useSuperLabels();
  const titleId = useId();
  const dialogRef = useSuperModal(open, onClose);
  if (!open || typeof document === "undefined") return null;
  return createPortal(
    /* @__PURE__ */ jsx(
      Backdrop,
      {
        $align: align,
        onMouseDown: (event) => {
          if (closeOnBackdrop && event.target === event.currentTarget) onClose();
        },
        children: /* @__PURE__ */ jsxs(
          Dialog,
          {
            ref: dialogRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? titleId : void 0,
            "aria-label": title ? void 0 : labels.close,
            tabIndex: -1,
            $width: width,
            $padded: padded,
            children: [
              /* @__PURE__ */ jsxs(Header, { children: [
                title || subtitle ? /* @__PURE__ */ jsxs("div", { children: [
                  title ? /* @__PURE__ */ jsx(SuperTypography, { variant: "h3", as: "h2", id: titleId, children: title }) : null,
                  subtitle ? /* @__PURE__ */ jsx(SuperTypography, { variant: "bodySmall", color: "textMuted", children: subtitle }) : null
                ] }) : null,
                /* @__PURE__ */ jsx(Close, { type: "button", "aria-label": labels.close, onClick: onClose, children: /* @__PURE__ */ jsx(SuperIcon, { name: "close", size: 20 }) })
              ] }),
              /* @__PURE__ */ jsx(Body, { "data-sd-modal-body": true, children }),
              footer ? /* @__PURE__ */ jsx(Footer, { children: footer }) : null
            ]
          }
        )
      }
    ),
    document.body
  );
};

export { SuperModal };
