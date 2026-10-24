import { ReactElement } from 'react';

interface SuperLoaderOverlayProps {
    /**
     * Fuerza el estado. Si se omite, lo decide `loaderStore` (peticiones activas).
     * Se monta UNA sola vez en la raíz.
     */
    visible?: boolean;
    /** Espera antes de mostrarse, para no parpadear en peticiones muy rápidas. */
    delayMs?: number;
}

/**
 * Loader de pantalla completa: atenúa el fondo y bloquea el toque. Lo activa
 * `loaderStore` desde los interceptores HTTP, o a mano para acciones críticas.
 * Montar una sola vez en la raíz; nunca uno por vista.
 */
declare const SuperLoaderOverlay: ({ visible, delayMs, }: SuperLoaderOverlayProps) => ReactElement | null;

export { SuperLoaderOverlay, type SuperLoaderOverlayProps };
