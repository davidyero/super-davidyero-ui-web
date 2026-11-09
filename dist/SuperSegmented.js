import { space, focusVisible, transition } from './chunk-D42FHLD7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { useRef, useState, useCallback, useLayoutEffect, useEffect } from 'react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var SLIDE = "260ms cubic-bezier(0.22, 1, 0.36, 1)";
var reduceMotion = "@media (prefers-reduced-motion: reduce)";
var iconSide = (size) => size === "sm" ? "36px" : "44px";
var Track = styled.div(
  ({ $fullWidth, $variant }) => ({
    position: "relative",
    display: $fullWidth ? "flex" : "inline-flex",
    width: $fullWidth ? "100%" : void 0,
    maxWidth: "100%",
    gap: space.xxs,
    padding: space.xxs,
    border: `1px solid ${v.border}`,
    borderRadius: v.radius.pill,
    background: $variant === "icon" ? v.surfaceSunken : v.surface,
    overflowX: "auto",
    scrollbarWidth: "none"
  })
);
var Thumb = styled.span(
  ({ $variant, $animate }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: v.radius.pill,
    background: $variant === "icon" ? v.surface : v.text,
    boxShadow: $variant === "icon" ? v.shadow.sm : "none",
    pointerEvents: "none",
    transition: $animate ? `transform ${SLIDE}, width ${SLIDE}` : "none",
    [reduceMotion]: { transition: "none" }
  })
);
var Option = styled.button(({ $active, $size, $fullWidth, $variant }) => ({
  position: "relative",
  zIndex: 1,
  flex: $fullWidth ? "1 1 0" : "0 0 auto",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: space.xs,
  minHeight: $size === "sm" ? "36px" : "44px",
  minWidth: $variant === "icon" ? iconSide($size) : void 0,
  padding: $variant === "icon" ? 0 : `0 ${$size === "sm" ? space.md : space.lg}`,
  border: "none",
  borderRadius: v.radius.pill,
  // El fondo de la activa lo pone el Thumb; aquí solo el color del texto.
  background: "transparent",
  color: $active ? v.surface : v.textBody,
  fontFamily: v.font.base,
  fontSize: "14px",
  fontWeight: 600,
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: `color ${transition}`,
  "&:hover:not(:disabled)": { color: $active ? v.surface : v.text },
  "&:disabled": { opacity: 0.55, cursor: "not-allowed" },
  "&:focus-visible": focusVisible,
  ...$variant === "icon" && {
    color: v.text,
    "& > svg": {
      opacity: $active ? 1 : 0.55,
      filter: $active ? "none" : "saturate(0.4)",
      transform: $active ? "scale(1)" : "scale(0.86)",
      transition: `opacity ${SLIDE}, filter ${SLIDE}, transform ${SLIDE}`
    },
    "&:hover:not(:disabled) > svg": { opacity: 1, filter: "none" },
    [reduceMotion]: { "& > svg": { transition: "none" } }
  }
}));
var SuperSegmented = ({
  options,
  value,
  onChange,
  ariaLabel,
  size = "md",
  variant = "default",
  fullWidth = false,
  className
}) => {
  const refs = useRef(/* @__PURE__ */ new Map());
  const trackRef = useRef(null);
  const [box, setBox] = useState(null);
  const [animate, setAnimate] = useState(false);
  const enabled = options.filter((option) => !option.disabled);
  const measure = useCallback(() => {
    const el = refs.current.get(value);
    if (!el) {
      setBox(null);
      return;
    }
    setBox({ x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight });
  }, [value]);
  useLayoutEffect(measure, [measure, options, size, fullWidth]);
  useEffect(() => {
    if (box && !animate) {
      const frame = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(frame);
    }
    return void 0;
  }, [box, animate]);
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return void 0;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);
  const onKeyDown = (event) => {
    const index = enabled.findIndex((option) => option.value === value);
    const keys = {
      ArrowRight: (index + 1) % enabled.length,
      ArrowLeft: (index - 1 + enabled.length) % enabled.length,
      Home: 0,
      End: enabled.length - 1
    };
    const target = enabled[keys[event.key] ?? -1];
    if (!target) return;
    event.preventDefault();
    onChange(target.value);
    refs.current.get(target.value)?.focus();
  };
  return /* @__PURE__ */ jsxs(
    Track,
    {
      ref: trackRef,
      role: "tablist",
      "aria-label": ariaLabel,
      onKeyDown,
      $fullWidth: fullWidth,
      $variant: variant,
      className,
      children: [
        box && /* @__PURE__ */ jsx(
          Thumb,
          {
            "aria-hidden": true,
            $variant: variant,
            $animate: animate,
            style: {
              width: box.width,
              height: box.height,
              transform: `translate(${box.x}px, ${box.y}px)`
            }
          }
        ),
        options.map((option) => {
          const active = option.value === value;
          const iconOnly = variant === "icon" && option.icon !== void 0;
          return /* @__PURE__ */ jsxs(
            Option,
            {
              ref: (el) => {
                if (el) refs.current.set(option.value, el);
                else refs.current.delete(option.value);
              },
              type: "button",
              role: "tab",
              "aria-selected": active,
              "aria-label": iconOnly ? option.label : void 0,
              title: iconOnly ? option.label : void 0,
              tabIndex: active ? 0 : -1,
              disabled: option.disabled,
              $active: active,
              $size: size,
              $fullWidth: fullWidth,
              $variant: variant,
              onClick: () => onChange(option.value),
              children: [
                option.icon,
                !iconOnly && option.label
              ]
            },
            option.value
          );
        })
      ]
    }
  );
};

export { SuperSegmented };
