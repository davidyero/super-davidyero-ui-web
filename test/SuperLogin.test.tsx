import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperLogin } from '../src/components/SuperLogin/SuperLogin';
import { renderWithTheme } from './renderWithTheme';

const labels = {
  title: 'Bienvenido',
  subtitle: 'Entra con tu contraseña',
  password: 'Contraseña',
  submit: 'Entrar',
};

const setup = (props: Partial<Parameters<typeof SuperLogin>[0]> = {}) => {
  const onSubmit = vi.fn();
  renderWithTheme(
    <SuperLogin
      brand={<span>Marca</span>}
      tagline="La frase de la app"
      labels={labels}
      onSubmit={onSubmit}
      version="1.2.3"
      {...props}
    />,
  );
  return { onSubmit };
};

describe('SuperLogin', () => {
  it('pide solo la contraseña, con ojo, y muestra la versión', () => {
    setup();
    expect(screen.getByRole('heading', { level: 1, name: 'Bienvenido' })).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText('Contraseña')).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Mostrar contraseña' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.getByText('v1.2.3')).toBeInTheDocument();
  });

  it('no envía vacío y envía la contraseña escrita', () => {
    const { onSubmit } = setup();
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toHaveAttribute('aria-disabled', 'true');
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'secreta' } });
    expect(button).not.toHaveAttribute('aria-disabled');
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledWith('secreta');
  });

  it('con loading no se puede volver a enviar', () => {
    const { onSubmit } = setup({ loading: true });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'secreta' } });
    fireEvent.submit(screen.getByLabelText('Contraseña').closest('form')!);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('el error va enlazado al campo y avisa al escribir', () => {
    const onPasswordChange = vi.fn();
    setup({ error: 'Contraseña incorrecta', onPasswordChange });
    const input = screen.getByLabelText('Contraseña');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Contraseña incorrecta');
    fireEvent.change(input, { target: { value: 'x' } });
    expect(onPasswordChange).toHaveBeenCalledWith('x');
  });

  it('credit va tras la versión', () => {
    setup({ credit: 'by @Davidyero' });
    expect(screen.getByText('v1.2.3 · by @Davidyero')).toBeInTheDocument();
  });

  it('con account añade el campo oculto para el gestor de contraseñas', () => {
    setup({ account: 'davidyero' });
    const hidden = document.querySelector('input[autocomplete="username"]');
    expect(hidden).toHaveValue('davidyero');
    expect(hidden).toHaveAttribute('tabindex', '-1');
  });

  it('sin labels usa los textos comunes en español', () => {
    setup({ labels: undefined });
    expect(
      screen.getByRole('heading', { level: 1, name: 'Bienvenido de vuelta' }),
    ).toBeInTheDocument();
    expect(screen.getByText('La misma contraseña de todas tus webs.')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('con locale en usa los textos en inglés y labels cambia solo lo que pasa', () => {
    setup({ labels: { submit: 'Go' }, locale: 'en' });
    expect(screen.getByRole('heading', { level: 1, name: 'Welcome back' })).toBeInTheDocument();
    expect(screen.getByText('The same password for all your sites.')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
});
