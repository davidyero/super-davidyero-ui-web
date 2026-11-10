import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Pila de diálogos abiertos (SuperModal y SuperDrawer). Solo el de arriba atiende
 * Escape y Tab: con dos apilados, Escape cierra el último que se abrió.
 */
const stack: symbol[] = [];
const isTop = (token: symbol): boolean => stack[stack.length - 1] === token;

/**
 * Escape cierra, Tab no sale del diálogo, el foco entra al abrir y vuelve al
 * elemento que lo abrió al cerrar, y el fondo no hace scroll.
 *
 * El teclado se escucha en `document` en fase de burbuja: lo que hay dentro del diálogo
 * lo recibe antes. Un control que use Escape para sí (la lista abierta de SuperDropdown)
 * llama a `preventDefault()` y el diálogo no se cierra.
 */
export const useSuperModal = (
  open: boolean,
  onClose: () => void,
): RefObject<HTMLDivElement | null> => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusables = (): HTMLElement[] =>
      dialog ? Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];

    const token = Symbol('sd-modal');
    stack.push(token);

    (focusables()[0] ?? dialog)?.focus();
    // Bloquea el scroll sin que el contenido salte ni quede una franja sin velo:
    // con `scrollbar-gutter: stable` el hueco de la barra seguiría reservado y la
    // capa fija no lo cubriría. Se quita el hueco y se compensa con padding.
    const html = document.documentElement;
    const gutter = window.innerWidth - html.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const previousGutter = html.style.scrollbarGutter;
    const previousBodyGutter = document.body.style.scrollbarGutter;
    document.body.style.overflow = 'hidden';
    if (gutter > 0) {
      html.style.scrollbarGutter = 'auto';
      document.body.style.scrollbarGutter = 'auto';
      document.body.style.paddingRight = `${gutter}px`;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (!isTop(token) || event.defaultPrevented) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      stack.splice(stack.indexOf(token), 1);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      html.style.scrollbarGutter = previousGutter;
      document.body.style.scrollbarGutter = previousBodyGutter;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return dialogRef;
};
