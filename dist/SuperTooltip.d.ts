import { ReactElement } from 'react';

interface SuperTooltipProps {
    label: string;
    /** Un único elemento enfocable (botón, enlace…). Recibe `aria-describedby`. */
    children: ReactElement<{
        'aria-describedby'?: string;
    }>;
    placement?: 'top' | 'bottom';
    className?: string;
}

/** Ayuda breve al pasar el ratón o enfocar. Nunca guarda información esencial. */
declare const SuperTooltip: ({ label, children, placement, className, }: SuperTooltipProps) => ReactElement;

export { SuperTooltip, type SuperTooltipProps };
