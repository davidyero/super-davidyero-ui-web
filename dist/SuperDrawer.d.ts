import { ReactNode, ReactElement } from 'react';

interface SuperDrawerProps {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    /** Línea secundaria bajo el título. */
    subtitle?: ReactNode;
    /** Contenido sobre el título (p. ej. un chip con el tipo de clase). */
    eyebrow?: ReactNode;
    /** Pie fijo: resumen + acción principal. */
    footer?: ReactNode;
    /** Ancho en escritorio (px). En móvil ocupa toda la pantalla. */
    width?: number;
    children: ReactNode;
}

/**
 * Panel lateral derecho (en móvil, pantalla completa) con cabecera, cuerpo con
 * scroll y pie fijo. Mismo comportamiento que `SuperModal`: Escape cierra, el
 * foco no sale del panel y vuelve al elemento que lo abrió.
 */
declare const SuperDrawer: ({ open, onClose, title, subtitle, eyebrow, footer, width, children, }: SuperDrawerProps) => ReactElement | null;

export { SuperDrawer };
export type { SuperDrawerProps };
