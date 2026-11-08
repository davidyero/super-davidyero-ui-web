import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperDropdown } from '../src/components/SuperDropdown/SuperDropdown';
import { renderWithTheme } from './renderWithTheme';

const options = [
  { value: 'co', label: 'Colombia' },
  { value: 'cl', label: 'Chile', disabled: true },
  { value: 'mx', label: 'México' },
  { value: 'pe', label: 'Perú' },
];

describe('0.8.0 · SuperDropdown propio', () => {
  it('no usa el select nativo: abre una lista y elige con el ratón', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <SuperDropdown
        value=""
        onChange={onChange}
        options={options}
        label="País"
        placeholder="Elige"
      />,
    );
    expect(document.querySelector('select')).toBeNull();
    const combo = screen.getByRole('combobox', { name: 'País' });
    expect(combo).toHaveTextContent('Elige');
    expect(combo).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(combo);
    expect(combo).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('option', { name: 'México' }));
    expect(onChange).toHaveBeenCalledWith('mx');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('teclado: flechas saltan las deshabilitadas, Enter elige y Escape cierra', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <SuperDropdown value="co" onChange={onChange} options={options} ariaLabel="País" />,
    );
    const combo = screen.getByRole('combobox', { name: 'País' });
    fireEvent.keyDown(combo, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: 'Colombia' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    fireEvent.keyDown(combo, { key: 'ArrowDown' });
    expect(combo.getAttribute('aria-activedescendant')).toBe(
      screen.getByRole('option', { name: 'México' }).id,
    );
    fireEvent.keyDown(combo, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('mx');

    fireEvent.keyDown(combo, { key: 'ArrowDown' });
    fireEvent.keyDown(combo, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('búsqueda por letra y deshabilitado no abre', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <SuperDropdown value="co" onChange={onChange} options={options} ariaLabel="País" />,
    );
    fireEvent.keyDown(screen.getByRole('combobox', { name: 'País' }), { key: 'p' });
    expect(onChange).toHaveBeenCalledWith('pe');
    renderWithTheme(
      <SuperDropdown
        value="co"
        onChange={onChange}
        options={options}
        ariaLabel="Ciudad"
        disabled
      />,
    );
    fireEvent.click(screen.getByRole('combobox', { name: 'Ciudad' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
