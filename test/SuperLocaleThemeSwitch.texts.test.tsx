import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperLocaleThemeSwitch } from '../src/components/SuperLocaleThemeSwitch/SuperLocaleThemeSwitch';
import { renderWithTheme } from './renderWithTheme';

const base = { onLocaleChange: vi.fn(), onModeChange: vi.fn() };

describe('SuperLocaleThemeSwitch: textos por defecto', () => {
  it('en español dice a qué cambia cada botón', () => {
    renderWithTheme(<SuperLocaleThemeSwitch {...base} locale="es" mode="light" />);
    expect(screen.getByRole('button', { name: 'Cambiar a inglés' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cambiar a tema oscuro' })).toBeInTheDocument();
  });

  it('en inglés, y labels cambia solo lo que pasa', () => {
    renderWithTheme(
      <SuperLocaleThemeSwitch
        {...base}
        locale="en"
        mode="dark"
        labels={{ switchToLight: 'Day' }}
      />,
    );
    expect(screen.getByRole('button', { name: 'Switch to Spanish' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Day' })).toBeInTheDocument();
  });

  it('segmentado: nombra cada píldora con el texto común', () => {
    renderWithTheme(<SuperLocaleThemeSwitch {...base} locale="es" mode="light" look="segmented" />);
    expect(screen.getByRole('tablist', { name: 'Idioma' })).toBeInTheDocument();
    expect(screen.getByRole('tablist', { name: 'Tema' })).toBeInTheDocument();
  });
});
