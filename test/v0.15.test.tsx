import { fireEvent, render, screen } from '@testing-library/react';
import { useState, type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SuperAuthTemplate } from '../src/components/SuperAuthTemplate/SuperAuthTemplate';
import { SuperDrawer } from '../src/components/SuperDrawer/SuperDrawer';
import { SuperDropdown } from '../src/components/SuperDropdown/SuperDropdown';
import { SuperInput } from '../src/components/SuperInput/SuperInput';
import { SuperModal } from '../src/components/SuperModal/SuperModal';
import { SuperTextarea } from '../src/components/SuperTextarea/SuperTextarea';
import { describedBy } from '../src/styles/field';
import { zIndex } from '../src/styles/scale';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { renderWithTheme, TEST_LABELS } from './renderWithTheme';

const options = [
  { value: 'co', label: 'Colombia' },
  { value: 'mx', label: 'México' },
];

describe('0.15.0 · capas', () => {
  it('popover queda sobre modal y bajo toast; tooltip entre popover y toast', () => {
    expect(zIndex.popover).toBeGreaterThan(zIndex.modal);
    expect(zIndex.popover).toBeLessThan(zIndex.toast);
    expect(zIndex.tooltip).toBeGreaterThan(zIndex.popover);
    expect(zIndex.tooltip).toBeLessThan(zIndex.toast);
  });

  it('la lista de SuperDropdown dentro de un SuperModal se pinta por encima del modal', () => {
    renderWithTheme(
      <SuperModal open onClose={() => undefined} title="Filtros">
        <SuperDropdown value="co" onChange={() => undefined} options={options} label="País" />
      </SuperModal>,
    );
    fireEvent.click(screen.getByRole('combobox', { name: 'País' }));
    const list = screen.getByRole('listbox');
    expect(getComputedStyle(list).zIndex).toBe(String(zIndex.popover));
  });
});

describe('0.15.0 · Escape', () => {
  it('con la lista abierta dentro de un modal, Escape cierra solo la lista', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <SuperModal open onClose={onClose} title="Filtros">
        <SuperDropdown value="co" onChange={() => undefined} options={options} label="País" />
      </SuperModal>,
    );
    const combo = screen.getByRole('combobox', { name: 'País' });
    fireEvent.click(combo);
    expect(combo).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(combo, { key: 'Escape' });
    expect(combo).toHaveAttribute('aria-expanded', 'false');
    expect(onClose).not.toHaveBeenCalled();
    // Con la lista ya cerrada, Escape sí cierra el modal.
    fireEvent.keyDown(combo, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('con un drawer y un modal apilados, Escape cierra solo el de arriba', () => {
    const Harness = () => {
      const [drawer, setDrawer] = useState(true);
      const [modal, setModal] = useState(true);
      return (
        <>
          <SuperDrawer open={drawer} onClose={() => setDrawer(false)} title="Clase">
            <p>Detalle</p>
          </SuperDrawer>
          <SuperModal open={modal} onClose={() => setModal(false)} title="Confirmar">
            <p>¿Seguro?</p>
          </SuperModal>
        </>
      );
    };
    renderWithTheme(<Harness />);
    expect(screen.getByRole('dialog', { name: 'Confirmar' })).toBeInTheDocument();
    fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Confirmar' })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Clase' })).toBeInTheDocument();
    fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Clase' })).not.toBeInTheDocument();
  });
});

describe('0.15.0 · SuperAuthTemplate', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <SuperThemeProvider mode="light" labels={TEST_LABELS}>
      {children}
    </SuperThemeProvider>
  );
  const Template = ({ screenKey, text }: { screenKey: string; text: string }) => (
    <SuperAuthTemplate brand="AP" tagline="Frase" screenKey={screenKey}>
      <label htmlFor="email">{text}</label>
      <input id="email" />
    </SuperAuthTemplate>
  );

  it('la tarjeta saliente es inert y la activa va primero en el DOM', () => {
    const { rerender } = render(<Template screenKey="/login" text="Login" />, { wrapper });
    rerender(<Template screenKey="/register" text="Registro" />);
    const leaving = screen.getByText('Login').parentElement as HTMLElement;
    const current = screen.getByText('Registro').parentElement as HTMLElement;
    expect(leaving).toHaveAttribute('inert');
    expect(leaving).toHaveAttribute('aria-hidden', 'true');
    expect(current).not.toHaveAttribute('inert');
    // Con ids repetidos, getElementById da con el campo de la pantalla activa.
    expect(current.contains(document.getElementById('email'))).toBe(true);
  });
});

describe('0.15.0 · FieldMessage y describedBy', () => {
  it('describedBy: el error manda sobre la ayuda y suma los ids extra', () => {
    expect(describedBy('f', 'Mal', 'Ayuda')).toBe('f-error');
    expect(describedBy('f', undefined, 'Ayuda')).toBe('f-hint');
    expect(describedBy('f', undefined, undefined)).toBeUndefined();
    expect(describedBy('f', undefined, 'Ayuda', 'otro', undefined)).toBe('f-hint otro');
  });

  it('Input, Textarea y Dropdown enlazan su mensaje igual', () => {
    renderWithTheme(
      <>
        <SuperInput id="i" label="Nombre" error="Obligatorio" aria-describedby="extra" />
        <SuperTextarea id="t" label="Mensaje" hint="Máx. 500" />
        <SuperDropdown
          id="d"
          value=""
          onChange={() => undefined}
          options={options}
          label="País"
          error="Elige uno"
        />
      </>,
    );
    expect(screen.getByLabelText('Nombre')).toHaveAttribute('aria-describedby', 'i-error extra');
    expect(screen.getByLabelText('Nombre')).toHaveAccessibleDescription('Obligatorio');
    expect(screen.getByLabelText('Mensaje')).toHaveAccessibleDescription('Máx. 500');
    expect(screen.getByRole('combobox', { name: 'País' })).toHaveAccessibleDescription('Elige uno');
    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });
});
