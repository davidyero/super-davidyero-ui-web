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
    className?: string;
}

/** Ayuda breve al pasar el ratón o enfocar. Nunca guarda información esencial. */
declare const SuperTooltip: ({ label, children, placement, className, }: SuperTooltipProps) => ReactElement;

export { SuperTooltip };
export type { SuperTooltipProps, TooltipPlacement };
