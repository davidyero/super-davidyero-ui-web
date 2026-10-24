export type SkeletonVariant = 'text' | 'block' | 'circle';

export interface SuperSkeletonProps {
  variant?: SkeletonVariant;
  /** Ancho CSS. En `circle` es también el alto. */
  width?: string;
  /** Alto CSS (block). */
  height?: string;
  /** Líneas (text). La última sale más corta, como un párrafo real. */
  lines?: number;
  className?: string;
}
