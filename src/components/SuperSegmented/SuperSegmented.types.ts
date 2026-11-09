import type { ReactNode } from 'react';

export interface SuperSegmentedOption<TValue extends string = string> {
  value: TValue;
  /** Texto visible; en la variante `icon` es el nombre accesible y el tooltip. */
  label: string;
  /** Icono o bandera (`SuperFlag`). En la variante `icon` sustituye al texto. */
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SuperSegmentedProps<TValue extends string = string> {
  /** De 2 a 4 opciones cortas (Mensual/Anual, Todas/Reformer/Barrel, idioma, tema). */
  options: ReadonlyArray<SuperSegmentedOption<TValue>>;
  value: TValue;
  onChange: (value: TValue) => void;
  /** Nombre accesible del grupo. */
  ariaLabel: string;
  size?: 'sm' | 'md';
  /**
   * `default`: píldoras con texto y la activa en tinta.
   * `icon`: solo iconos redondos (banderas de idioma); la activa sobre un círculo de superficie.
   */
  variant?: 'default' | 'icon';
  /** Ocupa todo el ancho y reparte las opciones a partes iguales. */
  fullWidth?: boolean;
  className?: string;
}
