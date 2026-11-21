import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { TEST_LABELS } from './renderWithTheme';

const ui = (locale?: string) => (
  <SuperThemeProvider mode="light" labels={TEST_LABELS} locale={locale}>
    <span>Hola</span>
  </SuperThemeProvider>
);

describe('SuperThemeProvider locale', () => {
  it('pone <html lang> con el idioma activo y lo sigue al cambiar', () => {
    const { rerender } = render(ui('es'));
    expect(document.documentElement.lang).toBe('es');
    rerender(ui('en'));
    expect(document.documentElement.lang).toBe('en');
  });

  it('sin locale no toca <html lang>', () => {
    document.documentElement.lang = 'fr';
    render(ui());
    expect(document.documentElement.lang).toBe('fr');
  });
});
