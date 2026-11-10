import type { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { describedBy, FieldLabel, FieldMessage, FieldRoot } from '../../styles/field';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import {
  Box,
  Check,
  Chevron,
  List,
  Option,
  OptionLabel,
  Trigger,
  Value,
} from './SuperDropdown.styles';
import type { SuperDropdownProps } from './SuperDropdown.types';
import { useSuperDropdown } from './useSuperDropdown';

/**
 * Selector propio (no el nativo): la misma apariencia en todos los navegadores y en el
 * tema de cada app. Teclado y lectores de pantalla siguen el patrón de WAI-ARIA para un
 * combobox de solo selección. Todo selector de la app pasa por aquí.
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
  // Las refs aparte: leer `d.*` durante el render no debe tocar una ref (react-hooks/refs).
  const { triggerRef, listRef, ...d } = useSuperDropdown({
    value,
    options,
    onChange,
    disabled,
    id,
  });
  const labelId = `${d.baseId}-label`;

  return (
    <FieldRoot $fullWidth={fullWidth} className={className}>
      {label ? (
        <FieldLabel id={labelId} htmlFor={d.baseId}>
          {label}
        </FieldLabel>
      ) : null}
      <Box $invalid={Boolean(error)} $size={size} $disabled={disabled}>
        <Trigger
          ref={triggerRef}
          id={d.baseId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={d.open}
          aria-controls={d.listId}
          aria-activedescendant={d.open && d.active >= 0 ? d.optionId(d.active) : undefined}
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : ariaLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(d.baseId, error, hint)}
          disabled={disabled}
          onClick={d.toggle}
          onKeyDown={d.onKeyDown}
          $placeholder={!d.selected}
        >
          <Value>{d.selected?.label ?? placeholder ?? ''}</Value>
        </Trigger>
        <Chevron $open={d.open}>
          <SuperIcon name="chevronDown" size={16} />
        </Chevron>
      </Box>
      {d.open && d.position
        ? createPortal(
            <List
              ref={listRef}
              id={d.listId}
              role="listbox"
              aria-labelledby={label ? labelId : undefined}
              aria-label={label ? undefined : ariaLabel}
              $up={d.position.up}
              style={{
                top: d.position.top,
                left: d.position.left,
                // Al menos el ancho del botón; más si una opción lo necesita, sin salirse de la
                // pantalla (ahí el texto baja de línea).
                minWidth: d.position.width,
                maxWidth: `calc(100vw - ${d.position.left + 8}px)`,
                maxHeight: d.position.maxHeight,
              }}
            >
              {options.map((option, index) => {
                const selected = option.value === value;
                return (
                  <Option
                    key={option.value}
                    id={d.optionId(index)}
                    data-index={index}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={option.disabled || undefined}
                    $active={index === d.active}
                    $selected={selected}
                    $disabled={Boolean(option.disabled)}
                    // mousedown: elige antes de que el botón pierda el foco.
                    onMouseDown={(event) => {
                      event.preventDefault();
                      d.choose(index);
                    }}
                    onMouseEnter={() => !option.disabled && d.setActive(index)}
                  >
                    <OptionLabel>{option.label}</OptionLabel>
                    {selected ? (
                      <Check>
                        <SuperIcon name="check" size={16} />
                      </Check>
                    ) : null}
                  </Option>
                );
              })}
            </List>,
            document.body,
          )
        : null}
      <FieldMessage id={d.baseId} error={error} hint={hint} />
    </FieldRoot>
  );
};

export type { SuperDropdownProps, SuperDropdownOption } from './SuperDropdown.types';
