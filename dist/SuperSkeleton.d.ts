import { ReactElement } from 'react';

type SkeletonVariant = 'text' | 'block' | 'circle';
interface SuperSkeletonProps {
    variant?: SkeletonVariant;
    /** Ancho CSS. En `circle` es también el alto. */
    width?: string;
    /** Alto CSS (block). */
    height?: string;
    /** Líneas (text). La última sale más corta, como un párrafo real. */
    lines?: number;
    /** Relación de aspecto CSS del bloque (`'4 / 5'`); gana a `height`. */
    aspectRatio?: string;
    className?: string;
}

/**
 * Esqueleto con shimmer mientras carga. Respeta el tamaño del contenido real
 * para que no haya salto de layout. Decorativo: oculto a lectores de pantalla.
 */
declare const SuperSkeleton: ({ variant, width, height, lines, aspectRatio, className, }: SuperSkeletonProps) => ReactElement;

export { type SkeletonVariant, SuperSkeleton, type SuperSkeletonProps };
