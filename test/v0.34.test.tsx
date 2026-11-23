import { act, renderHook, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SuperModal } from '../src/components/SuperModal/SuperModal';
import { useSuperInput } from '../src/components/SuperInput/useSuperInput';
import { usePresence } from '../src/hooks/usePresence';
import { useStagger } from '../src/hooks/useStagger';
import { motion, staggerDelay, timing, transitionOf } from '../src/styles/motion';
import { slide, transition } from '../src/styles/scale';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { renderWithTheme, TEST_LABELS } from './renderWithTheme';

const mockMatchMedia = (reduced: boolean): void => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced && query.includes('reduce'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
};

afterEach(() => {
  // jsdom no trae matchMedia: se deja como estaba para el resto de pruebas.
  delete (window as { matchMedia?: unknown }).matchMedia;
  vi.useRealTimers();
});

describe('tokens de movimiento', () => {
  it('tienen los valores del estándar y nada que responda pasa de 300 ms', () => {
    expect(motion.duration).toMatchObject({ instant: 100, fast: 150, base: 220, slow: 280 });
    expect(motion.easing.out).toBe('cubic-bezier(0.22, 1, 0.36, 1)');
    for (const d of ['instant', 'fast', 'base', 'slow'] as const) {
      expect(motion.duration[d]).toBeLessThanOrEqual(300);
    }
  });

  it('transition y slide quedan como alias de fast y base con easing.out', () => {
    expect(transition).toBe(timing('fast'));
    expect(slide).toBe(timing('base'));
    expect(transitionOf(['opacity', 'transform'], 'base')).toBe(
      `opacity ${timing('base')}, transform ${timing('base')}`,
    );
  });

  it('el stagger se corta en el 8.º elemento', () => {
    expect(staggerDelay(0)).toBe('0ms');
    expect(staggerDelay(3)).toBe('90ms');
    expect(staggerDelay(40)).toBe('240ms');
  });
});

describe('sacudida de SuperInput', () => {
  const args = { id: 'x', type: 'text', hint: undefined };

  it('no se mueve al montar con error, sí cuando aparece o cambia', () => {
    const { result, rerender } = renderHook(
      (p: { error?: string }) => useSuperInput({ ...args, error: p.error }),
      { initialProps: {} },
    );
    expect(result.current.shaking).toBe(false);
    rerender({ error: 'Contraseña incorrecta.' });
    expect(result.current.shaking).toBe(true);
    act(() => result.current.stopShaking());
    expect(result.current.shaking).toBe(false);
  });

  it('con shakeKey se vuelve a sacudir aunque el error sea el mismo', () => {
    const { result, rerender } = renderHook(
      (p: { shakeKey: number }) => useSuperInput({ ...args, error: 'Mal', shakeKey: p.shakeKey }),
      { initialProps: { shakeKey: 1 } },
    );
    expect(result.current.shaking).toBe(false);
    rerender({ shakeKey: 2 });
    expect(result.current.shaking).toBe(true);
  });
});

describe('usePresence', () => {
  it('mantiene montado durante la salida y luego desmonta', () => {
    mockMatchMedia(false);
    vi.useFakeTimers();
    const { result, rerender } = renderHook((p: { open: boolean }) => usePresence(p.open, 'base'), {
      initialProps: { open: true },
    });
    rerender({ open: false });
    expect(result.current).toEqual({ mounted: true, closing: true });
    act(() => vi.advanceTimersByTime(motion.duration.base));
    expect(result.current).toEqual({ mounted: false, closing: false });
  });

  it('con «Reducir movimiento» desmonta sin esperar', () => {
    mockMatchMedia(true);
    vi.useFakeTimers();
    const { result, rerender } = renderHook((p: { open: boolean }) => usePresence(p.open, 'base'), {
      initialProps: { open: true },
    });
    rerender({ open: false });
    act(() => vi.advanceTimersByTime(0));
    expect(result.current.mounted).toBe(false);
  });

  it('SuperModal sigue en pantalla mientras sale y no recibe toques', () => {
    mockMatchMedia(false);
    vi.useFakeTimers();
    const view = renderWithTheme(
      <SuperModal open onClose={() => undefined} title="Clase">
        hola
      </SuperModal>,
    );
    view.rerender(
      <SuperThemeProvider mode="light" labels={TEST_LABELS}>
        <SuperModal open={false} onClose={() => undefined} title="Clase">
          hola
        </SuperModal>
      </SuperThemeProvider>,
    );
    expect(screen.getByText('hola')).toBeTruthy();
    act(() => vi.advanceTimersByTime(motion.duration.base));
    expect(screen.queryByText('hola')).toBeNull();
  });
});

describe('useStagger', () => {
  it('escalona solo la primera carga con elementos', () => {
    mockMatchMedia(false);
    vi.useFakeTimers();
    const { result, rerender } = renderHook((p: { count: number }) => useStagger(p.count), {
      initialProps: { count: 0 },
    });
    expect(result.current(0)).toEqual({});
    rerender({ count: 5 });
    expect(result.current(2).style?.animation).toContain('60ms');
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current(2)).toEqual({});
  });

  it('con «Reducir movimiento» no anima', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useStagger(5));
    expect(result.current(0)).toEqual({});
  });
});
