import type { ReactNode } from 'react';

export type SuperBrandSize = 'sm' | 'md';

/**
 * Marca de una web: su logo y su nombre en una fila. La misma pieza en el login
 * (`SuperLogin brand`, tamaño `md`) y arriba del sidebar (`SuperSidebar header`, `sm`).
 */
export interface SuperBrandProps {
  /** Nombre visible de la web, ya traducido si hiciera falta. */
  name: string;
  /**
   * El dibujo de la web (un SVG propio, el mismo del favicon). Sin él, un cuadrado con el
   * color de marca y la inicial del nombre.
   */
  logo?: ReactNode;
  /** `md` (logo de 36 px y nombre en `h3`, por defecto: login) o `sm` (28 px: sidebar). */
  size?: SuperBrandSize;
  /** Solo el logo, con el nombre para lectores de pantalla (sidebar plegado). */
  hideName?: boolean;
  className?: string;
}
