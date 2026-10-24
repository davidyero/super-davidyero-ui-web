import { useId, type ReactElement } from 'react';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Box, HiddenInput, Texts, Wrap } from './SuperCheckbox.styles';
import type { SuperCheckboxProps } from './SuperCheckbox.types';

const CheckMark = (): ReactElement => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden focusable="false">
    <path
      d="M2.5 6.2 5 8.6l4.5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Casilla de verificación con label, ayuda y error. */
export const SuperCheckbox = ({
  checked,
  onChange,
  label,
  hint,
  error,
  disabled = false,
  id,
  ariaLabel,
  className,
}: SuperCheckboxProps): ReactElement => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <Wrap $disabled={disabled} htmlFor={inputId} className={className}>
      <HiddenInput
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-label={label ? undefined : ariaLabel}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.checked)}
      />
      <Box $checked={checked} $invalid={Boolean(error)} aria-hidden>
        {checked ? <CheckMark /> : null}
      </Box>
      {label || hint || error ? (
        <Texts>
          {label ? (
            <SuperTypography variant="body" color="text" as="span">
              {label}
            </SuperTypography>
          ) : null}
          {error ? (
            <SuperTypography variant="caption" color="danger" as="span" id={`${inputId}-error`}>
              {error}
            </SuperTypography>
          ) : hint ? (
            <SuperTypography variant="caption" as="span" id={`${inputId}-hint`}>
              {hint}
            </SuperTypography>
          ) : null}
        </Texts>
      ) : null}
    </Wrap>
  );
};

export type { SuperCheckboxProps } from './SuperCheckbox.types';
