import type { ReactElement } from 'react';

/** `right`: a la derecha y centrado en vertical (iconos de una barra lateral). */
export type TooltipPlacement = 'top' | 'bottom' | 'right';

export interface SuperTooltipProps {
  label: string;
  /** Un único elemento enfocable (botón, enlace…). Recibe `aria-describedby`. */
  children: ReactElement<{ 'aria-describedby'?: string }>;
  placement?: TooltipPlacement;
  /**
   * Ocupa todo el ancho de su contenedor (filas de lista, barras, entradas de una barra
   * lateral) y deja que el texto de dentro se corte con "…".
   */
  block?: boolean;
  className?: string;
}
