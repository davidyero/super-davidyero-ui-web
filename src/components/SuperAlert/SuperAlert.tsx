import type { ReactElement } from 'react';
import { useSuperLabels } from '../../theme/SuperThemeContext';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { ALERT_TONE, Body, Close, Root } from './SuperAlert.styles';
import type { SuperAlertProps } from './SuperAlert.types';

/** Aviso en línea. Fondo soft con su token de texto en claro y oscuro. */
export const SuperAlert = ({
  tone = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  action,
  className,
}: SuperAlertProps): ReactElement => {
  const labels = useSuperLabels();
  return (
    <Root $tone={tone} role={tone === 'danger' ? 'alert' : 'status'} className={className}>
      <SuperIcon name={ALERT_TONE[tone].icon} size={20} />
      <Body>
        {title ? (
          <SuperTypography variant="label" color="inherit" as="p">
            {title}
          </SuperTypography>
        ) : null}
        <SuperTypography variant="body" color="inherit" as="div">
          {children}
        </SuperTypography>
        {action}
      </Body>
      {dismissible ? (
        <Close type="button" aria-label={labels.dismiss} onClick={onDismiss}>
          <SuperIcon name="close" size={18} />
        </Close>
      ) : null}
    </Root>
  );
};

export type { SuperAlertProps, AlertTone } from './SuperAlert.types';
