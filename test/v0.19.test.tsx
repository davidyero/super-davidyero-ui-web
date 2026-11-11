import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperLocaleThemeSwitch } from '../src/components/SuperLocaleThemeSwitch/SuperLocaleThemeSwitch';
import { renderWithTheme } from './renderWithTheme';

const LABELS = {
  es: 'Español',
  en: 'English',
  light: 'Claro',
  dark: 'Oscuro',
  switchToEs: 'Cambiar a Español',
  switchToEn: 'Cambiar a English',
  switchToLight: 'Cambiar a tema claro',
  switchToDark: 'Cambiar a tema oscuro',
};

describe('0.19.0 SuperLocaleThemeSwitch', () => {
  it('cada botón cambia al otro valor y se nombra por lo que hace', () => {
    const onLocaleChange = vi.fn();
    const onModeChange = vi.fn();
    renderWithTheme(
      <SuperLocaleThemeSwitch
        locale="es"
        onLocaleChange={onLocaleChange}
        mode="light"
        onModeChange={onModeChange}
        labels={LABELS}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a English' }));
    expect(onLocaleChange).toHaveBeenCalledWith('en');
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }));
    expect(onModeChange).toHaveBeenCalledWith('dark');
  });

  it('en inglés y oscuro ofrece volver a español y a claro', () => {
    const onLocaleChange = vi.fn();
    const onModeChange = vi.fn();
    renderWithTheme(
      <SuperLocaleThemeSwitch
        locale="en"
        onLocaleChange={onLocaleChange}
        mode="dark"
        onModeChange={onModeChange}
        labels={LABELS}
      />,
      { mode: 'dark' },
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a Español' }));
    expect(onLocaleChange).toHaveBeenCalledWith('es');
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema claro' }));
    expect(onModeChange).toHaveBeenCalledWith('light');
  });

  it('con showLabels muestra el nombre del idioma y del tema activos', () => {
    renderWithTheme(
      <SuperLocaleThemeSwitch
        locale="es"
        onLocaleChange={() => undefined}
        mode="dark"
        onModeChange={() => undefined}
        labels={LABELS}
        showLabels
      />,
    );
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('Oscuro')).toBeInTheDocument();
  });
});
