import { useSyncExternalStore } from 'react';

// src/stores/loaderStore.ts
var active = 0;
var listeners = /* @__PURE__ */ new Set();
var emit = () => {
  for (const l of listeners) l();
};
var subscribe = (listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
var loaderStore = {
  /** Suma una petición. Devuelve la función que la cierra (idempotente). */
  start() {
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
  stop() {
    if (active === 0) return;
    active -= 1;
    emit();
  },
  /** Cuenta la promesa mientras está pendiente y la devuelve tal cual. */
  async track(promise, options = {}) {
    if (options.silent) return promise;
    const release = loaderStore.start();
    try {
      return await promise;
    } finally {
      release();
    }
  },
  getActive() {
    return active;
  },
  /** Solo para tests o para salir de un estado colgado. */
  reset() {
    active = 0;
    emit();
  },
  subscribe
};
var useLoaderActive = () => useSyncExternalStore(
  subscribe,
  () => active > 0,
  () => false
);

export { loaderStore, useLoaderActive };
