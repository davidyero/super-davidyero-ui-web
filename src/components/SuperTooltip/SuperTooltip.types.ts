import type { ReactElement } from 'react';

/** `right`: a la derecha y centrado en vertical (iconos de una barra lateral). */
export type TooltipPlacement = 'top' | 'bottom' | 'right';

export interface SuperTooltipProps {
  label: string;
  /** Un único elemento enfocable (botón, enlace…). Recibe `aria-describedby`. */
  children: ReactElement<{ 'aria-describedby'?: string }>;
  placement?: TooltipPlacement;
  className?: string;
}
