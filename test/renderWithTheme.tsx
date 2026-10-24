import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import type { SuperLabels } from '../src/theme/SuperThemeContext';
import type { SuperThemeMode, SuperThemeTokens } from '../src/theme/tokens';

export const TEST_LABELS: SuperLabels = {
  showPassword: 'Mostrar contraseña',
  hidePassword: 'Ocultar contraseña',
  close: 'Cerrar',
  loading: 'Cargando',
  dismiss: 'Descartar',
};

export const renderWithTheme = (
  ui: ReactElement,
  { mode = 'light', tokens }: { mode?: SuperThemeMode; tokens?: SuperThemeTokens } = {},
): RenderResult =>
  render(
    <SuperThemeProvider mode={mode} labels={TEST_LABELS} tokens={tokens}>
      {ui}
    </SuperThemeProvider>,
  );
