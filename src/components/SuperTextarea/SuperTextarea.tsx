import { useId, forwardRef, type ReactElement } from 'react';
import { FieldError, FieldHint, FieldLabel, FieldRoot } from '../../styles/field';
import { Area, Box, Count, Footer } from './SuperTextarea.styles';
import type { SuperTextareaProps } from './SuperTextarea.types';

/** Texto largo con contador opcional. */
export const SuperTextarea = forwardRef<HTMLTextAreaElement, SuperTextareaProps>(
  function SuperTextarea(
    {
      label,
      error,
      hint,
      fullWidth = false,
      showCount = false,
      maxCount,
      mono = false,
      id,
      disabled,
      className,
      value,
      maxLength,
      ...rest
    },
    ref,
  ): ReactElement {
    const autoId = useId();
    const areaId = id ?? autoId;
    const length = typeof value === 'string' ? value.length : 0;
    // `maxCount` informa sin cortar; `showCount` + `maxLength` usa el límite nativo.
    const countMax = maxCount ?? (showCount ? maxLength : undefined);
    const describedBy = error ? `${areaId}-error` : hint ? `${areaId}-hint` : undefined;

    return (
      <FieldRoot $fullWidth={fullWidth} className={className}>
        {label ? <FieldLabel htmlFor={areaId}>{label}</FieldLabel> : null}
        <Box $invalid={Boolean(error)} $disabled={Boolean(disabled)}>
          <Area
            {...rest}
            ref={ref}
            id={areaId}
            $mono={mono}
            value={value}
            maxLength={maxLength}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
          />
        </Box>
        <Footer>
          {error ? (
            <FieldError id={`${areaId}-error`} role="alert">
              {error}
            </FieldError>
          ) : hint ? (
            <FieldHint id={`${areaId}-hint`}>{hint}</FieldHint>
          ) : null}
          {countMax ? (
            <Count $over={maxCount ? length > maxCount : length >= countMax} aria-live="polite">
              {length}/{countMax}
            </Count>
          ) : null}
        </Footer>
      </FieldRoot>
    );
  },
);

export type { SuperTextareaProps } from './SuperTextarea.types';
