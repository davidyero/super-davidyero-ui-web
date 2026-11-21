import { ReactElement } from 'react';
import { S as SuperLocaleThemeSwitchProps } from './SuperLocaleThemeSwitch.types-qskrDb2V.js';
export { a as SuperColorMode, b as SuperLocale, c as SuperLocaleThemeSwitchLabels } from './SuperLocaleThemeSwitch.types-qskrDb2V.js';
import './SuperPrefToggle.types-BtDC1Jro.js';

/**
 * Textos por defecto del selector, iguales en todas las webs. El nombre accesible va en el
 * idioma activo y dice a qué cambia el botón. Una app solo pasa `labels` para cambiar alguno.
 */
declare const SUPER_LOCALE_THEME_SWITCH_TEXTS: {
    readonly es: {
        readonly es: "Español";
        readonly en: "English";
        readonly light: "Claro";
        readonly dark: "Oscuro";
        readonly switchToEs: "Cambiar a español";
        readonly switchToEn: "Cambiar a inglés";
        readonly switchToLight: "Cambiar a tema claro";
        readonly switchToDark: "Cambiar a tema oscuro";
        readonly language: "Idioma";
        readonly theme: "Tema";
    };
    readonly en: {
        readonly es: "Español";
        readonly en: "English";
        readonly light: "Light";
        readonly dark: "Dark";
        readonly switchToEs: "Switch to Spanish";
        readonly switchToEn: "Switch to English";
        readonly switchToLight: "Switch to light theme";
        readonly switchToDark: "Switch to dark theme";
        readonly language: "Language";
        readonly theme: "Theme";
    };
};

/**
 * Idioma y tema en dos botones de un clic (login, registro, barra superior, menú, Ajustes).
 * No depende de ningún store: la app pasa el estado y aplica el cambio.
 */
declare const SuperLocaleThemeSwitch: ({ locale, onLocaleChange, mode, onModeChange, labels: custom, variant, align, showLabels, look, size, className, }: SuperLocaleThemeSwitchProps) => ReactElement;

export { SUPER_LOCALE_THEME_SWITCH_TEXTS, SuperLocaleThemeSwitch, SuperLocaleThemeSwitchProps };
