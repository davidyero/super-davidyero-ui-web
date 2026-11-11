import { useSuperTheme } from './chunk-3YBGSPOJ.js';
import { SuperTypography } from './chunk-6OHDPNJ7.js';
import { transition, space } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var PREF_TOGGLE_SIZE = "44px";
var PREF_GLYPH_SIZE = 22;
var PREF_COLORS = {
  sun: { light: "#f28c18", dark: "#ffa53a" },
  night: "#2d3070",
  moon: "#ffd36b",
  onNight: "#ffffff"
};
var Button = styled.button(({ $variant, $withLabel, $tone }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: space.sm,
  flexShrink: 0,
  minWidth: PREF_TOGGLE_SIZE,
  height: PREF_TOGGLE_SIZE,
  padding: $withLabel ? `0 ${space.lg} 0 ${space.md}` : 0,
  border: 0,
  borderRadius: v.radius.pill,
  background: $tone === "night" ? PREF_COLORS.night : $variant === "soft" ? v.surfaceSunken : v.surface,
  color: $tone === "night" ? PREF_COLORS.onNight : v.text,
  boxShadow: $variant === "surface" ? v.shadow.md : "none",
  font: "inherit",
  cursor: "pointer",
  transition: `transform ${transition}`,
  "&:hover": { transform: "translateY(-1px)" },
  "&:active": { transform: "scale(0.94)" },
  "&:focus-visible": { outline: `2px solid ${v.focusRing}`, outlineOffset: "2px" }
}));
var swap = keyframes({
  from: { opacity: 0, transform: "rotate(-90deg) scale(0.6)" }
});
var Glyph = styled.span(
  ({ $tone, $mode }) => ({
    display: "inline-flex",
    color: $tone === "sun" ? PREF_COLORS.sun[$mode] : $tone === "night" ? PREF_COLORS.moon : "inherit",
    animation: `${swap} 300ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
    "@media (prefers-reduced-motion: reduce)": { animation: "none" }
  })
);
var SuperPrefToggle = ({
  glyph,
  glyphKey,
  ariaLabel,
  label,
  variant = "soft",
  tone,
  onClick,
  className
}) => {
  const { mode } = useSuperTheme();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      type: "button",
      "aria-label": ariaLabel,
      title: ariaLabel,
      onClick,
      $variant: variant,
      $withLabel: Boolean(label),
      $tone: tone,
      className,
      children: [
        /* @__PURE__ */ jsx(Glyph, { "aria-hidden": true, $tone: tone, $mode: mode, children: glyph }, glyphKey),
        label ? /* @__PURE__ */ jsx(SuperTypography, { variant: "body", weight: "semibold", color: "inherit", as: "span", children: label }) : null
      ]
    }
  );
};

export { PREF_COLORS, PREF_GLYPH_SIZE, SuperPrefToggle };
