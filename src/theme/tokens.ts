/**
 * Contrato de tokens del design system. Cada app define los suyos (claro y
 * oscuro) y `SuperThemeProvider` los escribe como variables CSS `--sd-*`.
 *
 * Reglas de contraste (ver ~/.claude/CLAUDE.md):
 * - `onPrimary` es SOLO para texto sobre `primary` pleno.
 * - Cada fondo soft tiene su texto: primarySoft→primarySoftText,
 *   successSoft→successText, warningSoft→warningText, dangerSoft→dangerText,
 *   infoSoft→infoText.
 */
export interface SuperColorTokens {
  background: string;
  surface: string;
  surfaceSunken: string;
  surfaceElevated: string;
  border: string;
  borderStrong: string;
  text: string;
  textBody: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  onPrimary: string;
  primarySoft: string;
  primarySoftText: string;
  success: string;
  successSoft: string;
  successText: string;
  warning: string;
  warningSoft: string;
  warningText: string;
  danger: string;
  dangerSoft: string;
  dangerText: string;
  info: string;
  infoSoft: string;
  infoText: string;
  focusRing: string;
}

export interface SuperFontTokens {
  base: string;
  heading: string;
  mono: string;
}

export interface SuperRadiusTokens {
  sm: string;
  md: string;
  lg: string;
  pill: string;
}

export interface SuperShadowTokens {
  sm: string;
  md: string;
  lg: string;
}

export interface SuperTokens extends SuperColorTokens {
  fontFamily: SuperFontTokens;
  radius: SuperRadiusTokens;
  shadow: SuperShadowTokens;
}

/** Lo que pasa una app: cualquier token que omita cae al valor por defecto. */
export type SuperTokensInput = Partial<SuperColorTokens> & {
  fontFamily?: Partial<SuperFontTokens>;
  radius?: Partial<SuperRadiusTokens>;
  shadow?: Partial<SuperShadowTokens>;
};

export interface SuperThemeTokens {
  light: SuperTokensInput;
  dark: SuperTokensInput;
}

export type SuperThemeMode = 'light' | 'dark';

export const COLOR_TOKEN_KEYS = [
  'background',
  'surface',
  'surfaceSunken',
  'surfaceElevated',
  'border',
  'borderStrong',
  'text',
  'textBody',
  'textMuted',
  'primary',
  'primaryHover',
  'onPrimary',
  'primarySoft',
  'primarySoftText',
  'success',
  'successSoft',
  'successText',
  'warning',
  'warningSoft',
  'warningText',
  'danger',
  'dangerSoft',
  'dangerText',
  'info',
  'infoSoft',
  'infoText',
  'focusRing',
] as const satisfies ReadonlyArray<keyof SuperColorTokens>;

const fonts: SuperFontTokens = {
  base: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  heading: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
};

const radius: SuperRadiusTokens = { sm: '6px', md: '10px', lg: '16px', pill: '999px' };

/** Valores neutros y legibles para que una app arranque sin definir nada. */
export const DEFAULT_TOKENS: Record<SuperThemeMode, SuperTokens> = {
  light: {
    background: '#f6f7f9',
    surface: '#ffffff',
    surfaceSunken: '#eef0f3',
    surfaceElevated: '#ffffff',
    border: '#e2e5ea',
    borderStrong: '#c9ced6',
    text: '#111827',
    textBody: '#374151',
    textMuted: '#5b6472',
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    onPrimary: '#ffffff',
    primarySoft: '#eef0ff',
    primarySoftText: '#3730a3',
    success: '#15803d',
    successSoft: '#e7f6ec',
    successText: '#166534',
    warning: '#b45309',
    warningSoft: '#fdf3e2',
    warningText: '#92400e',
    danger: '#dc2626',
    dangerSoft: '#fdecec',
    dangerText: '#991b1b',
    info: '#0369a1',
    infoSoft: '#e6f3fa',
    infoText: '#075985',
    focusRing: 'rgba(79, 70, 229, 0.45)',
    fontFamily: fonts,
    radius,
    shadow: {
      sm: '0 1px 2px rgba(17, 24, 39, 0.06)',
      md: '0 4px 12px rgba(17, 24, 39, 0.08)',
      lg: '0 12px 32px rgba(17, 24, 39, 0.14)',
    },
  },
  dark: {
    background: '#0d0f14',
    surface: '#151821',
    surfaceSunken: '#10131a',
    surfaceElevated: '#1c2030',
    border: '#262b38',
    borderStrong: '#3a4152',
    text: '#f3f4f6',
    textBody: '#d1d5db',
    textMuted: '#9aa3b2',
    primary: '#818cf8',
    primaryHover: '#a5b4fc',
    onPrimary: '#0d0f14',
    primarySoft: '#23264a',
    primarySoftText: '#c7d2fe',
    success: '#4ade80',
    successSoft: '#12291c',
    successText: '#86efac',
    warning: '#fbbf24',
    warningSoft: '#2d220c',
    warningText: '#fcd34d',
    danger: '#f87171',
    dangerSoft: '#311416',
    dangerText: '#fca5a5',
    info: '#38bdf8',
    infoSoft: '#0c2533',
    infoText: '#7dd3fc',
    focusRing: 'rgba(129, 140, 248, 0.55)',
    fontFamily: fonts,
    radius,
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.4)',
      md: '0 4px 12px rgba(0, 0, 0, 0.45)',
      lg: '0 12px 32px rgba(0, 0, 0, 0.55)',
    },
  },
};

/** Ayuda de tipado para declarar los tokens de una app. */
export const defineTokens = (tokens: SuperThemeTokens): SuperThemeTokens => tokens;

/** Mezcla los tokens de la app sobre los valores por defecto de ese modo. */
export const resolveTokens = (mode: SuperThemeMode, input: SuperTokensInput = {}): SuperTokens => {
  const base = DEFAULT_TOKENS[mode];
  const { fontFamily, radius: r, shadow, ...colors } = input;
  return {
    ...base,
    ...colors,
    fontFamily: { ...base.fontFamily, ...fontFamily },
    radius: { ...base.radius, ...r },
    shadow: { ...base.shadow, ...shadow },
  };
};
