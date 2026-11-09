import { ReactElement } from 'react';

/** Países con bandera dibujada. Se amplía añadiendo su dibujo en `SuperFlag.paths.tsx`. */
type SuperFlagCountry = 'co' | 'us' | 'gb' | 'es' | 'mx' | 'br';
interface SuperFlagProps {
    country: SuperFlagCountry;
    /** Diámetro en píxeles. */
    size?: number;
    /** Nombre accesible. Sin él la bandera es decorativa (`aria-hidden`). */
    label?: string;
    className?: string;
}

/**
 * Bandera redonda de un país, para selectores de idioma o de prefijo telefónico.
 * Decorativa salvo que reciba `label`.
 */
declare const SuperFlag: ({ country, size, label, className, }: SuperFlagProps) => ReactElement;

export { SuperFlag };
export type { SuperFlagCountry, SuperFlagProps };
