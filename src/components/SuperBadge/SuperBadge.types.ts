import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';
/** Los 5 planes del ecosistema, iguales en todas las apps. */
export type SuperPlan = 'free' | 'lite' | 'pro' | 'thanos' | 'superthanos';
/** Roles de equipo del ecosistema; thanos y superthanos son los de plataforma. */
export type SuperRole =
  | 'superthanos'
  | 'thanos'
  | 'owner'
  | 'admin'
  | 'editor'
  | 'viewer'
  | 'reception'
  | 'staff'
  | 'member'
  | 'moderator';

export interface SuperBadgeProps {
  tone?: BadgeTone;
  /**
   * Insignia de plan: pone el icono y el tono del plan (se pueden sobrescribir con
   * `icon`/`tone`). El texto lo da la app, traducido.
   */
  plan?: SuperPlan;
  /**
   * Insignia de rol: pone el icono y el tono del rol (se pueden sobrescribir con
   * `icon`/`tone`). Si llegan `plan` y `role`, gana `plan`. El texto lo da la app, traducido.
   */
  role?: SuperRole;
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
