import { useRef, type PointerEvent, type RefObject } from 'react';
import { breakpoints } from '../../styles/scale';

/** Arrastre mínimo hacia abajo (px) para cerrar al soltar. */
export const SHEET_CLOSE_DISTANCE = 96;
/** O un gesto rápido: más de 0,5 px/ms hacia abajo y al menos 32 px. */
const FLICK_SPEED = 0.5;
const FLICK_DISTANCE = 32;

const isSheetViewport = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(`(max-width: ${breakpoints.md - 1}px)`).matches;

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface DragHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLElement>) => void;
}

/**
 * Bajar el bottom sheet arrastrando el asa o la cabecera. Sigue al dedo, cierra al
 * soltar pasado `SHEET_CLOSE_DISTANCE` o con un gesto rápido, y si no vuelve a su
 * sitio. Solo actúa por debajo de `md`, donde el modal es hoja; los botones de la
 * cabecera (cerrar) no inician el arrastre.
 */
export const useSheetDrag = (
  dialogRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  onClose: () => void,
): DragHandlers => {
  const drag = useRef<{ id: number; startY: number; startT: number; dy: number } | null>(null);

  const setOffset = (dy: number, animate: boolean): void => {
    const el = dialogRef.current;
    if (!el) return;
    el.style.transition = animate && !prefersReducedMotion() ? 'transform 180ms ease-out' : 'none';
    el.style.transform = dy > 0 ? `translateY(${dy}px)` : '';
  };

  const end = (event: PointerEvent<HTMLElement>, cancelled: boolean): void => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    const elapsed = Math.max(1, performance.now() - d.startT);
    const fast = d.dy >= FLICK_DISTANCE && d.dy / elapsed > FLICK_SPEED;
    if (!cancelled && (d.dy >= SHEET_CLOSE_DISTANCE || fast)) {
      onClose();
      return;
    }
    setOffset(0, true);
  };

  return {
    onPointerDown: (event) => {
      if (!enabled || !isSheetViewport() || event.button !== 0) return;
      if ((event.target as HTMLElement).closest('button, a, input, select, textarea')) return;
      drag.current = {
        id: event.pointerId,
        startY: event.clientY,
        startT: performance.now(),
        dy: 0,
      };
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    onPointerMove: (event) => {
      const d = drag.current;
      if (!d || d.id !== event.pointerId) return;
      d.dy = Math.max(0, event.clientY - d.startY);
      setOffset(d.dy, false);
    },
    onPointerUp: (event) => end(event, false),
    onPointerCancel: (event) => end(event, true),
  };
};
