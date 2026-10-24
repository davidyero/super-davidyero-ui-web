import { ReactElement } from 'react';

type LoaderSize = 'sm' | 'md' | 'lg';
/**
 * `inline`: solo el indicador · `block`: centrado con aire (listas, tarjetas) ·
 * `page`: centrado a media pantalla (carga de una vista entera).
 */
type LoaderLayout = 'inline' | 'block' | 'page';
interface SuperLoaderProps {
    size?: LoaderSize;
    layout?: LoaderLayout;
    /** `inherit` toma el color del texto (útil dentro de un botón). */
    color?: 'primary' | 'inherit';
    /** Si es decorativo (p. ej. dentro de un botón que ya anuncia su estado). */
    decorative?: boolean;
    className?: string;
}

/** Indicador de carga. Para bloquear la pantalla usa `SuperLoaderOverlay`. */
declare const SuperLoader: ({ size, layout, color, decorative, className, }: SuperLoaderProps) => ReactElement;

export { type LoaderLayout, type LoaderSize, SuperLoader, type SuperLoaderProps };
