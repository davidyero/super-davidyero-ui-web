export type ProgressTone = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface SuperProgressBarProps {
  value: number;
  max?: number;
  tone?: ProgressTone;
  size?: 'sm' | 'md';
  /** Texto accesible (obligatorio si no hay una etiqueta visible al lado). */
  label: string;
  /** Muestra el porcentaje a la derecha. */
  showValue?: boolean;
  className?: string;
}
