export interface SuperSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  hint?: string;
  disabled?: boolean;
  id?: string;
  /** Texto accesible si no hay `label` visible (p. ej. en el switch de tema del login). */
  ariaLabel?: string;
  className?: string;
}
