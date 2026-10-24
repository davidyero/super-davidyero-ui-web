import { ReactElement } from 'react';

type LoaderSize = 'sm' | 'md' | 'lg';
interface SuperLoaderProps {
    size?: LoaderSize;
    /** `inherit` toma el color del texto (útil dentro de un botón). */
    color?: 'primary' | 'inherit';
    /** Si es decorativo (p. ej. dentro de un botón que ya anuncia su estado). */
    decorative?: boolean;
    className?: string;
}

/** Indicador de carga. Para bloquear la pantalla usa `SuperLoaderOverlay`. */
declare const SuperLoader: ({ size, color, decorative, className, }: SuperLoaderProps) => ReactElement;

export { type LoaderSize, SuperLoader, type SuperLoaderProps };
