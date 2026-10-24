import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SuperInput } from '../src/components/SuperInput/SuperInput';
import { renderWithTheme } from './renderWithTheme';

describe('SuperInput', () => {
  it('type="password" trae el ojo y alterna el type', () => {
    renderWithTheme(<SuperInput label="Contraseña" type="password" />);
    const input = screen.getByLabelText('Contraseña');
    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar contraseña' }));
    expect(input).toHaveAttribute('type', 'text');

    const hide = screen.getByRole('button', { name: 'Ocultar contraseña' });
    expect(hide).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(hide);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('un input de texto no tiene ojo', () => {
    renderWithTheme(<SuperInput label="Email" type="email" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('el error se enlaza al campo y lo marca inválido', () => {
    renderWithTheme(<SuperInput label="Email" error="Email no válido" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Email no válido');
  });
});
