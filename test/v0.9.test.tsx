import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperDrawer } from '../src/components/SuperDrawer/SuperDrawer';
import { SuperInput } from '../src/components/SuperInput/SuperInput';
import { SuperSegmented } from '../src/components/SuperSegmented/SuperSegmented';
import { SuperStepper } from '../src/components/SuperStepper/SuperStepper';
import { pilatesTokens } from '../src/theme/presets/pilates';
import { resolveTokens } from '../src/theme/tokens';
import { renderWithTheme } from './renderWithTheme';

describe('0.9.0', () => {
  it('SuperSegmented marca la opción activa y se mueve con flechas', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <SuperSegmented
        ariaLabel="Ciclo"
        value="monthly"
        onChange={onChange}
        options={[
          { value: 'monthly', label: 'Mensual' },
          { value: 'yearly', label: 'Anual' },
        ]}
      />,
    );
    const monthly = screen.getByRole('tab', { name: 'Mensual' });
    expect(monthly).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(monthly, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('yearly');
  });

  it('SuperStepper respeta los límites y muestra el texto legible', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <SuperStepper
        value={0}
        min={0}
        max={24}
        onChange={onChange}
        formatValue={(value) => (value === 0 ? 'Sin tope' : `${value} h antes`)}
        ariaLabel="Ventana"
        decrementLabel="Menos"
        incrementLabel="Más"
      />,
    );
    expect(screen.getByText('Sin tope')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Menos' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Más' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('SuperDrawer es un diálogo modal que se cierra con Escape', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <SuperDrawer open onClose={onClose} title="Pierna" footer={<button>Confirmar</button>}>
        contenido
      </SuperDrawer>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Pierna' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('SuperInput pinta el prefijo fijo fuera del valor', () => {
    renderWithTheme(<SuperInput label="Celular" prefix="+57" value="3001234567" readOnly />);
    expect(screen.getByText('+57')).toBeInTheDocument();
    expect(screen.getByLabelText('Celular')).toHaveValue('3001234567');
  });

  it('el tema Pilates trae botones en píldora y radio de botón derivado si falta', () => {
    expect(resolveTokens('light', pilatesTokens.light).radius.button).toBe('999px');
    expect(resolveTokens('light', { radius: { md: '20px' } }).radius.button).toBe('20px');
    expect(resolveTokens('light').radius.button).toBe('10px');
  });
});
