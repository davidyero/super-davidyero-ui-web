import { useId, type ReactElement } from 'react';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { HiddenInput, Texts, Thumb, Track, Wrap } from './SuperSwitch.styles';
import type { SuperSwitchProps } from './SuperSwitch.types';

/** Interruptor on/off (`role="switch"`). */
export const SuperSwitch = ({
  checked,
  onChange,
  label,
  hint,
  disabled = false,
  id,
  ariaLabel,
  className,
}: SuperSwitchProps): ReactElement => {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <Wrap $disabled={disabled} htmlFor={inputId} className={className}>
      <HiddenInput
        id={inputId}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        aria-checked={checked}
        aria-label={label ? undefined : ariaLabel}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        onChange={(event) => onChange(event.target.checked)}
      />
      <Track $checked={checked} aria-hidden>
        <Thumb $checked={checked} />
      </Track>
      {label || hint ? (
        <Texts>
          {label ? (
            <SuperTypography variant="body" color="text" as="span">
              {label}
            </SuperTypography>
          ) : null}
          {hint ? (
            <SuperTypography variant="caption" as="span" id={`${inputId}-hint`}>
              {hint}
            </SuperTypography>
          ) : null}
        </Texts>
      ) : null}
    </Wrap>
  );
};

export type { SuperSwitchProps } from './SuperSwitch.types';
