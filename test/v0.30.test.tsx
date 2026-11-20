import { fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SuperModal } from '../src/components/SuperModal/SuperModal';
import { renderWithTheme } from './renderWithTheme';

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
