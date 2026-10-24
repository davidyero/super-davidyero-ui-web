import { useSyncExternalStore } from 'react';

/**
 * Contador de peticiones activas que alimenta `SuperLoaderOverlay`.
 * Pensado para los interceptores del cliente HTTP: cada petición suma al
 * empezar y resta al terminar. Con peticiones solapadas el overlay sigue
 * visible hasta que acaba la última.
 *
 * Polling, refetch en segundo plano y autosave NO deben levantarlo: usa
 * `track(promise, { silent: true })` o simplemente no llames a `start()`.
 */
type Listener = () => void;

let active = 0;
const listeners = new Set<Listener>();

const emit = (): void => {
  for (const l of listeners) l();
};

const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export interface TrackOptions {
  /** true = no cuenta (polling, refetch en segundo plano, autosave). */
  silent?: boolean;
}

export const loaderStore = {
  /** Suma una petición. Devuelve la función que la cierra (idempotente). */
  start(): () => void {
    active += 1;
    emit();
    let done = false;
    return () => {
      if (done) return;
      done = true;
      loaderStore.stop();
    };
  },
  /** Resta una petición. Nunca baja de cero. */
  stop(): void {
    if (active === 0) return;
    active -= 1;
    emit();
  },
  /** Cuenta la promesa mientras está pendiente y la devuelve tal cual. */
  async track<T>(promise: Promise<T>, options: TrackOptions = {}): Promise<T> {
    if (options.silent) return promise;
    const release = loaderStore.start();
    try {
      return await promise;
    } finally {
      release();
    }
  },
  getActive(): number {
    return active;
  },
  /** Solo para tests o para salir de un estado colgado. */
  reset(): void {
    active = 0;
    emit();
  },
  subscribe,
};

/** true mientras haya al menos una petición activa. */
export const useLoaderActive = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => active > 0,
    () => false,
  );
