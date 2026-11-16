import { ReactElement } from 'react';
import { SuperPrefToggleVariant } from './SuperPrefToggle.js';

type SuperLocale = 'es' | 'en';
type SuperColorMode = 'light' | 'dark';
/** Textos del selector, desde el i18n de la app (EN/ES). La librería no trae textos. */
interface SuperLocaleThemeSwitchLabels {
    /** Nombres visibles con `showLabels` ("Español", "Claro"…). */
    es: string;
    en: string;
    light: string;
    dark: string;
    /** Nombre accesible y `title` según a qué cambia el botón ("Cambiar a English"). */
    switchToEs: string;
    switchToEn: string;
    switchToLight: string;
    switchToDark: string;
    /** Nombre accesible de cada píldora en `look="segmented"` ("Idioma", "Tema"). */
    language?: string;
    theme?: string;
}
interface SuperLocaleThemeSwitchProps {
    /** Bandera del idioma activo: Colombia = español, EE. UU. = inglés. */
    locale: SuperLocale;
    /** Recibe el idioma nuevo; la app lo aplica (i18n, perfil…). */
    onLocaleChange: (next: SuperLocale) => void;
    mode: SuperColorMode;
    onModeChange: (next: SuperColorMode) => void;
    labels: SuperLocaleThemeSwitchLabels;
    /** soft = gris (sobre hojas y tarjetas, por defecto); surface = superficie con sombra. */
    variant?: SuperPrefToggleVariant;
    /** end = arriba a la derecha (login, registro); start = dentro de un bloque (menú). */
    align?: 'start' | 'end';
    /** Muestra el nombre del idioma y del tema junto al glifo (Ajustes). Solo en `toggle`. */
    showLabels?: boolean;
    /** `toggle`: un botón por preferencia (Gazella). `segmented`: las dos opciones a la vista. */
    look?: 'toggle' | 'segmented';
    /** Tamaño de las píldoras en `look="segmented"`: `sm` (36 px, cabeceras) o `md` (44 px). */
    size?: 'sm' | 'md';
    className?: string;
}

/**
 * Idioma y tema en dos botones de un clic (login, registro, barra superior, menú, Ajustes).
 * No depende de ningún store: la app pasa el estado y aplica el cambio.
 */
declare const SuperLocaleThemeSwitch: ({ locale, onLocaleChange, mode, onModeChange, labels, variant, align, showLabels, look, size, className, }: SuperLocaleThemeSwitchProps) => ReactElement;

export { SuperLocaleThemeSwitch };
export type { SuperColorMode, SuperLocale, SuperLocaleThemeSwitchLabels, SuperLocaleThemeSwitchProps };
