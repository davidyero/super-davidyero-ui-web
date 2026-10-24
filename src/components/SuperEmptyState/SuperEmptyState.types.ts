import type { ReactNode } from 'react';

export interface SuperEmptyStateProps {
  /** Nombre de icono (por defecto `empty`). */
  icon?: string;
  title: string;
  description?: string;
  /** Acción principal (normalmente un `SuperButton`). */
  action?: ReactNode;
  compact?: boolean;
  className?: string;
}
