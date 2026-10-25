import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  'primary' | 'secondary' | 'neutral' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface SuperButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Spinner interno, bloquea el clic y evita el doble envío hasta que resuelve. */
  loading?: boolean;
  fullWidth?: boolean;
  /** Nombre de icono (registro del provider o id de Iconify). */
  leftIcon?: string;
  rightIcon?: string;
  /** Solo icono: el texto accesible va en `aria-label`. */
  iconOnly?: boolean;
  /**
   * Convierte el botón en un enlace real (`<a>`), con el mismo aspecto.
   * Mantiene clic central, copiar enlace y abrir en pestaña nueva.
   */
  href?: string;
  /** Con `href`: abrir en pestaña nueva (por defecto sí si es externo). */
  external?: boolean;
  children?: ReactNode;
}
