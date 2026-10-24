import { useId, type ReactElement } from 'react';
import { FieldError, FieldHint, FieldLabel, FieldRoot } from '../../styles/field';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { Box, Chevron, Select } from './SuperDropdown.styles';
import type { SuperDropdownProps } from './SuperDropdown.types';

/**
 * Selector. Nativo a propósito: hereda teclado, accesibilidad y el picker del
 * sistema en móvil. Todo selector de la app pasa por aquí.
 */
export const SuperDropdown = <TValue extends string = string>({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  hint,
  disabled = false,
  fullWidth = false,
  size = 'md',
  id,
  ariaLabel,
  className,
}: SuperDropdownProps<TValue>): ReactElement => {
  const autoId = useId();
  const selectId = id ?? autoId;
  const describedBy = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined;

  const handleChange = (raw: string): void => {
    const match = options.find((o) => o.value === raw);
    if (match) onChange(match.value);
  };

  return (
    <FieldRoot $fullWidth={fullWidth} className={className}>
      {label ? <FieldLabel htmlFor={selectId}>{label}</FieldLabel> : null}
      <Box $invalid={Boolean(error)} $size={size} $disabled={disabled}>
        <Select
          id={selectId}
          value={value}
          disabled={disabled}
          aria-label={label ? undefined : ariaLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => handleChange(event.target.value)}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </Select>
        <Chevron>
          <SuperIcon name="chevronDown" size={16} />
        </Chevron>
      </Box>
      {error ? (
        <FieldError id={`${selectId}-error`} role="alert">
          {error}
        </FieldError>
      ) : hint ? (
        <FieldHint id={`${selectId}-hint`}>{hint}</FieldHint>
      ) : null}
    </FieldRoot>
  );
};

export type { SuperDropdownProps, SuperDropdownOption } from './SuperDropdown.types';
