export interface SuperDropdownOption<TValue extends string = string> {
  value: TValue;
  label: string;
  disabled?: boolean;
}

export interface SuperDropdownProps<TValue extends string = string> {
  value: TValue | '';
  onChange: (value: TValue) => void;
  options: ReadonlyArray<SuperDropdownOption<TValue>>;
  label?: string;
  /** Opción vacía inicial (no seleccionable una vez elegido algo). */
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  /** Texto accesible si no hay `label` visible (p. ej. el selector de idioma del login). */
  ariaLabel?: string;
  className?: string;
}
