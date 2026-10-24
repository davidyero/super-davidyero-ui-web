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
    /** ms hasta cerrarse solo. 0 = no se cierra solo. */
    durationMs: number;
    action?: ToastAction;
}
interface ShowToastInput {
    tone?: ToastTone;
    message: string;
    title?: string;
    durationMs?: number;
    action?: ToastAction;
}
/** Opciones de los atajos `toast.success()/error()…`. */
interface ToastOptions {
    title?: string;
    durationMs?: number;
    action?: ToastAction;
}
type Listener = () => void;
/**
 * Toasts centralizados (regla 9 del ecosistema). Los mensajes llegan ya
 * traducidos desde el sistema de errores de la app.
 */
declare const toast: {
    show: ({ tone, message, title, durationMs, action }: ShowToastInput) => string;
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

export { type ShowToastInput, type ToastAction, type ToastItem, type ToastOptions, type ToastTone, toast, useToasts };
