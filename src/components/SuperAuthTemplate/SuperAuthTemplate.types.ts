import type { ReactNode } from 'react';

export interface SuperAuthHighlight {
  /** Icono del registro o id de Iconify. */
  icon: string;
  label: string;
}

export interface SuperAuthTemplateProps {
  /** Monograma y nombre de la app. Arriba en móvil, en la columna de marca en escritorio. */
  brand: ReactNode;
  /** La frase de la app: el titular grande. */
  tagline: string;
  /** Una línea bajo el titular. */
  hint?: string;
  /** Lo que hay dentro, como chips que pasan solos (quietos con movimiento reducido). */
  highlights?: SuperAuthHighlight[];
  /** Arriba a la derecha: idioma y tema. */
  topActions?: ReactNode;
  /**
   * Decoración propia de la app sobre el fondo (rejilla y halos), p. ej. figuras
   * animadas de su temática. Va detrás de todo y no recibe clics.
   */
  backdrop?: ReactNode;
  /** Bajo el formulario: versión, enlaces legales. */
  footer?: ReactNode;
  /** El formulario. */
  children: ReactNode;
  className?: string;
}
