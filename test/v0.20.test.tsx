import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SuperToast } from '../src/components/SuperToast/SuperToast';
import { toast } from '../src/stores/toastStore';
import { renderWithTheme } from './renderWithTheme';

// Ding anima con APIs que jsdom no tiene: se sustituye por un doble y se comprueba
// que SuperToast le pasa bien cada toast del store.
const ding = vi.hoisted(() => {
  let n = 0;
  const show = vi.fn((_title: string, _opts?: unknown) => `ding-${++n}`);
  return {
    success: show,
    error: show,
    warning: show,
    info: show,
    dismiss: vi.fn(),
    toaster: vi.fn(),
  };
});

vi.mock('@yusufceng1z/ding-react', () => ({
  toast: ding,
  Toaster: (props: Record<string, unknown>) => {
    ding.toaster(props);
    return null;
  },
}));

describe('SuperToast sobre Ding (0.20)', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => toast.clear());

  it('pasa tipo, texto y duración; con título el mensaje va como descripción', () => {
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.error('No se pudo guardar');
      toast.info('Cuerpo', 'Título');
    });
    expect(ding.error).toHaveBeenCalledWith('No se pudo guardar', { duration: 7500 });
    expect(ding.info).toHaveBeenCalledWith('Título', { description: 'Cuerpo', duration: 5000 });
  });

  it('la acción se ejecuta y cierra el toast del store', () => {
    const onClick = vi.fn();
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.success('Borrado', { action: { label: 'Deshacer', onClick }, durationMs: 0 });
    });
    const opts = ding.success.mock.calls[0]?.[1] as { action: { onClick: () => void } };
    act(() => opts.action.onClick());
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(toast.getAll()).toHaveLength(0);
  });

  it('cerrar en el store cierra en Ding', () => {
    renderWithTheme(<SuperToast />);
    let id = '';
    act(() => {
      id = toast.warning('Ojo');
    });
    const dingId = ding.warning.mock.results[0]?.value as string;
    act(() => toast.dismiss(id));
    expect(ding.dismiss).toHaveBeenCalledWith(dingId);
  });

  it('usa el modo, la posición y los textos del tema', () => {
    renderWithTheme(<SuperToast position="bottom-center" />, { mode: 'dark' });
    expect(ding.toaster).toHaveBeenCalledWith(
      expect.objectContaining({
        position: 'bottom-center',
        theme: 'dark',
        labels: { dismiss: 'Descartar' },
      }),
    );
  });
});
