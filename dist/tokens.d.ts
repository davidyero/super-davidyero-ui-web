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
interface SuperColorTokens {
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
/**
 * Tokens opcionales que, si la app no los define, se derivan de otros:
 * - `accent`/`accentSoft`/`onAccent`: color de marca distinto del de acción
 *   (`primary`). Por defecto, iguales a `primary`/`primarySoft`/`onPrimary`.
 * - `textSubtle`: cuarto nivel de texto (pistas, metadatos). Por defecto, `textMuted`.
 * - `surfaceField`: fondo de los campos (input, textarea, select). Por defecto, `surface`.
 */
interface SuperDerivedColorTokens {
    accent: string;
    accentSoft: string;
    onAccent: string;
    textSubtle: string;
    surfaceField: string;
}
/**
 * Ajuste de una variante tipográfica por app. El tamaño NO se toca (la escala
 * es única y no baja de 13px): solo peso, interlineado, tracking y mayúsculas.
 */
interface SuperTextStyle {
    fontWeight?: number;
    lineHeight?: string | number;
    letterSpacing?: string;
    textTransform?: 'none' | 'uppercase';
}
type SuperTextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title' | 'subtitle' | 'body' | 'bodySmall' | 'caption' | 'label';
type SuperTextTokens = Partial<Record<SuperTextVariant, SuperTextStyle>>;
interface SuperFontTokens {
    base: string;
    heading: string;
    mono: string;
}
interface SuperRadiusTokens {
    sm: string;
    md: string;
    lg: string;
    pill: string;
}
interface SuperShadowTokens {
    sm: string;
    md: string;
    lg: string;
}
interface SuperBaseTokens extends SuperColorTokens {
    fontFamily: SuperFontTokens;
    radius: SuperRadiusTokens;
    shadow: SuperShadowTokens;
}
interface SuperTokens extends SuperBaseTokens, SuperDerivedColorTokens {
    typography: SuperTextTokens;
}
/** Lo que pasa una app: cualquier token que omita cae al valor por defecto. */
type SuperTokensInput = Partial<SuperColorTokens> & Partial<SuperDerivedColorTokens> & {
    fontFamily?: Partial<SuperFontTokens>;
    radius?: Partial<SuperRadiusTokens>;
    shadow?: Partial<SuperShadowTokens>;
    typography?: SuperTextTokens;
};
interface SuperThemeTokens {
    light: SuperTokensInput;
    dark: SuperTokensInput;
}
type SuperThemeMode = 'light' | 'dark';
declare const COLOR_TOKEN_KEYS: readonly ["background", "surface", "surfaceSunken", "surfaceElevated", "border", "borderStrong", "text", "textBody", "textMuted", "primary", "primaryHover", "onPrimary", "primarySoft", "primarySoftText", "success", "successSoft", "successText", "warning", "warningSoft", "warningText", "danger", "dangerSoft", "dangerText", "info", "infoSoft", "infoText", "focusRing"];
declare const DERIVED_COLOR_TOKEN_KEYS: readonly ["accent", "accentSoft", "onAccent", "textSubtle", "surfaceField"];
/** Valores neutros y legibles para que una app arranque sin definir nada. */
declare const DEFAULT_TOKENS: Record<SuperThemeMode, SuperBaseTokens>;
/** Ayuda de tipado para declarar los tokens de una app. */
declare const defineTokens: (tokens: SuperThemeTokens) => SuperThemeTokens;
/** Mezcla los tokens de la app sobre los valores por defecto de ese modo. */
declare const resolveTokens: (mode: SuperThemeMode, input?: SuperTokensInput) => SuperTokens;

export { COLOR_TOKEN_KEYS, DEFAULT_TOKENS, DERIVED_COLOR_TOKEN_KEYS, type SuperColorTokens, type SuperDerivedColorTokens, type SuperFontTokens, type SuperRadiusTokens, type SuperShadowTokens, type SuperTextStyle, type SuperTextTokens, type SuperTextVariant, type SuperThemeMode, type SuperThemeTokens, type SuperTokens, type SuperTokensInput, defineTokens, resolveTokens };
