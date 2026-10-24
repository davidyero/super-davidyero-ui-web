import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperButton } from '../src/components/SuperButton/SuperButton';
import { renderWithTheme } from './renderWithTheme';

describe('SuperButton', () => {
  it('dispara onClick en estado normal', () => {
    const onClick = vi.fn();
    renderWithTheme(<SuperButton onClick={onClick}>Guardar</SuperButton>);
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('en loading no dispara onClick y se anuncia ocupado', () => {
    const onClick = vi.fn();
    renderWithTheme(
      <SuperButton loading onClick={onClick}>
        Guardar
      </SuperButton>,
    );
    const button = screen.getByRole('button', { name: 'Guardar' });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('en loading no envía el formulario (evita doble submit)', () => {
    const onSubmit = vi.fn((e: { preventDefault: () => void }) => e.preventDefault());
    renderWithTheme(
      <form onSubmit={onSubmit}>
        <SuperButton type="submit" loading>
          Enviar
        </SuperButton>
      </form>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disabled no dispara onClick', () => {
    const onClick = vi.fn();
    renderWithTheme(
      <SuperButton disabled onClick={onClick}>
        Borrar
      </SuperButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Borrar' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('con href externo es un enlace que abre en pestaña nueva', () => {
    renderWithTheme(<SuperButton href="https://davidyero.com">Web</SuperButton>);
    const link = screen.getByRole('link', { name: 'Web' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
