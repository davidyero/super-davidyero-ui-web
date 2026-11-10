import type { ReactElement } from 'react';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { BadgeRoot, Dot, Label, Remove } from './SuperBadge.styles';
import type { BadgeTone, SuperBadgeProps, SuperPlan } from './SuperBadge.types';

/** Icono y tono de cada plan: de más neutro (free) a más marcado (superthanos). */
export const PLAN_BADGE: Readonly<Record<SuperPlan, { icon: string; tone: BadgeTone }>> = {
  free: { icon: 'plan-free', tone: 'neutral' },
  lite: { icon: 'plan-lite', tone: 'success' },
  pro: { icon: 'plan-pro', tone: 'info' },
  thanos: { icon: 'plan-thanos', tone: 'primary' },
  superthanos: { icon: 'plan-superthanos', tone: 'warning' },
};

/** Etiqueta/pill. El tono va por `tone`; el texto nunca depende solo del color. */
export const SuperBadge = ({
  plan,
  tone = plan ? PLAN_BADGE[plan].tone : 'neutral',
  size = 'md',
  icon = plan ? PLAN_BADGE[plan].icon : undefined,
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

export type { SuperBadgeProps, BadgeTone, BadgeSize, SuperPlan } from './SuperBadge.types';
