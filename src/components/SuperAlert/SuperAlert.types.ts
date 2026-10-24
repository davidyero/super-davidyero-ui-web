import type { ReactNode } from 'react';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface SuperAlertProps {
  tone?: AlertTone;
  title?: string;
  children: ReactNode;
  /** Muestra la X de cerrar (texto accesible: `labels.dismiss`). */
  dismissible?: boolean;
  onDismiss?: () => void;
  /** Acción opcional bajo el texto. */
  action?: ReactNode;
  className?: string;
}
