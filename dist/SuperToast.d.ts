import { ReactElement } from 'react';

interface SuperToastProps {
    /** Esquina donde aparecen. Se monta UNA vez en la raíz. */
    position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

/**
 * Donde aparecen los toasts que lanza `toast.success()/error()…`. Se monta una
 * sola vez en la raíz; los errores de la app llegan aquí ya traducidos.
 */
declare const SuperToast: ({ position }: SuperToastProps) => ReactElement;

export { SuperToast, type SuperToastProps };
