import type { ElementType, ReactNode } from 'react';
import type { FontWeight, TextVariant } from '../../styles/scale';

export type TypographyColor =
  | 'text'
  | 'textBody'
  | 'textMuted'
  | 'primary'
  | 'onPrimary'
  | 'primarySoftText'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'inherit';

export type TypographyAlign = 'left' | 'center' | 'right';

export interface SuperTypographyProps {
  variant?: TextVariant;
  /** Cambia la etiqueta HTML. Por defecto una sensata para cada variante. */
  as?: ElementType;
  color?: TypographyColor;
  weight?: FontWeight;
  align?: TypographyAlign;
  truncate?: boolean;
  uppercase?: boolean;
  mono?: boolean;
  id?: string;
  title?: string;
  className?: string;
  children: ReactNode;
}

export type { TextVariant, FontWeight };
