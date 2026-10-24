import * as react from 'react';
import { InputHTMLAttributes } from 'react';

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
declare const SuperInput: react.ForwardRefExoticComponent<SuperInputProps & react.RefAttributes<HTMLInputElement>>;

export { SuperInput, type SuperInputProps };
