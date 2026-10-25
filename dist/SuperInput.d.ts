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
    /** Marca el campo como inválido sin mensaje (el mensaje va en `error`). */
    invalid?: boolean;
    /** Texto en monoespaciada (importes, códigos). */
    mono?: boolean;
    /** Si se pasa y hay valor, aparece una X para vaciar el campo. */
    onClear?: () => void;
}

/**
 * Campo de texto. `type="password"` trae SIEMPRE el ojo de mostrar/ocultar
 * dentro del propio campo: nunca un input de contraseña sin ojo.
 */
declare const SuperInput: react.ForwardRefExoticComponent<SuperInputProps & react.RefAttributes<HTMLInputElement>>;

export { SuperInput, type SuperInputProps };
