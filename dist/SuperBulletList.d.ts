import { ReactNode, ReactElement } from 'react';

interface SuperBulletListProps {
    /** Cada ítem (texto o nodo). El marcador es SIEMPRE el mismo en toda la app. */
    items: ReadonlyArray<ReactNode>;
    spacing?: 'sm' | 'md';
    /** Lista ordenada (números) en vez de viñetas. */
    ordered?: boolean;
    className?: string;
}

/** Lista con viñetas: un único marcador en toda la app (nada de `•` sueltos). */
declare const SuperBulletList: ({ items, spacing, ordered, className, }: SuperBulletListProps) => ReactElement;

export { SuperBulletList, type SuperBulletListProps };
