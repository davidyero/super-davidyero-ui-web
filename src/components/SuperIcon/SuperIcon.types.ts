export type IconColor =
  | 'inherit'
  | 'text'
  | 'textBody'
  | 'textMuted'
  | 'textSubtle'
  | 'primary'
  | 'onPrimary'
  | 'accent'
  | 'onAccent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface SuperIconProps {
  /**
   * Nombre semántico del registro (`icons` del provider, p. ej. `settings`) o
   * un id de Iconify directo (`solar:home-2-broken`).
   */
  name: string;
  size?: number;
  color?: IconColor;
  spin?: boolean;
  /** Si se pasa, el icono se anuncia a lectores de pantalla; si no, se oculta. */
  label?: string;
  className?: string;
}
