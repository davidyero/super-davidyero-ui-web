import type { ReactNode } from 'react';

export interface SuperBulletListProps {
  /** Cada ítem (texto o nodo). El marcador es SIEMPRE el mismo en toda la app. */
  items: ReadonlyArray<ReactNode>;
  spacing?: 'sm' | 'md';
  /** Lista ordenada (números) en vez de viñetas. */
  ordered?: boolean;
  className?: string;
}
