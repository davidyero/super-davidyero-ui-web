import { useRef, type KeyboardEvent } from 'react';
import type { SuperTabItem } from './SuperTabs.types';

/** Flechas, Inicio y Fin mueven y activan la pestaña (patrón ARIA de tabs). */
export const useSuperTabs = <TId extends string>(
  items: ReadonlyArray<SuperTabItem<TId>>,
  value: TId,
  onChange: (id: TId) => void,
) => {
  const refs = useRef(new Map<TId, HTMLButtonElement>());
  const enabled = items.filter((item) => !item.disabled);

  const move = (to: SuperTabItem<TId> | undefined): void => {
    if (!to) return;
    onChange(to.id);
    refs.current.get(to.id)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const index = enabled.findIndex((item) => item.id === value);
    if (event.key === 'ArrowRight') move(enabled[(index + 1) % enabled.length]);
    else if (event.key === 'ArrowLeft')
      move(enabled[(index - 1 + enabled.length) % enabled.length]);
    else if (event.key === 'Home') move(enabled[0]);
    else if (event.key === 'End') move(enabled[enabled.length - 1]);
    else return;
    event.preventDefault();
  };

  const register = (id: TId) => (el: HTMLButtonElement | null) => {
    if (el) refs.current.set(id, el);
    else refs.current.delete(id);
  };

  return { onKeyDown, register };
};
