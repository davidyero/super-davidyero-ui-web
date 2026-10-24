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
interface TrackOptions {
    /** true = no cuenta (polling, refetch en segundo plano, autosave). */
    silent?: boolean;
}
declare const loaderStore: {
    /** Suma una petición. Devuelve la función que la cierra (idempotente). */
    start(): () => void;
    /** Resta una petición. Nunca baja de cero. */
    stop(): void;
    /** Cuenta la promesa mientras está pendiente y la devuelve tal cual. */
    track<T>(promise: Promise<T>, options?: TrackOptions): Promise<T>;
    getActive(): number;
    /** Solo para tests o para salir de un estado colgado. */
    reset(): void;
    subscribe: (listener: Listener) => (() => void);
};
/** true mientras haya al menos una petición activa. */
declare const useLoaderActive: () => boolean;

export { type TrackOptions, loaderStore, useLoaderActive };
