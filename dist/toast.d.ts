type ToastTone = 'success' | 'danger' | 'warning' | 'info';
/** Acción dentro del toast (p. ej. «Deshacer»). Al pulsarla, el toast se cierra. */
interface ToastAction {
    label: string;
    onClick: () => void;
}
interface ToastItem {
    id: string;
    tone: ToastTone;
    /** Texto ya traducido por la app (nunca un error técnico crudo). */
    message: string;
    title?: string;
    /** ms hasta cerrarse solo: siempre 5000, o 7500 los de error. */
    durationMs: number;
    action?: ToastAction;
}
interface ShowToastInput {
    tone?: ToastTone;
    message: string;
    title?: string;
    /** @deprecated Se ignora: la duración es fija en todo el ecosistema (5 s; errores 7,5 s). */
    durationMs?: number;
    action?: ToastAction;
}
/** Opciones de los atajos `toast.success()/error()…`. */
interface ToastOptions {
    title?: string;
    /** @deprecated Se ignora: la duración es fija en todo el ecosistema (5 s; errores 7,5 s). */
    durationMs?: number;
    action?: ToastAction;
}
type Listener = () => void;
/** Duración fija de todos los toasts del ecosistema; los de error duran más. */
declare const TOAST_DURATION_MS = 5000;
declare const TOAST_ERROR_DURATION_MS = 7500;
/**
 * Toasts centralizados (regla 9 del ecosistema). Los mensajes llegan ya
 * traducidos desde el sistema de errores de la app.
 */
declare const toast: {
    show: ({ tone, message, title, action }: ShowToastInput) => string;
    success: (message: string, opts?: string | ToastOptions) => string;
    error: (message: string, opts?: string | ToastOptions) => string;
    warning: (message: string, opts?: string | ToastOptions) => string;
    info: (message: string, opts?: string | ToastOptions) => string;
    dismiss: (id: string) => void;
    clear(): void;
    getAll(): ReadonlyArray<ToastItem>;
    subscribe: (listener: Listener) => (() => void);
};
declare const useToasts: () => ReadonlyArray<ToastItem>;

export { TOAST_DURATION_MS, TOAST_ERROR_DURATION_MS, toast, useToasts };
export type { ShowToastInput, ToastAction, ToastItem, ToastOptions, ToastTone };
