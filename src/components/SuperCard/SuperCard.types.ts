import type { ElementType, MouseEventHandler, ReactNode } from 'react';

export type CardVariant = 'default' | 'sunken' | 'elevated' | 'outline';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface SuperCardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  /** Hover y cursor de elemento clicable (usa `as="button"` o un enlace). */
  interactive?: boolean;
  as?: ElementType;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  id?: string;
  children: ReactNode;
}
