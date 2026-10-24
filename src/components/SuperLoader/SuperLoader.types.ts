export type LoaderSize = 'sm' | 'md' | 'lg';

/**
 * `inline`: solo el indicador · `block`: centrado con aire (listas, tarjetas) ·
 * `page`: centrado a media pantalla (carga de una vista entera).
 */
export type LoaderLayout = 'inline' | 'block' | 'page';

export interface SuperLoaderProps {
  size?: LoaderSize;
  layout?: LoaderLayout;
  /** `inherit` toma el color del texto (útil dentro de un botón). */
  color?: 'primary' | 'inherit';
  /** Si es decorativo (p. ej. dentro de un botón que ya anuncia su estado). */
  decorative?: boolean;
  className?: string;
}
