import type { ReactElement } from 'react';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Action, IconCircle, Root } from './SuperEmptyState.styles';
import type { SuperEmptyStateProps } from './SuperEmptyState.types';

/** Estado vacío: qué pasa aquí y qué puede hacer el usuario. */
export const SuperEmptyState = ({
  icon = 'empty',
  title,
  description,
  action,
  compact = false,
  className,
}: SuperEmptyStateProps): ReactElement => (
  <Root $compact={compact} className={className}>
    <IconCircle>
      <SuperIcon name={icon} size={24} />
    </IconCircle>
    <SuperTypography variant="h4" as="p">
      {title}
    </SuperTypography>
    {description ? (
      <SuperTypography variant="body" color="textMuted">
        {description}
      </SuperTypography>
    ) : null}
    {action ? <Action>{action}</Action> : null}
  </Root>
);

export type { SuperEmptyStateProps } from './SuperEmptyState.types';
