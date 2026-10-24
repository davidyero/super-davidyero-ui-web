type ToastTone = 'success' | 'danger' | 'warning' | 'info';
interface ToastItem {
    id: string;
    tone: ToastTone;
    /** Texto ya traducido por la app (nunca un error técnico crudo). */
    message: string;
    title?: string;
    /** ms hasta cerrarse solo. 0 = no se cierra solo. */
    durationMs: number;
}
interface ShowToastInput {
    tone?: ToastTone;
    message: string;
    title?: string;
    durationMs?: number;
}
type Listener = () => void;
/**
 * Toasts centralizados (regla 9 del ecosistema). Los mensajes llegan ya
 * traducidos desde el sistema de errores de la app.
 */
declare const toast: {
    show: ({ tone, message, title, durationMs }: ShowToastInput) => string;
    success: (message: string, title?: string) => string;
    error: (message: string, title?: string) => string;
    warning: (message: string, title?: string) => string;
    info: (message: string, title?: string) => string;
    dismiss: (id: string) => void;
    clear(): void;
    getAll(): ReadonlyArray<ToastItem>;
    subscribe: (listener: Listener) => (() => void);
};
declare const useToasts: () => ReadonlyArray<ToastItem>;

export { type ShowToastInput, type ToastItem, type ToastTone, toast, useToasts };
