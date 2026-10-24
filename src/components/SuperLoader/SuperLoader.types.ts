export type LoaderSize = 'sm' | 'md' | 'lg';

export interface SuperLoaderProps {
  size?: LoaderSize;
  /** `inherit` toma el color del texto (útil dentro de un botón). */
  color?: 'primary' | 'inherit';
  /** Si es decorativo (p. ej. dentro de un botón que ya anuncia su estado). */
  decorative?: boolean;
  className?: string;
}
