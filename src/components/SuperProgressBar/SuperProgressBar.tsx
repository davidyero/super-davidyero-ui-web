import type { ReactElement } from 'react';
import { Fill, Row, Track, Value } from './SuperProgressBar.styles';
import type { SuperProgressBarProps } from './SuperProgressBar.types';

/** Barra de progreso accesible (`role="progressbar"`). */
export const SuperProgressBar = ({
  value,
  max = 100,
  tone = 'primary',
  size = 'md',
  label,
  showValue = false,
  className,
}: SuperProgressBarProps): ReactElement => {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const pct = Math.round((clamped / safeMax) * 100);
  return (
    <Row className={className}>
      <Track
        $size={size}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
      >
        <Fill $pct={pct} $tone={tone} />
      </Track>
      {showValue ? <Value aria-hidden>{pct}%</Value> : null}
    </Row>
  );
};

export type { SuperProgressBarProps, ProgressTone } from './SuperProgressBar.types';
