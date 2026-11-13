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
  language: 'Idioma',
  theme: 'Tema',
};

describe('0.23 · SuperLocaleThemeSwitch look="segmented"', () => {
  it('muestra las dos opciones de cada preferencia y marca la activa', () => {
    renderWithTheme(
      <SuperLocaleThemeSwitch
        look="segmented"
        locale="es"
        onLocaleChange={() => undefined}
        mode="light"
        onModeChange={() => undefined}
        labels={LABELS}
      />,
    );
    expect(screen.getByRole('tablist', { name: 'Idioma' })).toBeTruthy();
    expect(screen.getByRole('tablist', { name: 'Tema' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Español' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tab', { name: 'English' }).getAttribute('aria-selected')).toBe(
      'false',
    );
    expect(screen.getByRole('tab', { name: 'Claro' }).getAttribute('aria-selected')).toBe('true');
  });

  it('avisa solo al elegir la otra opción', () => {
    const onLocale = vi.fn();
    const onMode = vi.fn();
    renderWithTheme(
      <SuperLocaleThemeSwitch
        look="segmented"
        locale="es"
        onLocaleChange={onLocale}
        mode="light"
        onModeChange={onMode}
        labels={LABELS}
      />,
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Español' }));
    expect(onLocale).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('tab', { name: 'English' }));
    expect(onLocale).toHaveBeenCalledWith('en');
    fireEvent.click(screen.getByRole('tab', { name: 'Oscuro' }));
    expect(onMode).toHaveBeenCalledWith('dark');
  });

  it('sin look sigue siendo el de dos botones', () => {
    renderWithTheme(
      <SuperLocaleThemeSwitch
        locale="es"
        onLocaleChange={() => undefined}
        mode="light"
        onModeChange={() => undefined}
        labels={LABELS}
      />,
    );
    expect(screen.queryByRole('tablist')).toBeNull();
    expect(screen.getByRole('button', { name: 'Cambiar a English' })).toBeTruthy();
  });
});
