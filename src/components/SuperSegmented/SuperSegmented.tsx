import { useRef, type KeyboardEvent, type ReactElement } from 'react';
import { Option, Track } from './SuperSegmented.styles';
import type { SuperSegmentedProps } from './SuperSegmented.types';

/**
 * Selector segmentado en píldora para 2–4 opciones excluyentes. La activa va en
 * tinta. Flechas, Inicio y Fin mueven la selección (patrón ARIA de tabs).
 */
export const SuperSegmented = <TValue extends string = string>({
  options,
  value,
  onChange,
  ariaLabel,
  size = 'md',
  fullWidth = false,
  className,
}: SuperSegmentedProps<TValue>): ReactElement => {
  const refs = useRef(new Map<TValue, HTMLButtonElement>());
  const enabled = options.filter((option) => !option.disabled);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const index = enabled.findIndex((option) => option.value === value);
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % enabled.length,
      ArrowLeft: (index - 1 + enabled.length) % enabled.length,
      Home: 0,
      End: enabled.length - 1,
    };
    const target = enabled[keys[event.key] ?? -1];
    if (!target) return;
    event.preventDefault();
    onChange(target.value);
    refs.current.get(target.value)?.focus();
  };

  return (
    <Track
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      $fullWidth={fullWidth}
      className={className}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Option
            key={option.value}
            ref={(el) => {
              if (el) refs.current.set(option.value, el);
              else refs.current.delete(option.value);
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            disabled={option.disabled}
            $active={active}
            $size={size}
            $fullWidth={fullWidth}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Option>
        );
      })}
    </Track>
  );
};

export type { SuperSegmentedProps, SuperSegmentedOption } from './SuperSegmented.types';
