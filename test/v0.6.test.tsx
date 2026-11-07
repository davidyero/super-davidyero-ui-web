import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperPagination } from '../src/components/SuperPagination/SuperPagination';
import { renderWithTheme } from './renderWithTheme';

const labels = {
  navigation: 'Páginas',
  previous: 'Anterior',
  next: 'Siguiente',
  pageSize: 'Por página',
};

describe('0.6.0', () => {
  it('SuperPagination avanza, retrocede y bloquea los extremos', () => {
    const onPageChange = vi.fn();
    renderWithTheme(
      <SuperPagination
        page={1}
        pageCount={3}
        onPageChange={onPageChange}
        summary="1–10 de 25"
        labels={labels}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Páginas' })).toBeInTheDocument();
    expect(screen.getByText('1–10 de 25')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anterior' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('el selector de tamaño devuelve un número', () => {
    const onPageSizeChange = vi.fn();
    renderWithTheme(
      <SuperPagination
        page={3}
        pageCount={3}
        onPageChange={() => undefined}
        summary="41–50 de 50"
        labels={labels}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        onPageSizeChange={onPageSizeChange}
      />,
    );
    expect(screen.getByRole('button', { name: 'Siguiente' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Por página' }), {
      target: { value: '50' },
    });
    expect(onPageSizeChange).toHaveBeenCalledWith(50);
  });
});
