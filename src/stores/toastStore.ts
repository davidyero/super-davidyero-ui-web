import { useSyncExternalStore } from 'react';

export type ToastTone = 'success' | 'danger' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  tone: ToastTone;
  /** Texto ya traducido por la app (nunca un error técnico crudo). */
  message: string;
  title?: string;
  /** ms hasta cerrarse solo. 0 = no se cierra solo. */
  durationMs: number;
}

export interface ShowToastInput {
  tone?: ToastTone;
  message: string;
  title?: string;
  durationMs?: number;
}

type Listener = () => void;

const DEFAULT_DURATION = 5000;
const MAX_VISIBLE = 4;

let items: ReadonlyArray<ToastItem> = [];
let seq = 0;
const listeners = new Set<Listener>();
const timers = new Map<string, ReturnType<typeof setTimeout>>();

const emit = (): void => {
  for (const l of listeners) l();
};

const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const dismiss = (id: string): void => {
  const timer = timers.get(id);
  if (timer) clearTimeout(timer);
  timers.delete(id);
  items = items.filter((t) => t.id !== id);
  emit();
};

const show = ({ tone = 'info', message, title, durationMs }: ShowToastInput): string => {
  seq += 1;
  const id = `sd-toast-${seq}`;
  const duration = durationMs ?? (tone === 'danger' ? DEFAULT_DURATION * 1.5 : DEFAULT_DURATION);
  const item: ToastItem = { id, tone, message, durationMs: duration, ...(title ? { title } : {}) };
  items = [...items, item].slice(-MAX_VISIBLE);
  if (duration > 0)
    timers.set(
      id,
      setTimeout(() => dismiss(id), duration),
    );
  emit();
  return id;
};

/**
 * Toasts centralizados (regla 9 del ecosistema). Los mensajes llegan ya
 * traducidos desde el sistema de errores de la app.
 */
export const toast = {
  show,
  success: (message: string, title?: string): string =>
    show({ tone: 'success', message, ...(title ? { title } : {}) }),
  error: (message: string, title?: string): string =>
    show({ tone: 'danger', message, ...(title ? { title } : {}) }),
  warning: (message: string, title?: string): string =>
    show({ tone: 'warning', message, ...(title ? { title } : {}) }),
  info: (message: string, title?: string): string =>
    show({ tone: 'info', message, ...(title ? { title } : {}) }),
  dismiss,
  clear(): void {
    for (const t of timers.values()) clearTimeout(t);
    timers.clear();
    items = [];
    emit();
  },
  getAll(): ReadonlyArray<ToastItem> {
    return items;
  },
  subscribe,
};

export const useToasts = (): ReadonlyArray<ToastItem> =>
  useSyncExternalStore(
    subscribe,
    () => items,
    () => items,
  );
