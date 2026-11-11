import { ReactElement } from 'react';

interface SuperToastProps {
    /** Esquina donde aparece. Se monta UNA vez en la raíz. */
    position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

/**
 * Donde aparecen los toasts que lanza `toast.success()/error()…`. Se monta una sola
 * vez en la raíz; los errores de la app llegan aquí ya traducidos.
 *
 * Por dentro usa Ding (física de muelle, un solo toast que se transforma en vez de
 * apilarse). La API pública sigue siendo el store `@davidyero/ui-web/toast`: las apps
 * no cambian nada. Tema, colores y textos salen de `SuperThemeProvider`.
 */
declare const SuperToast: ({ position }: SuperToastProps) => ReactElement;

export { SuperToast };
export type { SuperToastProps };
