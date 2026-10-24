import type { InputHTMLAttributes } from 'react';

export interface SuperInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: string;
  rightIcon?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}
