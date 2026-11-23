import { CSSProperties } from 'react';

/**
 * Entrada escalonada de una lista, solo la primera vez que llega con elementos: fundido
 * con `offset.sm` en `base`, 30 ms entre uno y otro y los del 8.º en adelante a la vez.
 * No se repite al refrescar ni al paginar, y con «Reducir movimiento» no hace nada.
 *
 * ```tsx
 * const stagger = useStagger(items.length);
 * items.map((item, i) => <SuperListItem key={item.id} {...stagger(i)} />)
 * ```
 */
declare const useStagger: (count: number) => ((index: number) => {
    style?: CSSProperties;
});

export { useStagger };
