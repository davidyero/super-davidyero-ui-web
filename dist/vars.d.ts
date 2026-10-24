import { SuperTextVariant, SuperTextStyle, SuperTokens } from './tokens.js';

declare const cssVarName: (key: string) => string;
/** Variable del ajuste tipográfico de una variante, p. ej. `--sd-text-label-weight`. */
declare const textVarName: (variant: SuperTextVariant, prop: keyof SuperTextStyle) => string;
/** `var(--sd-text-label-weight, 600)`: el valor de la app o, si no lo define, el de la librería. */
declare const textVar: (variant: SuperTextVariant, prop: keyof SuperTextStyle, fallback: string | number) => string;
/**
 * Referencias `var(--sd-*)` para usar en los estilos de los componentes. Nunca
 * un color literal: así la misma lógica se ve distinta en cada app.
 */
declare const v: {
    readonly font: {
        readonly base: "var(--sd-font-base)";
        readonly heading: "var(--sd-font-heading)";
        readonly mono: "var(--sd-font-mono)";
    };
    readonly radius: {
        readonly sm: "var(--sd-radius-sm)";
        readonly md: "var(--sd-radius-md)";
        readonly lg: "var(--sd-radius-lg)";
        readonly pill: "var(--sd-radius-pill)";
    };
    readonly shadow: {
        readonly sm: "var(--sd-shadow-sm)";
        readonly md: "var(--sd-shadow-md)";
        readonly lg: "var(--sd-shadow-lg)";
    };
    readonly info: string;
    readonly success: string;
    readonly warning: string;
    readonly danger: string;
    readonly text: string;
    readonly background: string;
    readonly border: string;
    readonly surface: string;
    readonly surfaceSunken: string;
    readonly surfaceElevated: string;
    readonly borderStrong: string;
    readonly textBody: string;
    readonly textMuted: string;
    readonly primary: string;
    readonly primaryHover: string;
    readonly onPrimary: string;
    readonly primarySoft: string;
    readonly primarySoftText: string;
    readonly successSoft: string;
    readonly successText: string;
    readonly warningSoft: string;
    readonly warningText: string;
    readonly dangerSoft: string;
    readonly dangerText: string;
    readonly infoSoft: string;
    readonly infoText: string;
    readonly focusRing: string;
    readonly accent: string;
    readonly accentSoft: string;
    readonly onAccent: string;
    readonly textSubtle: string;
    readonly surfaceField: string;
};
/** Convierte un juego de tokens resuelto en declaraciones de variables CSS. */
declare const tokensToCssVars: (tokens: SuperTokens) => Record<string, string>;

export { cssVarName, textVar, textVarName, tokensToCssVars, v };
