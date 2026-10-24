import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface SuperBadgeProps {
  tone?: BadgeTone;
  size?: BadgeSize;
  /** Nombre de icono a la izquierda. */
  icon?: string;
  /** Punto de estado a la izquierda (el texto sigue siendo obligatorio: nunca solo color). */
  dot?: boolean;
  mono?: boolean;
  className?: string;
  children: ReactNode;
}
