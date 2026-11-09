/** Países con bandera dibujada. Se amplía añadiendo su dibujo en `SuperFlag.paths.tsx`. */
export type SuperFlagCountry = 'co' | 'us' | 'gb' | 'es' | 'mx' | 'br';

export interface SuperFlagProps {
  country: SuperFlagCountry;
  /** Diámetro en píxeles. */
  size?: number;
  /** Nombre accesible. Sin él la bandera es decorativa (`aria-hidden`). */
  label?: string;
  className?: string;
}
