import { ReactElement } from 'react';

type IconColor = 'inherit' | 'text' | 'textBody' | 'textMuted' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
interface SuperIconProps {
    /**
     * Nombre semántico del registro (`icons` del provider, p. ej. `settings`) o
     * un id de Iconify directo (`solar:home-2-broken`).
     */
    name: string;
    size?: number;
    color?: IconColor;
    spin?: boolean;
    /** Si se pasa, el icono se anuncia a lectores de pantalla; si no, se oculta. */
    label?: string;
    className?: string;
}

/** Icono por nombre semántico. Todo icono de la app pasa por aquí. */
declare const SuperIcon: ({ name, size, color, spin, label, className, }: SuperIconProps) => ReactElement;

export { type IconColor, SuperIcon, type SuperIconProps };
