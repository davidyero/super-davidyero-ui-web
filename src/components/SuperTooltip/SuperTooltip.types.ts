import type { ReactElement } from 'react';

export interface SuperTooltipProps {
  label: string;
  /** Un único elemento enfocable (botón, enlace…). Recibe `aria-describedby`. */
  children: ReactElement<{ 'aria-describedby'?: string }>;
  placement?: 'top' | 'bottom';
  className?: string;
}
