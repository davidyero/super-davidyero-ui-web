import { createContext, useContext } from 'react';
import type { SuperThemeMode } from './tokens';

/**
 * Textos accesibles que necesitan los componentes. La librería NO trae textos
 * en ningún idioma: la app los pasa desde su i18n (EN/ES).
 */
export interface SuperLabels {
  showPassword: string;
  hidePassword: string;
  close: string;
  loading: string;
  dismiss: string;
}

/** Iconos internos de la librería (nombre semántico → id de Iconify). */
export const DEFAULT_ICONS = {
  eye: 'solar:eye-broken',
  eyeOff: 'solar:eye-closed-broken',
  close: 'solar:close-circle-broken',
  check: 'solar:check-circle-broken',
  chevronDown: 'solar:alt-arrow-down-broken',
  info: 'solar:info-circle-broken',
  success: 'solar:check-circle-broken',
  warning: 'solar:danger-triangle-broken',
  danger: 'solar:close-circle-broken',
  empty: 'solar:box-minimalistic-broken',
} as const satisfies Record<string, string>;

export interface SuperThemeContextValue {
  mode: SuperThemeMode;
  labels: SuperLabels;
  icons: Readonly<Record<string, string>>;
}

export const SuperThemeContext = createContext<SuperThemeContextValue | null>(null);

export const useSuperTheme = (): SuperThemeContextValue => {
  const ctx = useContext(SuperThemeContext);
  if (!ctx) {
    throw new Error(
      '@davidyero/ui-web: falta <SuperThemeProvider> en la raíz de la app (pasa tokens, mode y labels).',
    );
  }
  return ctx;
};

export const useSuperLabels = (): SuperLabels => useSuperTheme().labels;
