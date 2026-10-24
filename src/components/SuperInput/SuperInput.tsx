import type { ReactElement } from 'react';
import { FieldError, FieldHint, FieldLabel, FieldRoot } from '../../styles/field';
import { useSuperLabels } from '../../theme/SuperThemeContext';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { Box, Input, Toggle } from './SuperInput.styles';
import type { SuperInputProps } from './SuperInput.types';
import { useSuperInput } from './useSuperInput';

/**
 * Campo de texto. `type="password"` trae SIEMPRE el ojo de mostrar/ocultar
 * dentro del propio campo: nunca un input de contraseña sin ojo.
 */
export const SuperInput = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = false,
  id,
  type = 'text',
  disabled,
  className,
  ...rest
}: SuperInputProps): ReactElement => {
  const labels = useSuperLabels();
  const { inputId, isPassword, revealed, toggleReveal, effectiveType, describedBy } = useSuperInput(
    { id, type, error, hint },
  );

  return (
    <FieldRoot $fullWidth={fullWidth} className={className}>
      {label ? <FieldLabel htmlFor={inputId}>{label}</FieldLabel> : null}
      <Box $invalid={Boolean(error)} $size={size} $disabled={Boolean(disabled)}>
        {leftIcon ? <SuperIcon name={leftIcon} size={18} /> : null}
        <Input
          {...rest}
          id={inputId}
          type={effectiveType}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        {isPassword ? (
          <Toggle
            type="button"
            onClick={toggleReveal}
            aria-label={revealed ? labels.hidePassword : labels.showPassword}
            aria-pressed={revealed}
            aria-controls={inputId}
            disabled={disabled}
          >
            <SuperIcon name={revealed ? 'eyeOff' : 'eye'} size={18} />
          </Toggle>
        ) : rightIcon ? (
          <SuperIcon name={rightIcon} size={18} />
        ) : null}
      </Box>
      {error ? (
        <FieldError id={`${inputId}-error`} role="alert">
          {error}
        </FieldError>
      ) : hint ? (
        <FieldHint id={`${inputId}-hint`}>{hint}</FieldHint>
      ) : null}
    </FieldRoot>
  );
};

export type { SuperInputProps } from './SuperInput.types';
