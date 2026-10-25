import type { ReactElement } from 'react';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { BadgeRoot, Dot, Label, Remove } from './SuperBadge.styles';
import type { SuperBadgeProps } from './SuperBadge.types';

/** Etiqueta/pill. El tono va por `tone`; el texto nunca depende solo del color. */
export const SuperBadge = ({
  tone = 'neutral',
  size = 'md',
  icon,
  dot = false,
  mono = false,
  wrap = false,
  onRemove,
  removeLabel,
  className,
  children,
}: SuperBadgeProps): ReactElement => (
  <BadgeRoot $tone={tone} $size={size} $mono={mono} $wrap={wrap} className={className}>
    {dot ? <Dot $tone={tone} aria-hidden /> : null}
    {icon ? <SuperIcon name={icon} size={14} /> : null}
    <Label>{children}</Label>
    {onRemove ? (
      <Remove type="button" aria-label={removeLabel} onClick={onRemove}>
        <SuperIcon name="close" size={14} />
      </Remove>
    ) : null}
  </BadgeRoot>
);

export type { SuperBadgeProps, BadgeTone, BadgeSize } from './SuperBadge.types';
