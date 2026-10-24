import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SuperModal } from '../src/components/SuperModal/SuperModal';
import { SuperTabs } from '../src/components/SuperTabs/SuperTabs';
import { toast } from '../src/stores/toastStore';
import { SuperToast } from '../src/components/SuperToast/SuperToast';
import { act } from '@testing-library/react';
import { renderWithTheme } from './renderWithTheme';

describe('SuperModal', () => {
  it('Escape cierra y el diálogo tiene nombre accesible', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <SuperModal open onClose={onClose} title="Borrar app">
        <button type="button">Confirmar</button>
      </SuperModal>,
    );
    expect(screen.getByRole('dialog', { name: 'Borrar app' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('SuperTabs', () => {
  const Harness = () => {
    const [value, setValue] = useState<'a' | 'b' | 'c'>('a');
    return (
      <SuperTabs
        ariaLabel="Secciones"
        value={value}
        onChange={setValue}
        items={[
          { id: 'a', label: 'Uno' },
          { id: 'b', label: 'Dos', disabled: true },
          { id: 'c', label: 'Tres' },
        ]}
      />
    );
  };

  it('las flechas saltan las pestañas deshabilitadas', () => {
    renderWithTheme(<Harness />);
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Tres' })).toHaveAttribute('aria-selected', 'true');
  });
});

describe('SuperToast', () => {
  it('muestra el toast y lo descarta', () => {
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.error('No se pudo guardar');
    });
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudo guardar');
    fireEvent.click(screen.getByRole('button', { name: 'Descartar' }));
    expect(screen.queryByRole('alert')).toBeNull();
    toast.clear();
  });
});
