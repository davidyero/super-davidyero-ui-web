import type { ReactNode } from 'react';

export interface SuperModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** Pie con acciones (normalmente `SuperButton`s). */
  footer?: ReactNode;
  align?: 'center' | 'top';
  /** Ancho máximo en px. */
  width?: number;
  padded?: boolean;
  /** Cerrar al pulsar fuera. Desactívalo en formularios largos. */
  closeOnBackdrop?: boolean;
  children: ReactNode;
}
