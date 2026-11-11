import { Global } from '@emotion/react';
import { Toaster, toast as ding } from '@yusufceng1z/ding-react';
import { type ReactElement, useEffect } from 'react';
import { type ToastItem, type ToastTone, toast } from '../../stores/toastStore';
import { useSuperTheme } from '../../theme/SuperThemeContext';
import { dingTheme } from './SuperToast.styles';
import type { SuperToastProps } from './SuperToast.types';

const DING_TYPE: Record<ToastTone, 'success' | 'error' | 'warning' | 'info'> = {
  success: 'success',
  danger: 'error',
  warning: 'warning',
  info: 'info',
};

/** Pasa un toast del store a Ding: con título, el mensaje va como segunda línea. */
const forward = (item: ToastItem): string =>
  ding[DING_TYPE[item.tone]](item.title ?? item.message, {
    ...(item.title ? { description: item.message } : {}),
    duration: item.durationMs,
    ...(item.action
      ? {
          action: {
            label: item.action.label,
            onClick: () => {
              item.action?.onClick();
              toast.dismiss(item.id);
            },
          },
        }
      : {}),
  });

/**
 * Donde aparecen los toasts que lanza `toast.success()/error()…`. Se monta una sola
 * vez en la raíz; los errores de la app llegan aquí ya traducidos.
 *
 * Por dentro usa Ding (física de muelle, un solo toast que se transforma en vez de
 * apilarse). La API pública sigue siendo el store `@davidyero/ui-web/toast`: las apps
 * no cambian nada. Tema, colores y textos salen de `SuperThemeProvider`.
 */
export const SuperToast = ({ position = 'top-right' }: SuperToastProps): ReactElement => {
  const { mode, labels } = useSuperTheme();

  useEffect(() => {
    // id del store → id de Ding, para cerrar en Ding lo que se cierra en el store.
    const shown = new Map<string, string>();
    const sync = (): void => {
      const items = toast.getAll();
      for (const item of items) if (!shown.has(item.id)) shown.set(item.id, forward(item));
      const alive = new Set(items.map((i) => i.id));
      for (const [id, dingId] of shown)
        if (!alive.has(id)) {
          ding.dismiss(dingId);
          shown.delete(id);
        }
    };
    sync();
    return toast.subscribe(sync);
  }, []);

  return (
    <>
      <Global styles={dingTheme} />
      <Toaster
        position={position}
        theme={mode}
        labels={{
          dismiss: labels.dismiss,
          ...(labels.notifications ? { region: labels.notifications } : {}),
        }}
      />
    </>
  );
};

export type { SuperToastProps } from './SuperToast.types';
