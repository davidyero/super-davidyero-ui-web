import type { SuperPrefToggleVariant } from '../SuperPrefToggle/SuperPrefToggle.types';

export type SuperLocale = 'es' | 'en';
export type SuperColorMode = 'light' | 'dark';

/**
 * Textos del selector. Por defecto salen de `SUPER_LOCALE_THEME_SWITCH_TEXTS` según `locale`,
 * iguales en todas las webs; la app solo pasa los que quiera cambiar.
 */
export interface SuperLocaleThemeSwitchLabels {
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

export interface SuperLocaleThemeSwitchProps {
  /** Bandera del idioma activo: Colombia = español, EE. UU. = inglés. */
  locale: SuperLocale;
  /** Recibe el idioma nuevo; la app lo aplica (i18n, perfil…). */
  onLocaleChange: (next: SuperLocale) => void;
  mode: SuperColorMode;
  onModeChange: (next: SuperColorMode) => void;
  /** Opcional: por defecto, los textos comunes en el idioma de `locale`. */
  labels?: Partial<SuperLocaleThemeSwitchLabels>;
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
