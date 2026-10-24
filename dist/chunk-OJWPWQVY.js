import { v } from './chunk-BSDVG7PM.js';

// src/styles/scale.ts
var space = {
  xxs: "4px",
  xs: "6px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "32px"
};
var textScale = {
  display: { fontSize: "32px", lineHeight: 1.2, fontWeight: 700, heading: true },
  h1: { fontSize: "24px", lineHeight: 1.25, fontWeight: 700, heading: true },
  h2: { fontSize: "20px", lineHeight: 1.3, fontWeight: 700, heading: true },
  h3: { fontSize: "17px", lineHeight: 1.35, fontWeight: 600, heading: true },
  h4: { fontSize: "16px", lineHeight: 1.4, fontWeight: 600, heading: true },
  h5: { fontSize: "15px", lineHeight: 1.4, fontWeight: 600, heading: true },
  h6: { fontSize: "14px", lineHeight: 1.4, fontWeight: 600, heading: true },
  title: { fontSize: "18px", lineHeight: 1.35, fontWeight: 600, heading: true },
  subtitle: { fontSize: "15px", lineHeight: 1.45, fontWeight: 500, heading: false },
  body: { fontSize: "14px", lineHeight: 1.55, fontWeight: 400, heading: false },
  bodySmall: { fontSize: "13px", lineHeight: 1.5, fontWeight: 400, heading: false },
  caption: { fontSize: "13px", lineHeight: 1.45, fontWeight: 400, heading: false },
  label: { fontSize: "13px", lineHeight: 1.4, fontWeight: 600, heading: false }
};
var fontWeight = { regular: 400, medium: 500, semibold: 600, bold: 700 };
var zIndex = { dropdown: 800, modal: 1e3, toast: 1200, overlay: 1400 };
var transition = "150ms ease";
var focusVisible = {
  outline: "none",
  boxShadow: `0 0 0 3px ${v.focusRing}`
};

export { focusVisible, fontWeight, space, textScale, transition, zIndex };
