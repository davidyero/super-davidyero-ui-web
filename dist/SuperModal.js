import { useSuperModal } from './chunk-IVWDWLQA.js';
import { SuperTypography } from './chunk-6OHDPNJ7.js';
import { SuperIcon } from './chunk-DGDXZTZH.js';
import { useSuperLabels } from './chunk-2OYI3VCV.js';
import { breakpoints, space, scrim, zIndex, focusVisible } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { jsx, jsxs } from '@emotion/react/jsx-runtime';

var belowMd = `@media (max-width: ${breakpoints.md - 1}px)`;
var reduced = "@media (prefers-reduced-motion: reduce)";
var slideUp = keyframes({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "translateY(0)" }
});
var Backdrop = styled.div(
  ({ $align, $sheet }) => ({
    position: "fixed",
    inset: 0,
    zIndex: zIndex.modal,
    display: "flex",
    justifyContent: "center",
    alignItems: $align === "center" ? "center" : "flex-start",
    padding: $align === "center" ? space.lg : `10vh ${space.lg} ${space.lg}`,
    background: scrim,
    overflowY: "auto",
    ...$sheet ? { [belowMd]: { alignItems: "flex-end", padding: `${space.xl} 0 0` } } : {}
  })
);
var Dialog = styled.div(
  ({ $width, $padded, $sheet }) => ({
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
    "& > [data-sd-modal-body]": { padding: $padded ? `0 ${space.xl} ${space.xl}` : 0 },
    ...$sheet ? {
      [belowMd]: {
        maxWidth: "none",
        maxHeight: "90dvh",
        borderRadius: `${v.radius.lg} ${v.radius.lg} 0 0`,
        borderBottom: "none",
        paddingBottom: "env(safe-area-inset-bottom)",
        animation: `${slideUp} 220ms ease-out`,
        // La cabecera también arrastra la hoja: sin `touch-action` el navegador se
        // quedaría el gesto para desplazar la página.
        "& > [data-sd-modal-header]": {
          padding: `${space.md} ${space.lg}`,
          touchAction: "none"
        },
        "& > [data-sd-modal-body]": {
          padding: $padded ? `0 ${space.lg} ${space.lg}` : 0
        },
        // El footer también pasa al margen lateral del sheet, alineado con lo de arriba.
        "& > [data-sd-modal-footer]": { padding: `${space.md} ${space.lg} ${space.lg}` },
        [reduced]: { animation: "none" }
      }
    } : {}
  })
);
var Grabber = styled.div({
  display: "none",
  [belowMd]: {
    display: "block",
    flexShrink: 0,
    alignSelf: "center",
    width: "136px",
    padding: `${space.sm} 0 ${space.xxs}`,
    cursor: "grab",
    touchAction: "none",
    "&::before": {
      content: '""',
      display: "block",
      width: "40px",
      height: "4px",
      margin: "0 auto",
      borderRadius: v.radius.pill,
      background: v.border
    }
  }
});
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
var SHEET_CLOSE_DISTANCE = 96;
var FLICK_SPEED = 0.5;
var FLICK_DISTANCE = 32;
var isSheetViewport = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(`(max-width: ${breakpoints.md - 1}px)`).matches;
var prefersReducedMotion = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var useSheetDrag = (dialogRef, enabled, onClose) => {
  const drag = useRef(null);
  const setOffset = (dy, animate) => {
    const el = dialogRef.current;
    if (!el) return;
    el.style.transition = animate && !prefersReducedMotion() ? "transform 180ms ease-out" : "none";
    el.style.transform = dy > 0 ? `translateY(${dy}px)` : "";
  };
  const end = (event, cancelled) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    const elapsed = Math.max(1, performance.now() - d.startT);
    const fast = d.dy >= FLICK_DISTANCE && d.dy / elapsed > FLICK_SPEED;
    if (!cancelled && (d.dy >= SHEET_CLOSE_DISTANCE || fast)) {
      onClose();
      return;
    }
    setOffset(0, true);
  };
  return {
    onPointerDown: (event) => {
      if (!enabled || !isSheetViewport() || event.button !== 0) return;
      if (event.target.closest("button, a, input, select, textarea")) return;
      drag.current = {
        id: event.pointerId,
        startY: event.clientY,
        startT: performance.now(),
        dy: 0
      };
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    onPointerMove: (event) => {
      const d = drag.current;
      if (!d || d.id !== event.pointerId) return;
      d.dy = Math.max(0, event.clientY - d.startY);
      setOffset(d.dy, false);
    },
    onPointerUp: (event) => end(event, false),
    onPointerCancel: (event) => end(event, true)
  };
};
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
  mobileSheet = false,
  children
}) => {
  const labels = useSuperLabels();
  const titleId = useId();
  const dialogRef = useSuperModal(open, onClose);
  const dragHandlers = useSheetDrag(dialogRef, mobileSheet, onClose);
  if (!open || typeof document === "undefined") return null;
  return createPortal(
    /* @__PURE__ */ jsx(
      Backdrop,
      {
        $align: align,
        $sheet: mobileSheet,
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
            $sheet: mobileSheet,
            children: [
              mobileSheet ? /* @__PURE__ */ jsx(Grabber, { "aria-hidden": "true", "data-sd-modal-grabber": true, ...dragHandlers }) : null,
              /* @__PURE__ */ jsxs(Header, { "data-sd-modal-header": true, ...mobileSheet ? dragHandlers : {}, children: [
                title || subtitle ? /* @__PURE__ */ jsxs("div", { children: [
                  title ? /* @__PURE__ */ jsx(SuperTypography, { variant: "h3", as: "h2", id: titleId, children: title }) : null,
                  subtitle ? /* @__PURE__ */ jsx(SuperTypography, { variant: "bodySmall", color: "textMuted", children: subtitle }) : null
                ] }) : null,
                /* @__PURE__ */ jsx(Close, { type: "button", "aria-label": labels.close, onClick: onClose, children: /* @__PURE__ */ jsx(SuperIcon, { name: "close", size: 20 }) })
              ] }),
              /* @__PURE__ */ jsx(Body, { "data-sd-modal-body": true, children }),
              footer ? /* @__PURE__ */ jsx(Footer, { "data-sd-modal-footer": true, children: footer }) : null
            ]
          }
        )
      }
    ),
    document.body
  );
};

export { SuperModal };
