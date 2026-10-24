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
interface SuperTokens extends SuperColorTokens {
    fontFamily: SuperFontTokens;
    radius: SuperRadiusTokens;
    shadow: SuperShadowTokens;
}
/** Lo que pasa una app: cualquier token que omita cae al valor por defecto. */
type SuperTokensInput = Partial<SuperColorTokens> & {
    fontFamily?: Partial<SuperFontTokens>;
    radius?: Partial<SuperRadiusTokens>;
    shadow?: Partial<SuperShadowTokens>;
};
interface SuperThemeTokens {
    light: SuperTokensInput;
    dark: SuperTokensInput;
}
type SuperThemeMode = 'light' | 'dark';
declare const COLOR_TOKEN_KEYS: readonly ["background", "surface", "surfaceSunken", "surfaceElevated", "border", "borderStrong", "text", "textBody", "textMuted", "primary", "primaryHover", "onPrimary", "primarySoft", "primarySoftText", "success", "successSoft", "successText", "warning", "warningSoft", "warningText", "danger", "dangerSoft", "dangerText", "info", "infoSoft", "infoText", "focusRing"];
/** Valores neutros y legibles para que una app arranque sin definir nada. */
declare const DEFAULT_TOKENS: Record<SuperThemeMode, SuperTokens>;
/** Ayuda de tipado para declarar los tokens de una app. */
declare const defineTokens: (tokens: SuperThemeTokens) => SuperThemeTokens;
/** Mezcla los tokens de la app sobre los valores por defecto de ese modo. */
declare const resolveTokens: (mode: SuperThemeMode, input?: SuperTokensInput) => SuperTokens;

export { COLOR_TOKEN_KEYS, DEFAULT_TOKENS, type SuperColorTokens, type SuperFontTokens, type SuperRadiusTokens, type SuperShadowTokens, type SuperThemeMode, type SuperThemeTokens, type SuperTokens, type SuperTokensInput, defineTokens, resolveTokens };
