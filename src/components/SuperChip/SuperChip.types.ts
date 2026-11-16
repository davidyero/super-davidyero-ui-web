import type { ReactNode } from 'react';

export type SuperChipSize = 'sm' | 'md';

export interface SuperChipProps {
  /** Texto del chip, ya traducido. */
  children: ReactNode;
  /**
   * Con valor, el chip es un interruptor (filtros): se anuncia con `aria-pressed` y,
   * marcado, se pinta con el tono suave de la marca. Sin valor, es un botón o una etiqueta.
   */
  selected?: boolean;
  /** Sin `onClick` ni `selected`, el chip es solo una etiqueta (no enfocable). */
  onClick?: () => void;
  /** Pieza a la izquierda del texto (avatar, icono); recorta el relleno de ese lado. */
  leading?: ReactNode;
  /** `sm` (32 px, por defecto: filtros en tarjetas) o `md` (40 px). */
  size?: SuperChipSize;
  disabled?: boolean;
  className?: string;
}

export interface SuperChipGroupProps {
  /** Nombre del grupo para lectores de pantalla ("Filtrar por pagador"). */
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}
