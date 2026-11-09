export interface SuperSegmentedOption<TValue extends string = string> {
  value: TValue;
  label: string;
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
  /** Ocupa todo el ancho y reparte las opciones a partes iguales. */
  fullWidth?: boolean;
  className?: string;
}
