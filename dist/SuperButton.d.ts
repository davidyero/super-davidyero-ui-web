import { ButtonHTMLAttributes, ReactNode, ReactElement } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'neutral' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';
interface SuperButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Spinner interno, bloquea el clic y evita el doble envío hasta que resuelve. */
    loading?: boolean;
    fullWidth?: boolean;
    /** Nombre de icono (registro del provider o id de Iconify). */
    leftIcon?: string;
    rightIcon?: string;
    /** Solo icono: el texto accesible va en `aria-label`. */
    iconOnly?: boolean;
    /**
     * Convierte el botón en un enlace real (`<a>`), con el mismo aspecto.
     * Mantiene clic central, copiar enlace y abrir en pestaña nueva.
     */
    href?: string;
    /** Con `href`: abrir en pestaña nueva (por defecto sí si es externo). */
    external?: boolean;
    children?: ReactNode;
}

/**
 * Botón del design system. Las variantes visuales van por `variant`/`size`,
 * nunca con un componente nuevo. `loading` bloquea el clic y evita el doble envío.
 */
declare const SuperButton: ({ variant, size, loading, disabled, fullWidth, leftIcon, rightIcon, iconOnly, href, external, type, onClick, children, ...rest }: SuperButtonProps) => ReactElement;

export { type ButtonSize, type ButtonVariant, SuperButton, type SuperButtonProps };
