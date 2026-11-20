import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SuperModal } from '../src/components/SuperModal/SuperModal';
import { renderWithTheme, TEST_LABELS } from './renderWithTheme';

const setViewport = (mobile: boolean): void => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('max-width') ? mobile : false,
    media: query,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  })) as unknown as typeof window.matchMedia;
};

let now = 0;
const at = (ms: number): void => {
  now = ms;
};

const drag = (el: Element, dy: number, ms = 400): void => {
  at(0);
  fireEvent.pointerDown(el, { pointerId: 1, button: 0, clientY: 100 });
  at(ms / 2);
  fireEvent.pointerMove(el, { pointerId: 1, clientY: 100 + dy });
  at(ms);
  fireEvent.pointerUp(el, { pointerId: 1, clientY: 100 + dy });
};

const renderSheet = (onClose = vi.fn()) => {
  renderWithTheme(
    <SuperModal open onClose={onClose} title="Menú" mobileSheet>
      <p>contenido</p>
    </SuperModal>,
  );
  const dialog = screen.getByRole('dialog');
  const grabber = dialog.querySelector('[data-sd-modal-grabber]') as HTMLElement;
  const header = dialog.querySelector('[data-sd-modal-header]') as HTMLElement;
  return { onClose, dialog, grabber, header };
};

describe('0.30 · SuperModal mobileSheet se cierra arrastrando', () => {
  const original = window.matchMedia;
  beforeEach(() => {
    setViewport(true);
    vi.spyOn(performance, 'now').mockImplementation(() => now);
  });
  afterEach(() => {
    window.matchMedia = original;
    vi.restoreAllMocks();
  });

  it('arrastrar el asa más de 96 px hacia abajo cierra', () => {
    const { onClose, grabber } = renderSheet();
    drag(grabber, 140);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('la cabecera también arrastra', () => {
    const { onClose, header } = renderSheet();
    drag(header, 140);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('un gesto rápido corto también cierra', () => {
    const { onClose, grabber } = renderSheet();
    drag(grabber, 50, 60);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('un arrastre corto y lento vuelve a su sitio sin cerrar', () => {
    const { onClose, grabber, dialog } = renderSheet();
    at(0);
    fireEvent.pointerDown(grabber, { pointerId: 1, button: 0, clientY: 100 });
    at(500);
    fireEvent.pointerMove(grabber, { pointerId: 1, clientY: 140 });
    expect(dialog.style.transform).toBe('translateY(40px)');
    at(1000);
    fireEvent.pointerUp(grabber, { pointerId: 1, clientY: 140 });
    expect(onClose).not.toHaveBeenCalled();
    expect(dialog.style.transform).toBe('');
  });

  it('el botón de cerrar no inicia el arrastre', () => {
    const { onClose } = renderSheet();
    const close = screen.getByRole('button');
    drag(close, 140);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('en escritorio no hay arrastre', () => {
    setViewport(false);
    const { onClose, header } = renderSheet();
    drag(header, 300);
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('0.30 · SuperGoogleButton encaja con el formulario', () => {
  const GSI = 'https://accounts.google.com/gsi/client';
  let resize: (() => void) | undefined;
  let width = 350;
  const renderButton = vi.fn((parent: HTMLElement) => {
    parent.append(document.createElement('div'));
  });

  beforeEach(() => {
    width = 350;
    window.google = { accounts: { id: { initialize: vi.fn(), renderButton } } };
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => width);
    globalThis.ResizeObserver = class {
      constructor(cb: () => void) {
        resize = cb;
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    } as unknown as typeof ResizeObserver;
  });
  afterEach(() => {
    document.head.querySelectorAll(`script[src="${GSI}"]`).forEach((n) => n.remove());
    delete window.google;
    vi.restoreAllMocks();
    renderButton.mockClear();
  });

  const mount = async (mode: 'light' | 'dark') => {
    vi.resetModules();
    const [{ SuperGoogleButton }, { SuperThemeProvider }] = await Promise.all([
      import('../src/components/SuperGoogleButton/SuperGoogleButton'),
      import('../src/theme/SuperThemeProvider'),
    ]);
    const view = render(
      <SuperThemeProvider mode={mode} labels={TEST_LABELS}>
        <SuperGoogleButton
          clientId="web"
          locale="es"
          onCredential={() => undefined}
          className="slot"
        />
      </SuperThemeProvider>,
    );
    await act(async () => {
      document.head.querySelector(`script[src="${GSI}"]`)?.dispatchEvent(new Event('load'));
      await Promise.resolve();
    });
    return view;
  };

  it('pinta el botón al ancho exacto del hueco y en filled_black en oscuro', async () => {
    await mount('dark');
    expect(renderButton).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ width: 350, theme: 'filled_black', shape: 'pill' }),
    );
  });

  it('si el hueco cambia de ancho, lo vuelve a pintar a la medida', async () => {
    await mount('light');
    width = 300;
    await act(async () => {
      resize?.();
      await Promise.resolve();
    });
    expect(renderButton).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ width: 300, theme: 'outline' }),
    );
  });

  it('el hueco fuerza color-scheme claro para que el iframe de Google no pinte fondo blanco', async () => {
    const { container } = await mount('dark');
    const slot = container.querySelector('.slot') as HTMLElement;
    const css = Array.from(document.querySelectorAll('style'))
      .map((n) => n.textContent ?? '')
      .join('');
    const cls = Array.from(slot.classList).find((c) => c.startsWith('css-'));
    expect(cls).toBeDefined();
    expect(css).toMatch(new RegExp(`\\.${cls}\\{[^}]*color-scheme:light`));
  });
});
