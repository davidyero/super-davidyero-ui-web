import { useId, forwardRef, type ReactElement } from 'react';
import { describedBy, FieldLabel, FieldMessage, FieldRoot } from '../../styles/field';
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
            aria-describedby={describedBy(areaId, error, hint, rest['aria-describedby'])}
          />
        </Box>
        <Footer>
          <FieldMessage id={areaId} error={error} hint={hint} />
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
