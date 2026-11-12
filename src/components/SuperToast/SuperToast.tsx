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

/**
 * Pasa un toast del store a Ding: con título, el mensaje va como segunda línea.
 * Ding solo pinta su botón de cerrar en los toasts sin cierre automático, así que le
 * llega `duration: 0` y quien lo cierra a los 5 s (7,5 s los errores) es el store.
 */
const forward = (item: ToastItem): string =>
  ding[DING_TYPE[item.tone]](item.title ?? item.message, {
    ...(item.title ? { description: item.message } : {}),
    duration: 0,
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
    // Toast del store que Ding tiene en pantalla, para cerrarlo en los dos lados.
    let current: { id: string; dingId: string } | null = null;
    const forwarded = new Set<string>();
    const sync = (): void => {
      const items = toast.getAll();
      for (const item of items)
        if (!forwarded.has(item.id)) {
          forwarded.add(item.id);
          // Ding no apila: el nuevo se transforma en el que había. El anterior ya no se
          // ve y su temporizador no debe cerrar el nuevo.
          const prev = current;
          current = { id: item.id, dingId: forward(item) };
          if (prev) toast.dismiss(prev.id);
        }
      const alive = new Set(items.map((i) => i.id));
      for (const id of forwarded) if (!alive.has(id)) forwarded.delete(id);
      if (current && !alive.has(current.id)) {
        ding.dismiss(current.dingId);
        current = null;
      }
    };
    // Cerrado en Ding (botón ✕ o al arrastrarlo fuera) → se cierra también en el store.
    // Ding tiene como mucho un toast activo (y al transformarse conserva su id interno,
    // distinto del que devolvió), así que basta con ver si queda alguno abierto.
    const syncBack = (): void => {
      if (!current) return;
      const open = ding.getState().toasts.some((t) => t.phase === 'enter' || t.phase === 'open');
      if (!open) {
        const { id } = current;
        current = null;
        toast.dismiss(id);
      }
    };
    sync();
    const offStore = toast.subscribe(sync);
    const offDing = ding.subscribe(syncBack);
    return () => {
      offStore();
      offDing();
    };
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
