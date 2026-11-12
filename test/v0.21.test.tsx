import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SuperToast } from '../src/components/SuperToast/SuperToast';
import { toast } from '../src/stores/toastStore';
import { renderWithTheme } from './renderWithTheme';

// Ding anima con APIs que jsdom no tiene: se sustituye por un doble con su mismo
// contrato (un solo toast activo, `getState`/`subscribe`) y se comprueba el puente.
const ding = vi.hoisted(() => {
  type Phase = 'enter' | 'open' | 'closing' | 'exit';
  let n = 0;
  let toasts: Array<{ id: string; phase: Phase }> = [];
  const subs = new Set<() => void>();
  const emit = (): void => subs.forEach((fn) => fn());
  const show = vi.fn((_title: string, _opts?: unknown) => {
    const id = `ding-${++n}`;
    toasts = [{ id, phase: 'open' }];
    emit();
    return id;
  });
  const close = (): void => {
    toasts = toasts.map((t) => ({ ...t, phase: 'closing' as Phase }));
    emit();
  };
  return {
    success: show,
    error: show,
    warning: show,
    info: show,
    dismiss: vi.fn(close),
    userClose: close,
    getState: () => ({ toasts }),
    subscribe: (fn: () => void) => {
      subs.add(fn);
      return () => subs.delete(fn);
    },
    reset: () => {
      toasts = [];
    },
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

describe('SuperToast sobre Ding (0.21)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    ding.reset();
  });
  afterEach(() => {
    toast.clear();
    vi.useRealTimers();
  });

  it('pasa tipo y texto, siempre con cierre manual (duration 0); con título el mensaje va como descripción', () => {
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.error('No se pudo guardar');
    });
    act(() => {
      toast.info('Cuerpo', 'Título');
    });
    expect(ding.error).toHaveBeenCalledWith('No se pudo guardar', { duration: 0 });
    expect(ding.info).toHaveBeenCalledWith('Título', { description: 'Cuerpo', duration: 0 });
  });

  it('duración fija: 5 s, 7,5 s los errores, aunque la app pida otra', () => {
    vi.useFakeTimers();
    act(() => {
      toast.success('ok', { durationMs: 60_000 });
      toast.error('mal', { durationMs: 0 });
    });
    expect(toast.getAll().map((t) => t.durationMs)).toEqual([5000, 7500]);
    act(() => vi.advanceTimersByTime(5000));
    expect(toast.getAll().map((t) => t.message)).toEqual(['mal']);
    act(() => vi.advanceTimersByTime(2500));
    expect(toast.getAll()).toHaveLength(0);
  });

  it('al cumplir su tiempo el store lo cierra en Ding', () => {
    vi.useFakeTimers();
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.warning('Ojo');
    });
    const dingId = ding.warning.mock.results[0]?.value as string;
    act(() => vi.advanceTimersByTime(5000));
    expect(ding.dismiss).toHaveBeenCalledWith(dingId);
  });

  it('cerrar con la ✕ de Ding cierra en el store', () => {
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.info('Hola');
    });
    act(() => ding.userClose());
    expect(toast.getAll()).toHaveLength(0);
  });

  it('un toast nuevo reemplaza al anterior sin que su temporizador lo cierre', () => {
    vi.useFakeTimers();
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.info('Primero');
    });
    act(() => vi.advanceTimersByTime(3000));
    act(() => {
      toast.info('Segundo');
    });
    expect(toast.getAll().map((t) => t.message)).toEqual(['Segundo']);
    expect(ding.dismiss).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(2500));
    expect(toast.getAll().map((t) => t.message)).toEqual(['Segundo']);
  });

  it('la acción se ejecuta y cierra el toast del store', () => {
    const onClick = vi.fn();
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.success('Borrado', { action: { label: 'Deshacer', onClick } });
    });
    const opts = ding.success.mock.calls[0]?.[1] as { action: { onClick: () => void } };
    act(() => opts.action.onClick());
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(toast.getAll()).toHaveLength(0);
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
