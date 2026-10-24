import {
  COLOR_TOKEN_KEYS,
  DERIVED_COLOR_TOKEN_KEYS,
  type SuperColorTokens,
  type SuperDerivedColorTokens,
  type SuperTextStyle,
  type SuperTextVariant,
  type SuperTokens,
} from './tokens';

const kebab = (key: string): string => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export const cssVarName = (key: string): string => `--sd-${kebab(key)}`;

type ColorVars = Record<keyof SuperColorTokens | keyof SuperDerivedColorTokens, string>;

const colorVars = Object.fromEntries(
  [...COLOR_TOKEN_KEYS, ...DERIVED_COLOR_TOKEN_KEYS].map((key) => [key, `var(${cssVarName(key)})`]),
) as ColorVars;

const TEXT_PROPS: Record<keyof SuperTextStyle, string> = {
  fontWeight: 'weight',
  lineHeight: 'leading',
  letterSpacing: 'tracking',
  textTransform: 'transform',
};

/** Variable del ajuste tipográfico de una variante, p. ej. `--sd-text-label-weight`. */
export const textVarName = (variant: SuperTextVariant, prop: keyof SuperTextStyle): string =>
  `--sd-text-${kebab(variant)}-${TEXT_PROPS[prop]}`;

/** `var(--sd-text-label-weight, 600)`: el valor de la app o, si no lo define, el de la librería. */
export const textVar = (
  variant: SuperTextVariant,
  prop: keyof SuperTextStyle,
  fallback: string | number,
): string => `var(${textVarName(variant, prop)}, ${fallback})`;

/**
 * Referencias `var(--sd-*)` para usar en los estilos de los componentes. Nunca
 * un color literal: así la misma lógica se ve distinta en cada app.
 */
export const v = {
  ...colorVars,
  font: {
    base: 'var(--sd-font-base)',
    heading: 'var(--sd-font-heading)',
    mono: 'var(--sd-font-mono)',
  },
  radius: {
    sm: 'var(--sd-radius-sm)',
    md: 'var(--sd-radius-md)',
    lg: 'var(--sd-radius-lg)',
    pill: 'var(--sd-radius-pill)',
  },
  shadow: {
    sm: 'var(--sd-shadow-sm)',
    md: 'var(--sd-shadow-md)',
    lg: 'var(--sd-shadow-lg)',
  },
} as const;

/** Convierte un juego de tokens resuelto en declaraciones de variables CSS. */
export const tokensToCssVars = (tokens: SuperTokens): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const key of COLOR_TOKEN_KEYS) out[cssVarName(key)] = tokens[key];
  for (const key of DERIVED_COLOR_TOKEN_KEYS) out[cssVarName(key)] = tokens[key];
  for (const [variant, style] of Object.entries(tokens.typography) as [
    SuperTextVariant,
    SuperTextStyle,
  ][]) {
    for (const [prop, value] of Object.entries(style) as [
      keyof SuperTextStyle,
      string | number,
    ][]) {
      if (value !== undefined) out[textVarName(variant, prop)] = String(value);
    }
  }
  out['--sd-font-base'] = tokens.fontFamily.base;
  out['--sd-font-heading'] = tokens.fontFamily.heading;
  out['--sd-font-mono'] = tokens.fontFamily.mono;
  out['--sd-radius-sm'] = tokens.radius.sm;
  out['--sd-radius-md'] = tokens.radius.md;
  out['--sd-radius-lg'] = tokens.radius.lg;
  out['--sd-radius-pill'] = tokens.radius.pill;
  out['--sd-shadow-sm'] = tokens.shadow.sm;
  out['--sd-shadow-md'] = tokens.shadow.md;
  out['--sd-shadow-lg'] = tokens.shadow.lg;
  return out;
};
