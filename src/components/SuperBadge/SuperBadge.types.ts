import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';
/** Los 5 planes del ecosistema, iguales en todas las apps. */
export type SuperPlan = 'free' | 'lite' | 'pro' | 'thanos' | 'superthanos';

export interface SuperBadgeProps {
  tone?: BadgeTone;
  /**
   * Insignia de plan: pone el icono y el tono del plan (se pueden sobrescribir con
   * `icon`/`tone`). El texto lo da la app, traducido.
   */
  plan?: SuperPlan;
  size?: BadgeSize;
  /** Nombre de icono a la izquierda. */
  icon?: string;
  /** Punto de estado a la izquierda (el texto sigue siendo obligatorio: nunca solo color). */
  dot?: boolean;
  mono?: boolean;
  /** Deja que un texto largo salte de línea en vez de cortarse. */
  wrap?: boolean;
  /** Si se pasa, la etiqueta lleva una X que la quita. */
  onRemove?: () => void;
  /** aria-label de la X (obligatorio con `onRemove`), desde el i18n de la app. */
  removeLabel?: string;
  className?: string;
  children: ReactNode;
}
