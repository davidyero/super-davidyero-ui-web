import type { ReactElement } from 'react';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperSkeleton } from '../SuperSkeleton/SuperSkeleton';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { BarTooltip, Fill, List, Name, Row, RowHead, Track } from './SuperBarChart.styles';
import type { SuperBarChartProps } from './SuperBarChart.types';

const SKELETON_WIDTHS = ['92%', '74%', '58%', '41%', '27%', '18%'];

/**
 * Barras horizontales con los colores del tema. Sin librería de gráficas: cada barra es
 * su fila (nombre y valor arriba, barra debajo), así cabe igual en un móvil que en
 * escritorio. La más alta ocupa todo el ancho; el tooltip da el detalle.
 */
export const SuperBarChart = ({
  items,
  ariaLabel,
  formatValue = String,
  tooltip,
  tone = 'primary',
  maxHeight,
  loading = false,
  loadingRows = 5,
  className,
}: SuperBarChartProps): ReactElement => {
  if (loading) {
    return (
      <List aria-label={ariaLabel} aria-busy className={className}>
        {Array.from({ length: loadingRows }, (_, i) => (
          <Row key={i}>
            <RowHead>
              <SuperSkeleton variant="text" width="40%" />
              <SuperSkeleton variant="text" width="12%" />
            </RowHead>
            <SuperSkeleton variant="block" height="10px" width={SKELETON_WIDTHS[i % 6]} />
          </Row>
        ))}
      </List>
    );
  }

  const max = Math.max(0, ...items.map((item) => item.value));
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <List role="list" aria-label={ariaLabel} $maxHeight={maxHeight} className={className}>
      {items.map((item) => {
        const pct = max > 0 ? (item.value / max) * 100 : 0;
        const share = total > 0 ? item.value / total : 0;
        const hint = tooltip ? tooltip(item, share) : formatValue(item.value);
        return (
          <Row key={item.id} role="listitem">
            <RowHead>
              <Name>
                {item.icon ? <SuperIcon name={item.icon} size={18} /> : null}
                <SuperTypography variant="bodySmall" color="textBody" truncate>
                  {item.label}
                </SuperTypography>
              </Name>
              <SuperTypography variant="bodySmall" color="text" weight="semibold" mono>
                {formatValue(item.value)}
              </SuperTypography>
            </RowHead>
            <BarTooltip label={hint}>
              <Track tabIndex={0} role="img" aria-label={`${item.label}: ${hint}`}>
                <Fill $tone={tone} $pct={pct} data-sd-bar-fill />
              </Track>
            </BarTooltip>
          </Row>
        );
      })}
    </List>
  );
};

export type { SuperBarChartProps, SuperBarChartItem, BarChartTone } from './SuperBarChart.types';
