import { SuperTypography } from './chunk-YLQR7YNT.js';
import { SuperIcon } from './chunk-F73VLIRK.js';
import { useSuperLabels } from './chunk-XMET5A6D.js';
import { space, zIndex, focusVisible } from './chunk-UD6QNXPQ.js';
import { v } from './chunk-TRHOZRUW.js';
import './chunk-5HHPKIMZ.js';
import { useId, useRef, useEffect } from 'react';
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
var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
var useSuperModal = (open, onClose) => {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    if (!open) return void 0;
    const previouslyFocused = document.activeElement;
    const dialog = dialogRef.current;
    const focusables = () => dialog ? Array.from(dialog.querySelectorAll(FOCUSABLE)) : [];
    (focusables()[0] ?? dialog)?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);
  return dialogRef;
};
var SuperModal = ({
  open,
  onClose,
  title,
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
                title ? /* @__PURE__ */ jsx(SuperTypography, { variant: "h3", as: "h2", id: titleId, children: title }) : null,
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
