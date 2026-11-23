import { prefersReducedMotion, motion, timing } from './chunk-KETZYNAG.js';
import { useState, useEffect, useRef } from 'react';
import { keyframes } from '@emotion/react';

var usePresence = (open, exit) => {
  const [mounted, setMounted] = useState(open);
  if (open && !mounted) setMounted(true);
  useEffect(() => {
    if (open || !mounted) return void 0;
    const canAnimate = typeof window !== "undefined" && typeof window.matchMedia === "function";
    const wait = canAnimate && !prefersReducedMotion() ? motion.duration[exit] : 0;
    const timer = setTimeout(() => setMounted(false), wait);
    return () => clearTimeout(timer);
  }, [open, mounted, exit]);
  return { mounted: open || mounted, closing: !open && mounted };
};
var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
var stack = [];
var isTop = (token) => stack[stack.length - 1] === token;
var useSuperModal = (open, onClose) => {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    if (!open) return void 0;
    const previouslyFocused = document.activeElement;
    const dialog = dialogRef.current;
    const focusables = () => dialog ? Array.from(dialog.querySelectorAll(FOCUSABLE)) : [];
    const token = /* @__PURE__ */ Symbol("sd-modal");
    stack.push(token);
    (focusables()[0] ?? dialog)?.focus();
    const html = document.documentElement;
    const gutter = window.innerWidth - html.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const previousGutter = html.style.scrollbarGutter;
    const previousBodyGutter = document.body.style.scrollbarGutter;
    document.body.style.overflow = "hidden";
    if (gutter > 0) {
      html.style.scrollbarGutter = "auto";
      document.body.style.scrollbarGutter = "auto";
      document.body.style.paddingRight = `${gutter}px`;
    }
    const onKeyDown = (event) => {
      if (!isTop(token) || event.defaultPrevented) return;
      if (event.key === "Escape") {
        event.preventDefault();
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
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      stack.splice(stack.indexOf(token), 1);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      html.style.scrollbarGutter = previousGutter;
      document.body.style.scrollbarGutter = previousBodyGutter;
      previouslyFocused?.focus?.();
    };
  }, [open]);
  return dialogRef;
};
var fadeIn = keyframes({ from: { opacity: 0 } });
var fadeOut = keyframes({ to: { opacity: 0 } });
var scrimMotion = (closing) => ({
  animation: `${closing ? fadeOut : fadeIn} ${timing("fast")} both`,
  pointerEvents: closing ? "none" : void 0
});

export { fadeIn, fadeOut, scrimMotion, usePresence, useSuperModal };
