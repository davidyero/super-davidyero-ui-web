import { Global } from '@emotion/react';
import { useMemo, type ReactElement, type ReactNode } from 'react';
import {
  DEFAULT_ICONS,
  SuperThemeContext,
  type SuperLabels,
  type SuperThemeContextValue,
} from './SuperThemeContext';
import { resolveTokens, type SuperThemeMode, type SuperThemeTokens } from './tokens';
import { tokensToCssVars } from './vars';

export interface SuperThemeProviderProps {
  /** Tokens de la app para claro y oscuro. Lo que falte cae a los valores por defecto. */
  tokens?: SuperThemeTokens;
  mode: SuperThemeMode;
  /** Textos accesibles desde el i18n de la app. */
  labels: SuperLabels;
  /** Registro de iconos de la app: nombre semántico → id de Iconify (`solar:home-2-broken`). */
  icons?: Readonly<Record<string, string>>;
  children: ReactNode;
}

/**
 * Monta el design system: escribe los tokens del modo activo como variables
 * CSS `--sd-*` en `:root` y da a los componentes los textos e iconos.
 * Se monta UNA vez en la raíz.
 */
export const SuperThemeProvider = ({
  tokens,
  mode,
  labels,
  icons,
  children,
}: SuperThemeProviderProps): ReactElement => {
  const vars = useMemo(() => tokensToCssVars(resolveTokens(mode, tokens?.[mode])), [mode, tokens]);
  const value = useMemo<SuperThemeContextValue>(
    () => ({ mode, labels, icons: { ...DEFAULT_ICONS, ...icons } }),
    [mode, labels, icons],
  );

  return (
    <SuperThemeContext.Provider value={value}>
      <Global
        styles={{
          ':root': { ...vars, colorScheme: mode },
          '@keyframes sd-spin': { to: { transform: 'rotate(360deg)' } },
          '@keyframes sd-shimmer': {
            '0%': { backgroundPosition: '200% 0' },
            '100%': { backgroundPosition: '-200% 0' },
          },
        }}
      />
      {children}
    </SuperThemeContext.Provider>
  );
};

export { defineTokens, DEFAULT_TOKENS, resolveTokens } from './tokens';
export type {
  SuperThemeMode,
  SuperThemeTokens,
  SuperTokens,
  SuperTokensInput,
  SuperColorTokens,
  SuperDerivedColorTokens,
  SuperTextStyle,
  SuperTextTokens,
  SuperTextVariant,
} from './tokens';
export { useSuperTheme, useSuperLabels, DEFAULT_ICONS } from './SuperThemeContext';
export type { SuperLabels } from './SuperThemeContext';
