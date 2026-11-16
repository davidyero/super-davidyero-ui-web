import { ReactNode, MouseEventHandler, ReactElement } from 'react';

interface SuperListItemProps {
    /** Primera línea (nombre). Se corta con puntos suspensivos si no cabe. */
    title: string;
    /** Segunda línea (email, detalle). Se corta si no cabe. */
    subtitle?: string;
    /** Muestra el `subtitle` completo en un tooltip al pasar el ratón o enfocarlo. */
    subtitleTooltip?: boolean;
    /** A la izquierda, centrado: avatar o icono. */
    leading?: ReactNode;
    /**
     * Tercera línea: chips, badges o texto corto (app, plan, fecha). Con `onClick`, sin
     * controles (botones, enlaces): la fila ya es un `<button>`.
     */
    meta?: ReactNode;
    /** A la derecha: valor, fecha o acción (acción solo si la fila no lleva `onClick`). */
    trailing?: ReactNode;
    /** Fondo al pasar el ratón (filas de datos que se recorren con la vista). */
    hoverable?: boolean;
    /** Fila clicable: se pinta como botón. */
    onClick?: MouseEventHandler<HTMLElement>;
    /** Línea separadora bajo la fila (la última de una lista no la lleva). */
    divider?: boolean;
    className?: string;
}

/** Fila de lista: avatar, dos líneas de texto, metadatos y un extremo derecho. */
declare const SuperListItem: ({ title, subtitle, subtitleTooltip, leading, meta, trailing, hoverable, onClick, divider, className, }: SuperListItemProps) => ReactElement;

export { SuperListItem };
export type { SuperListItemProps };
