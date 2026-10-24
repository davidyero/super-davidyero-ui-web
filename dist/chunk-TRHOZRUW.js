import { COLOR_TOKEN_KEYS, DERIVED_COLOR_TOKEN_KEYS } from './chunk-5HHPKIMZ.js';

// src/theme/vars.ts
var kebab = (key) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
var cssVarName = (key) => `--sd-${kebab(key)}`;
var colorVars = Object.fromEntries(
  [...COLOR_TOKEN_KEYS, ...DERIVED_COLOR_TOKEN_KEYS].map((key) => [key, `var(${cssVarName(key)})`])
);
var TEXT_PROPS = {
  fontWeight: "weight",
  lineHeight: "leading",
  letterSpacing: "tracking",
  textTransform: "transform"
};
var textVarName = (variant, prop) => `--sd-text-${kebab(variant)}-${TEXT_PROPS[prop]}`;
var textVar = (variant, prop, fallback) => `var(${textVarName(variant, prop)}, ${fallback})`;
var v = {
  ...colorVars,
  font: {
    base: "var(--sd-font-base)",
    heading: "var(--sd-font-heading)",
    mono: "var(--sd-font-mono)"
  },
  radius: {
    sm: "var(--sd-radius-sm)",
    md: "var(--sd-radius-md)",
    lg: "var(--sd-radius-lg)",
    pill: "var(--sd-radius-pill)"
  },
  shadow: {
    sm: "var(--sd-shadow-sm)",
    md: "var(--sd-shadow-md)",
    lg: "var(--sd-shadow-lg)"
  }
};
var tokensToCssVars = (tokens) => {
  const out = {};
  for (const key of COLOR_TOKEN_KEYS) out[cssVarName(key)] = tokens[key];
  for (const key of DERIVED_COLOR_TOKEN_KEYS) out[cssVarName(key)] = tokens[key];
  for (const [variant, style] of Object.entries(tokens.typography)) {
    for (const [prop, value] of Object.entries(style)) {
      if (value !== void 0) out[textVarName(variant, prop)] = String(value);
    }
  }
  out["--sd-font-base"] = tokens.fontFamily.base;
  out["--sd-font-heading"] = tokens.fontFamily.heading;
  out["--sd-font-mono"] = tokens.fontFamily.mono;
  out["--sd-radius-sm"] = tokens.radius.sm;
  out["--sd-radius-md"] = tokens.radius.md;
  out["--sd-radius-lg"] = tokens.radius.lg;
  out["--sd-radius-pill"] = tokens.radius.pill;
  out["--sd-shadow-sm"] = tokens.shadow.sm;
  out["--sd-shadow-md"] = tokens.shadow.md;
  out["--sd-shadow-lg"] = tokens.shadow.lg;
  return out;
};

export { textVar, tokensToCssVars, v };
