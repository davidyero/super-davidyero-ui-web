// src/theme/tokens.ts
var COLOR_TOKEN_KEYS = [
  "background",
  "surface",
  "surfaceSunken",
  "surfaceElevated",
  "border",
  "borderStrong",
  "text",
  "textBody",
  "textMuted",
  "primary",
  "primaryHover",
  "onPrimary",
  "primarySoft",
  "primarySoftText",
  "success",
  "successSoft",
  "successText",
  "warning",
  "warningSoft",
  "warningText",
  "danger",
  "dangerSoft",
  "dangerText",
  "info",
  "infoSoft",
  "infoText",
  "focusRing"
];
var DERIVED_COLOR_TOKEN_KEYS = [
  "accent",
  "accentSoft",
  "onAccent",
  "textSubtle",
  "surfaceField"
];
var fonts = {
  base: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  heading: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
};
var radius = { sm: "6px", md: "10px", lg: "16px", pill: "999px" };
var DEFAULT_TOKENS = {
  light: {
    background: "#f6f7f9",
    surface: "#ffffff",
    surfaceSunken: "#eef0f3",
    surfaceElevated: "#ffffff",
    border: "#e2e5ea",
    borderStrong: "#c9ced6",
    text: "#111827",
    textBody: "#374151",
    textMuted: "#5b6472",
    primary: "#4f46e5",
    primaryHover: "#4338ca",
    onPrimary: "#ffffff",
    primarySoft: "#eef0ff",
    primarySoftText: "#3730a3",
    success: "#15803d",
    successSoft: "#e7f6ec",
    successText: "#166534",
    warning: "#b45309",
    warningSoft: "#fdf3e2",
    warningText: "#92400e",
    danger: "#dc2626",
    dangerSoft: "#fdecec",
    dangerText: "#991b1b",
    info: "#0369a1",
    infoSoft: "#e6f3fa",
    infoText: "#075985",
    focusRing: "rgba(79, 70, 229, 0.45)",
    fontFamily: fonts,
    radius,
    shadow: {
      sm: "0 1px 2px rgba(17, 24, 39, 0.06)",
      md: "0 4px 12px rgba(17, 24, 39, 0.08)",
      lg: "0 12px 32px rgba(17, 24, 39, 0.14)"
    }
  },
  dark: {
    background: "#0d0f14",
    surface: "#151821",
    surfaceSunken: "#10131a",
    surfaceElevated: "#1c2030",
    border: "#262b38",
    borderStrong: "#3a4152",
    text: "#f3f4f6",
    textBody: "#d1d5db",
    textMuted: "#9aa3b2",
    primary: "#818cf8",
    primaryHover: "#a5b4fc",
    onPrimary: "#0d0f14",
    primarySoft: "#23264a",
    primarySoftText: "#c7d2fe",
    success: "#4ade80",
    successSoft: "#12291c",
    successText: "#86efac",
    warning: "#fbbf24",
    warningSoft: "#2d220c",
    warningText: "#fcd34d",
    danger: "#f87171",
    dangerSoft: "#311416",
    dangerText: "#fca5a5",
    info: "#38bdf8",
    infoSoft: "#0c2533",
    infoText: "#7dd3fc",
    focusRing: "rgba(129, 140, 248, 0.55)",
    fontFamily: fonts,
    radius,
    shadow: {
      sm: "0 1px 2px rgba(0, 0, 0, 0.4)",
      md: "0 4px 12px rgba(0, 0, 0, 0.45)",
      lg: "0 12px 32px rgba(0, 0, 0, 0.55)"
    }
  }
};
var defineTokens = (tokens) => tokens;
var resolveTokens = (mode, input = {}) => {
  const base = DEFAULT_TOKENS[mode];
  const {
    fontFamily,
    radius: r,
    shadow,
    typography,
    accent,
    accentSoft,
    onAccent,
    textSubtle,
    surfaceField,
    ...colors
  } = input;
  const merged = {
    ...base,
    ...colors,
    fontFamily: { ...base.fontFamily, ...fontFamily },
    radius: { ...base.radius, ...r },
    shadow: { ...base.shadow, ...shadow }
  };
  return {
    ...merged,
    accent: accent ?? merged.primary,
    accentSoft: accentSoft ?? merged.primarySoft,
    onAccent: onAccent ?? merged.onPrimary,
    textSubtle: textSubtle ?? merged.textMuted,
    surfaceField: surfaceField ?? merged.surface,
    typography: typography ?? {}
  };
};

export { COLOR_TOKEN_KEYS, DEFAULT_TOKENS, DERIVED_COLOR_TOKEN_KEYS, defineTokens, resolveTokens };
