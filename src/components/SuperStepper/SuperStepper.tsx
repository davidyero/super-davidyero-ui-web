import type { ReactElement } from 'react';
import { Root, StepButton, Value } from './SuperStepper.styles';
import type { SuperStepperProps } from './SuperStepper.types';

/** Número de una regla con − / + y su valor en texto legible ("6 h antes", "Sin tope"). */
export const SuperStepper = ({
  value,
  onChange,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  formatValue = String,
  ariaLabel,
  decrementLabel,
  incrementLabel,
  disabled = false,
  className,
}: SuperStepperProps): ReactElement => {
  const clamp = (next: number): number => Math.min(max, Math.max(min, next));
  const text = formatValue(value);

  return (
    <Root role="group" aria-label={ariaLabel} className={className}>
      <StepButton
        type="button"
        aria-label={decrementLabel}
        disabled={disabled || value <= min}
        onClick={() => onChange(clamp(value - step))}
      >
        −
      </StepButton>
      <Value aria-live="polite">{text}</Value>
      <StepButton
        type="button"
        aria-label={incrementLabel}
        disabled={disabled || value >= max}
        onClick={() => onChange(clamp(value + step))}
      >
        +
      </StepButton>
    </Root>
  );
};

export type { SuperStepperProps } from './SuperStepper.types';
