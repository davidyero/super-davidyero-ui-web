import type { ReactNode } from 'react';

export interface SuperModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** Línea de apoyo bajo el título. */
  subtitle?: string;
  /** Pie con acciones (normalmente `SuperButton`s). */
  footer?: ReactNode;
  align?: 'center' | 'top';
  /** Ancho máximo en px. */
  width?: number;
  padded?: boolean;
  /** Cerrar al pulsar fuera. Desactívalo en formularios largos. */
  closeOnBackdrop?: boolean;
  /**
   * En móvil y Fold (por debajo de `md`, 900 px) se abre como bottom sheet: pegado
   * abajo, a todo el ancho, con asa y subiendo desde abajo. En escritorio no cambia.
   */
  mobileSheet?: boolean;
  children: ReactNode;
}
