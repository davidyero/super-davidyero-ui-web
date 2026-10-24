import { describe, expect, it } from 'vitest';
import { SuperTypography } from '../src/components/SuperTypography/SuperTypography';
import { DEFAULT_TOKENS, defineTokens } from '../src/theme/tokens';
import { renderWithTheme } from './renderWithTheme';

const styleText = (): string =>
  Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');

const tokens = defineTokens({
  light: { primary: '#ff0055', radius: { md: '4px' } },
  dark: { primary: '#00ffaa' },
});

describe('SuperThemeProvider', () => {
  it('escribe las variables del modo claro con los tokens de la app', () => {
    renderWithTheme(<SuperTypography>Hola</SuperTypography>, { mode: 'light', tokens });
    const css = styleText();
    expect(css).toContain('--sd-primary:#ff0055');
    expect(css).toContain('--sd-radius-md:4px');
    // Lo que la app no define cae al valor por defecto.
    expect(css).toContain(`--sd-surface:${DEFAULT_TOKENS.light.surface}`);
    expect(css).toContain('color-scheme:light');
  });

  it('escribe las variables del modo oscuro', () => {
    renderWithTheme(<SuperTypography>Hola</SuperTypography>, { mode: 'dark', tokens });
    const css = styleText();
    expect(css).toContain('--sd-primary:#00ffaa');
    expect(css).toContain(`--sd-background:${DEFAULT_TOKENS.dark.background}`);
    expect(css).toContain('color-scheme:dark');
  });

  it('ningún tamaño de la escala baja de 13px', async () => {
    const { textScale, MIN_FONT_SIZE } = await import('../src/styles/scale');
    for (const [variant, s] of Object.entries(textScale)) {
      expect(parseInt(s.fontSize, 10), variant).toBeGreaterThanOrEqual(MIN_FONT_SIZE);
    }
  });
});
