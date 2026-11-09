import type { ReactNode } from 'react';

export interface SuperDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  /** Línea secundaria bajo el título. */
  subtitle?: ReactNode;
  /** Contenido sobre el título (p. ej. un chip con el tipo de clase). */
  eyebrow?: ReactNode;
  /** Pie fijo: resumen + acción principal. */
  footer?: ReactNode;
  /** Ancho en escritorio (px). En móvil ocupa toda la pantalla. */
  width?: number;
  children: ReactNode;
}
