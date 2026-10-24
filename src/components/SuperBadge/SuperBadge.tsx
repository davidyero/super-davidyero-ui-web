import type { ReactElement } from 'react';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { BadgeRoot, Dot, Label } from './SuperBadge.styles';
import type { SuperBadgeProps } from './SuperBadge.types';

/** Etiqueta/pill. El tono va por `tone`; el texto nunca depende solo del color. */
export const SuperBadge = ({
  tone = 'neutral',
  size = 'md',
  icon,
  dot = false,
  mono = false,
  className,
  children,
}: SuperBadgeProps): ReactElement => (
  <BadgeRoot $tone={tone} $size={size} $mono={mono} className={className}>
    {dot ? <Dot $tone={tone} aria-hidden /> : null}
    {icon ? <SuperIcon name={icon} size={14} /> : null}
    <Label>{children}</Label>
  </BadgeRoot>
);

export type { SuperBadgeProps, BadgeTone, BadgeSize } from './SuperBadge.types';
