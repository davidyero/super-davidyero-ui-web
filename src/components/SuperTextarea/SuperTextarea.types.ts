import type { TextareaHTMLAttributes } from 'react';

export interface SuperTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  /** Con `maxLength`, muestra el contador `n/max`. */
  showCount?: boolean;
}
