import { ComponentType, AnchorHTMLAttributes, ReactNode, ReactElement } from 'react';
import { SuperThemeMode, SuperThemeTokens } from './tokens.js';
export { DEFAULT_TOKENS, SuperColorTokens, SuperDerivedColorTokens, SuperTextStyle, SuperTextTokens, SuperTextVariant, SuperTokens, SuperTokensInput, defineTokens, resolveTokens } from './tokens.js';

/**
 * Textos accesibles que necesitan los componentes. La librería NO trae textos
 * en ningún idioma: la app los pasa desde su i18n (EN/ES).
 */
interface SuperLabels {
    showPassword: string;
    hidePassword: string;
    close: string;
    loading: string;
    dismiss: string;
    /** Botón de vaciar un campo (`SuperInput` con `onClear`). Opcional: si falta, se usa `close`. */
    clear?: string;
}
/** Iconos internos de la librería (nombre semántico → id de Iconify). */
declare const DEFAULT_ICONS: {
    readonly eye: "solar:eye-broken";
    readonly eyeOff: "solar:eye-closed-broken";
    readonly close: "solar:close-circle-broken";
    readonly check: "solar:check-circle-broken";
    readonly chevronDown: "solar:alt-arrow-down-broken";
    readonly info: "solar:info-circle-broken";
    readonly success: "solar:check-circle-broken";
    readonly warning: "solar:danger-triangle-broken";
    readonly danger: "solar:close-circle-broken";
    readonly empty: "solar:box-minimalistic-broken";
};
/**
 * Enlace interno de la app (p. ej. un wrapper de `Link` de React Router que
 * traduce `href` a `to`). Si se pasa, `SuperButton href="/ruta"` navega sin
 * recargar; los enlaces externos siguen siendo `<a target="_blank">`.
 */
type SuperLinkComponent = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children?: ReactNode;
}>;
interface SuperThemeContextValue {
    mode: SuperThemeMode;
    labels: SuperLabels;
    icons: Readonly<Record<string, string>>;
    LinkComponent?: SuperLinkComponent;
}
declare const useSuperTheme: () => SuperThemeContextValue;
declare const useSuperLabels: () => SuperLabels;

interface SuperThemeProviderProps {
    /** Tokens de la app para claro y oscuro. Lo que falte cae a los valores por defecto. */
    tokens?: SuperThemeTokens;
    mode: SuperThemeMode;
    /** Textos accesibles desde el i18n de la app. */
    labels: SuperLabels;
    /** Registro de iconos de la app: nombre semántico → id de Iconify (`solar:home-2-broken`). */
    icons?: Readonly<Record<string, string>>;
    /** Enlace interno de la app para `SuperButton href` (ver `SuperLinkComponent`). */
    LinkComponent?: SuperLinkComponent;
    children: ReactNode;
}
/**
 * Monta el design system: escribe los tokens del modo activo como variables
 * CSS `--sd-*` en `:root` y da a los componentes los textos e iconos.
 * Se monta UNA vez en la raíz.
 */
declare const SuperThemeProvider: ({ tokens, mode, labels, icons, LinkComponent, children, }: SuperThemeProviderProps) => ReactElement;

export { DEFAULT_ICONS, type SuperLabels, type SuperLinkComponent, SuperThemeMode, SuperThemeProvider, type SuperThemeProviderProps, SuperThemeTokens, useSuperLabels, useSuperTheme };
