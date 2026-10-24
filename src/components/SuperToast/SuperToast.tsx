import type { ReactElement } from 'react';
import { toast, useToasts } from '../../stores/toastStore';
import { useSuperLabels } from '../../theme/SuperThemeContext';
import { SuperButton } from '../SuperButton/SuperButton';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Dismiss, IconSlot, Item, Texts, TOAST_TONE, Viewport } from './SuperToast.styles';
import type { SuperToastProps } from './SuperToast.types';

/**
 * Donde aparecen los toasts que lanza `toast.success()/error()…`. Se monta una
 * sola vez en la raíz; los errores de la app llegan aquí ya traducidos.
 */
export const SuperToast = ({ position = 'top-right' }: SuperToastProps): ReactElement => {
  const items = useToasts();
  const labels = useSuperLabels();
  return (
    <Viewport $position={position} aria-live="polite" aria-relevant="additions">
      {items.map((item) => (
        <Item key={item.id} $tone={item.tone} role={item.tone === 'danger' ? 'alert' : 'status'}>
          <IconSlot $tone={item.tone}>
            <SuperIcon name={TOAST_TONE[item.tone].icon} size={20} />
          </IconSlot>
          <Texts>
            {item.title ? (
              <SuperTypography variant="label" as="p">
                {item.title}
              </SuperTypography>
            ) : null}
            <SuperTypography variant="body" color="textBody" as="p">
              {item.message}
            </SuperTypography>
            {item.action ? (
              <SuperButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  item.action?.onClick();
                  toast.dismiss(item.id);
                }}
              >
                {item.action.label}
              </SuperButton>
            ) : null}
          </Texts>
          <Dismiss type="button" aria-label={labels.dismiss} onClick={() => toast.dismiss(item.id)}>
            <SuperIcon name="close" size={18} />
          </Dismiss>
        </Item>
      ))}
    </Viewport>
  );
};

export type { SuperToastProps } from './SuperToast.types';
