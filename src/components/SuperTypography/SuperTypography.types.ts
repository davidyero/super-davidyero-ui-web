import type { ElementType, ReactNode } from 'react';
import type { FontWeight, TextVariant } from '../../styles/scale';

export type TypographyColor =
  | 'text'
  | 'textBody'
  | 'textMuted'
  | 'textSubtle'
  | 'primary'
  | 'accent'
  | 'onAccent'
  | 'onPrimary'
  | 'primarySoftText'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  /** Variantes para texto: legibles (4,5:1) sobre la superficie, a diferencia del tono pleno. */
  | 'successText'
  | 'warningText'
  | 'dangerText'
  | 'infoText'
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
  role?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-label'?: string;
  title?: string;
  className?: string;
  children: ReactNode;
}

export type { TextVariant, FontWeight };
