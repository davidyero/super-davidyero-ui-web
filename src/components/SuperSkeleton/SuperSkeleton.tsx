import type { ReactElement } from 'react';
import { Lines, Shimmer } from './SuperSkeleton.styles';
import type { SuperSkeletonProps } from './SuperSkeleton.types';

/**
 * Esqueleto con shimmer mientras carga. Respeta el tamaño del contenido real
 * para que no haya salto de layout. Decorativo: oculto a lectores de pantalla.
 */
export const SuperSkeleton = ({
  variant = 'block',
  width,
  height,
  lines = 3,
  className,
}: SuperSkeletonProps): ReactElement => {
  if (variant === 'circle') {
    const size = width ?? '40px';
    return <Shimmer $w={size} $h={size} $round className={className} aria-hidden />;
  }
  if (variant === 'text') {
    return (
      <Lines className={className} aria-hidden>
        {Array.from({ length: Math.max(1, lines) }, (_, i) => (
          <Shimmer
            key={i}
            $w={i === lines - 1 && lines > 1 ? '60%' : (width ?? '100%')}
            $h="14px"
            $round={false}
          />
        ))}
      </Lines>
    );
  }
  return (
    <Shimmer
      $w={width ?? '100%'}
      $h={height ?? '80px'}
      $round={false}
      className={className}
      aria-hidden
    />
  );
};

export type { SuperSkeletonProps, SkeletonVariant } from './SuperSkeleton.types';
