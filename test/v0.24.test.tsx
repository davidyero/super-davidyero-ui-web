import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SuperModal } from '../src/components/SuperModal/SuperModal';
import { renderWithTheme } from './renderWithTheme';

describe('0.24 · SuperModal mobileSheet', () => {
  it('con mobileSheet pinta el asa oculta para lectores', () => {
    renderWithTheme(
      <SuperModal open onClose={() => undefined} title="Detalle" mobileSheet>
        <p>Contenido</p>
      </SuperModal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Detalle' });
    expect(dialog.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('sin mobileSheet sigue siendo el modal de siempre', () => {
    renderWithTheme(
      <SuperModal open onClose={() => undefined} title="Detalle">
        <p>Contenido</p>
      </SuperModal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Detalle' });
    expect(dialog.firstElementChild).toHaveAttribute('data-sd-modal-header');
  });

  it('el footer lleva su marca para alinearse con el sheet en móvil', () => {
    renderWithTheme(
      <SuperModal
        open
        onClose={() => undefined}
        title="Detalle"
        mobileSheet
        footer={<button type="button">OK</button>}
      >
        <p>Contenido</p>
      </SuperModal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Detalle' });
    expect(dialog.querySelector('[data-sd-modal-footer]')).not.toBeNull();
  });
});
