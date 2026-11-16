import { ReactElement } from 'react';

/** `right`: a la derecha y centrado en vertical (iconos de una barra lateral). */
type TooltipPlacement = 'top' | 'bottom' | 'right';
interface SuperTooltipProps {
    label: string;
    /** Un único elemento enfocable (botón, enlace…). Recibe `aria-describedby`. */
    children: ReactElement<{
        'aria-describedby'?: string;
    }>;
    placement?: TooltipPlacement;
    /**
     * Ocupa todo el ancho de su contenedor (filas de lista, barras, entradas de una barra
     * lateral) y deja que el texto de dentro se corte con "…".
     */
    block?: boolean;
    className?: string;
}

/** Ayuda breve al pasar el ratón o enfocar. Nunca guarda información esencial. */
declare const SuperTooltip: ({ label, children, placement, block, className, }: SuperTooltipProps) => ReactElement;

export { SuperTooltip };
export type { SuperTooltipProps, TooltipPlacement };
