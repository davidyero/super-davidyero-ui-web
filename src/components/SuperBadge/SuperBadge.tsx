import type { ReactElement } from 'react';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { BadgeRoot, Dot, Label, Remove } from './SuperBadge.styles';
import type { BadgeTone, SuperBadgeProps, SuperPlan, SuperRole } from './SuperBadge.types';

/** Icono y tono de cada plan: de más neutro (free) a más marcado (superthanos). */
export const PLAN_BADGE: Readonly<Record<SuperPlan, { icon: string; tone: BadgeTone }>> = {
  free: { icon: 'plan-free', tone: 'neutral' },
  lite: { icon: 'plan-lite', tone: 'success' },
  pro: { icon: 'plan-pro', tone: 'info' },
  thanos: { icon: 'plan-thanos', tone: 'primary' },
  superthanos: { icon: 'plan-superthanos', tone: 'warning' },
};

/** Icono y tono de cada rol de equipo. */
export const ROLE_BADGE: Readonly<Record<SuperRole, { icon: string; tone: BadgeTone }>> = {
  superthanos: { icon: 'role-superthanos', tone: 'warning' },
  thanos: { icon: 'role-thanos', tone: 'primary' },
  owner: { icon: 'role-owner', tone: 'primary' },
  admin: { icon: 'role-admin', tone: 'info' },
  editor: { icon: 'role-editor', tone: 'success' },
  viewer: { icon: 'role-viewer', tone: 'neutral' },
  reception: { icon: 'role-reception', tone: 'success' },
  staff: { icon: 'role-staff', tone: 'info' },
  member: { icon: 'role-member', tone: 'neutral' },
  moderator: { icon: 'role-moderator', tone: 'warning' },
  test: { icon: 'role-test', tone: 'info' },
};

const preset = (plan?: SuperPlan, role?: SuperRole) =>
  plan ? PLAN_BADGE[plan] : role ? ROLE_BADGE[role] : undefined;

/** Etiqueta/pill. El tono va por `tone`; el texto nunca depende solo del color. */
export const SuperBadge = ({
  plan,
  role,
  tone = preset(plan, role)?.tone ?? 'neutral',
  size = 'md',
  icon = preset(plan, role)?.icon,
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

export type {
  SuperBadgeProps,
  BadgeTone,
  BadgeSize,
  SuperPlan,
  SuperRole,
} from './SuperBadge.types';
