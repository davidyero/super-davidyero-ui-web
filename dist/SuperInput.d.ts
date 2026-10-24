import { InputHTMLAttributes, ReactElement } from 'react';

interface SuperInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: string;
    rightIcon?: string;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

/**
 * Campo de texto. `type="password"` trae SIEMPRE el ojo de mostrar/ocultar
 * dentro del propio campo: nunca un input de contraseña sin ojo.
 */
declare const SuperInput: ({ label, error, hint, leftIcon, rightIcon, size, fullWidth, id, type, disabled, className, ...rest }: SuperInputProps) => ReactElement;

export { SuperInput, type SuperInputProps };
