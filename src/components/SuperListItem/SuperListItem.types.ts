import type { MouseEventHandler, ReactNode } from 'react';

export interface SuperListItemProps {
  /** Primera línea (nombre). Se corta con puntos suspensivos si no cabe. */
  title: string;
  /** Segunda línea (email, detalle). Se corta si no cabe. */
  subtitle?: string;
  /** Muestra el `subtitle` completo en un tooltip al pasar el ratón o enfocarlo. */
  subtitleTooltip?: boolean;
  /** A la izquierda, centrado: avatar o icono. */
  leading?: ReactNode;
  /** Tercera línea: chips, badges o texto corto (app, plan, fecha). */
  meta?: ReactNode;
  /** A la derecha: valor, fecha o acción. */
  trailing?: ReactNode;
  /** Fondo al pasar el ratón (filas de datos que se recorren con la vista). */
  hoverable?: boolean;
  /** Fila clicable: se pinta como botón. */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Línea separadora bajo la fila (la última de una lista no la lleva). */
  divider?: boolean;
  className?: string;
}
