import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SuperModal } from '../src/components/SuperModal/SuperModal';
import { renderWithTheme } from './renderWithTheme';

describe('0.24 · SuperModal mobileSheet', () => {
  it('con mobileSheet marca el fondo y pinta el asa oculta para lectores', () => {
    renderWithTheme(
      <SuperModal open onClose={() => undefined} title="Detalle" mobileSheet>
        <p>Contenido</p>
      </SuperModal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Detalle' });
    expect(dialog.parentElement).toHaveAttribute('data-sd-modal-sheet', 'true');
    expect(dialog.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('sin mobileSheet sigue siendo el modal de siempre', () => {
    renderWithTheme(
      <SuperModal open onClose={() => undefined} title="Detalle">
        <p>Contenido</p>
      </SuperModal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Detalle' });
    expect(dialog.parentElement).not.toHaveAttribute('data-sd-modal-sheet');
  });
});
