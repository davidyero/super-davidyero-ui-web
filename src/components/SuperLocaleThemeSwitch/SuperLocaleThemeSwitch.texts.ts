import type { SuperLocale, SuperLocaleThemeSwitchLabels } from './SuperLocaleThemeSwitch.types';

/**
 * Textos por defecto del selector, iguales en todas las webs. El nombre accesible va en el
 * idioma activo y dice a qué cambia el botón. Una app solo pasa `labels` para cambiar alguno.
 */
export const SUPER_LOCALE_THEME_SWITCH_TEXTS = {
  es: {
    es: 'Español',
    en: 'English',
    light: 'Claro',
    dark: 'Oscuro',
    switchToEs: 'Cambiar a español',
    switchToEn: 'Cambiar a inglés',
    switchToLight: 'Cambiar a tema claro',
    switchToDark: 'Cambiar a tema oscuro',
    language: 'Idioma',
    theme: 'Tema',
  },
  en: {
    es: 'Español',
    en: 'English',
    light: 'Light',
    dark: 'Dark',
    switchToEs: 'Switch to Spanish',
    switchToEn: 'Switch to English',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    language: 'Language',
    theme: 'Theme',
  },
} as const satisfies Record<SuperLocale, Required<SuperLocaleThemeSwitchLabels>>;
