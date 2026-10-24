export interface SuperCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  className?: string;
}
