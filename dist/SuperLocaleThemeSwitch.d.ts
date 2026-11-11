import { ReactElement } from 'react';
import { SuperPrefToggleVariant } from './SuperPrefToggle.js';

type SuperLocale = 'es' | 'en';
type SuperColorMode = 'light' | 'dark';
/** Textos del selector, desde el i18n de la app (EN/ES). La librería no trae textos. */
interface SuperLocaleThemeSwitchLabels {
    /** Nombre de cada idioma ("Español", "English"): se ve con `showLabels`. */
    es: string;
    en: string;
    /** Nombre de cada tema ("Claro", "Oscuro"): se ve con `showLabels`. */
    light: string;
    dark: string;
    /** Accesible y `title` del botón de idioma según a cuál cambia ("Cambiar a English"). */
    switchToEs: string;
    switchToEn: string;
    /** Accesible y `title` del botón de tema según a cuál cambia ("Cambiar a tema oscuro"). */
    switchToLight: string;
    switchToDark: string;
}
interface SuperLocaleThemeSwitchProps {
    /** Idioma activo: se ve su bandera (Colombia = español, EE. UU. = inglés). */
    locale: SuperLocale;
    /** Recibe el OTRO idioma al hacer clic. La app lo aplica (i18n, perfil…). */
    onLocaleChange: (next: SuperLocale) => void;
    /** Tema activo: sol en claro, luna en oscuro. */
    mode: SuperColorMode;
    /** Recibe el OTRO tema al hacer clic. La app lo guarda en su store. */
    onModeChange: (next: SuperColorMode) => void;
    labels: SuperLocaleThemeSwitchLabels;
    /** soft = gris (sobre hojas y tarjetas, por defecto); surface = superficie con sombra. */
    variant?: SuperPrefToggleVariant;
    /** end = arriba a la derecha (login, registro); start = dentro de un bloque (menú). */
    align?: 'start' | 'end';
    /** Muestra el nombre del idioma y del tema junto al glifo (Ajustes). */
    showLabels?: boolean;
    className?: string;
}

/**
 * Idioma y tema en dos botones de un clic (login, registro, barra superior, menú, Ajustes).
 * No depende de ningún store: la app pasa el estado y aplica el cambio.
 */
declare const SuperLocaleThemeSwitch: ({ locale, onLocaleChange, mode, onModeChange, labels, variant, align, showLabels, className, }: SuperLocaleThemeSwitchProps) => ReactElement;

export { SuperLocaleThemeSwitch };
export type { SuperColorMode, SuperLocale, SuperLocaleThemeSwitchLabels, SuperLocaleThemeSwitchProps };
