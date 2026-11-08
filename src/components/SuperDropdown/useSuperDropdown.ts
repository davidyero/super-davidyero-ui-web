import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import type { SuperDropdownOption } from './SuperDropdown.types';

const MAX_LIST_HEIGHT = 280;
const GAP = 6;

export interface ListPosition {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  /** true = la lista se abre hacia arriba (no cabe debajo). */
  up: boolean;
}

/**
 * Lógica del selector propio (patrón "combobox de solo selección" de WAI-ARIA):
 * flechas, Inicio/Fin, Enter/Espacio, Escape, búsqueda por letra y clic fuera.
 * La lista va en un portal con posición fija, así no la recorta un contenedor con scroll.
 */
export const useSuperDropdown = <TValue extends string>({
  value,
  options,
  onChange,
  disabled,
  id,
}: {
  value: TValue | '';
  options: ReadonlyArray<SuperDropdownOption<TValue>>;
  onChange: (value: TValue) => void;
  disabled: boolean;
  id?: string;
}) => {
  const autoId = useId();
  const baseId = id ?? autoId;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [position, setPosition] = useState<ListPosition | null>(null);
  const typed = useRef({ text: '', at: 0 });

  const selectedIndex = options.findIndex((o) => o.value === value);
  const enabled = (index: number): boolean => index >= 0 && !options[index]?.disabled;

  const step = (from: number, delta: 1 | -1): number => {
    for (let i = from + delta; i >= 0 && i < options.length; i += delta) if (enabled(i)) return i;
    return from;
  };
  const first = (): number => step(-1, 1);
  const last = (): number => step(options.length, -1);

  const place = useCallback((): void => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const below = window.innerHeight - rect.bottom - GAP * 2;
    const above = rect.top - GAP * 2;
    const up = below < Math.min(MAX_LIST_HEIGHT, 160) && above > below;
    setPosition({
      top: up ? rect.top - GAP : rect.bottom + GAP,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.max(120, Math.min(MAX_LIST_HEIGHT, up ? above : below)),
      up,
    });
  }, []);

  const openList = (index?: number): void => {
    if (disabled || options.length === 0) return;
    place();
    setActive(index ?? (enabled(selectedIndex) ? selectedIndex : first()));
    setOpen(true);
  };

  const close = (focusTrigger = true): void => {
    setOpen(false);
    setActive(-1);
    if (focusTrigger) triggerRef.current?.focus();
  };

  const choose = (index: number): void => {
    const option = options[index];
    if (!option || option.disabled) return;
    if (option.value !== value) onChange(option.value);
    close();
  };

  // Mientras está abierta: se recoloca con scroll/resize y se cierra con clic fuera.
  useLayoutEffect(() => {
    if (!open) return undefined;
    const onScroll = (): void => place();
    const onDown = (event: MouseEvent | TouchEvent): void => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      close(false);
    };
    window.addEventListener('resize', onScroll);
    window.addEventListener('scroll', onScroll, true);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('scroll', onScroll, true);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open, place]);

  // La opción activa siempre a la vista dentro de la lista.
  useEffect(() => {
    if (!open || active < 0) return;
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    node?.scrollIntoView?.({ block: 'nearest' });
  }, [open, active]);

  /** Búsqueda por letra: escribir "co" salta a "Colombia". */
  const typeahead = (key: string): number | null => {
    const now = Date.now();
    typed.current.text = now - typed.current.at > 700 ? key : typed.current.text + key;
    typed.current.at = now;
    const text = typed.current.text.toLowerCase();
    const start = open ? active : selectedIndex;
    const order = [...options.keys()].map((_, i) => (start + 1 + i) % options.length);
    const hit = order.find((i) => enabled(i) && options[i]?.label.toLowerCase().startsWith(text));
    return hit ?? null;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (disabled) return;
    const { key } = event;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
        event.preventDefault();
        openList(key === 'ArrowUp' && !enabled(selectedIndex) ? last() : undefined);
      } else if (key.length === 1 && /\S/.test(key)) {
        const hit = typeahead(key);
        if (hit !== null) choose(hit);
      }
      return;
    }
    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        setActive((i) => step(i, 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActive((i) => step(i, -1));
        break;
      case 'Home':
        event.preventDefault();
        setActive(first());
        break;
      case 'End':
        event.preventDefault();
        setActive(last());
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        choose(active);
        break;
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'Tab':
        close(false);
        break;
      default:
        if (key.length === 1 && /\S/.test(key)) {
          const hit = typeahead(key);
          if (hit !== null) setActive(hit);
        }
    }
  };

  return {
    baseId,
    listId: `${baseId}-list`,
    optionId: (index: number) => `${baseId}-option-${index}`,
    triggerRef,
    listRef,
    open,
    active,
    setActive,
    position,
    selected: options[selectedIndex] ?? null,
    toggle: () => (open ? close() : openList()),
    choose,
    onKeyDown,
  };
};
