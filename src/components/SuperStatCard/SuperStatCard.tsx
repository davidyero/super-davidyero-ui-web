import type { ReactElement } from 'react';
import { SuperBadge } from '../SuperBadge/SuperBadge';
import type { BadgeTone } from '../SuperBadge/SuperBadge.types';
import { SuperCard } from '../SuperCard/SuperCard';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperSkeleton } from '../SuperSkeleton/SuperSkeleton';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { DeltaRow, IconCircle, Top, Value } from './SuperStatCard.styles';
import type { StatTrend, SuperStatCardProps } from './SuperStatCard.types';

const TREND_TONE: Record<StatTrend, BadgeTone> = {
  up: 'success',
  down: 'danger',
  neutral: 'neutral',
};

const TREND_ICON: Record<StatTrend, string | undefined> = {
  up: 'trendUp',
  down: 'trendDown',
  neutral: undefined,
};

/** KPI: etiqueta, cifra y variación. Variantes por `size`, nunca una card nueva. */
export const SuperStatCard = ({
  label,
  value,
  icon,
  delta,
  trend = 'neutral',
  deltaLabel,
  size = 'md',
  loading = false,
  className,
}: SuperStatCardProps): ReactElement => (
  <SuperCard padding={size === 'md' ? 'md' : 'sm'} className={className} aria-busy={loading}>
    <Top>
      {loading ? (
        <SuperSkeleton variant="text" width="60%" />
      ) : (
        <SuperTypography variant="label" color="textMuted" truncate>
          {label}
        </SuperTypography>
      )}
      {icon ? (
        <IconCircle aria-hidden>
          <SuperIcon name={icon} size={18} />
        </IconCircle>
      ) : null}
    </Top>
    <Value $size={size}>
      {loading ? (
        <SuperSkeleton variant="block" width="50%" height={size === 'md' ? '38px' : '29px'} />
      ) : (
        <SuperTypography variant={size === 'md' ? 'display' : 'h1'} color="text" truncate>
          {value}
        </SuperTypography>
      )}
    </Value>
    {loading ? (
      <DeltaRow>
        <SuperSkeleton variant="text" width="70%" />
      </DeltaRow>
    ) : delta ? (
      <DeltaRow>
        <SuperBadge tone={TREND_TONE[trend]} icon={TREND_ICON[trend]} size="sm" mono>
          {delta}
        </SuperBadge>
        {deltaLabel ? (
          <SuperTypography variant="caption" color="textMuted">
            {deltaLabel}
          </SuperTypography>
        ) : null}
      </DeltaRow>
    ) : null}
  </SuperCard>
);

export type { SuperStatCardProps, StatTrend, StatCardSize } from './SuperStatCard.types';
