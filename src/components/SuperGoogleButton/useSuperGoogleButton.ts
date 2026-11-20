import { useEffect, useRef, useState, type RefObject } from 'react';
import { useSuperTheme } from '../../theme/SuperThemeContext';

const SCRIPT = 'https://accounts.google.com/gsi/client';
/** Google pinta el botón entre 200 y 400 px de ancho. */
const MIN_WIDTH = 200;
const MAX_WIDTH = 400;

/** Ancho del hueco en px, al día cuando cambia (columna que se estrecha, giro). */
const useSlotWidth = (slot: RefObject<HTMLDivElement | null>, active: boolean): number => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = slot.current;
    if (!active || !node) return undefined;
    const read = (): void => setWidth(Math.round(node.clientWidth));
    read();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(read);
    observer.observe(node);
    return () => observer.disconnect();
  }, [slot, active]);
  return width;
};
let loading: Promise<void> | null = null;

const loadScript = (): Promise<void> => {
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error('gsi'));
    };
    document.head.append(script);
  });
  return loading;
};

/** Pinta el botón oficial de Google (Identity Services) y entrega el ID token. */
export const useSuperGoogleButton = (
  clientId: string | undefined,
  locale: string,
  onCredential: (idToken: string) => void,
) => {
  const slot = useRef<HTMLDivElement>(null);
  const { mode } = useSuperTheme();
  const slotWidth = useSlotWidth(slot, Boolean(clientId));
  const callback = useRef(onCredential);
  useEffect(() => {
    callback.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        const google = window.google;
        const node = slot.current;
        if (cancelled || !google || !node) return;
        google.accounts.id.initialize({
          client_id: clientId,
          ux_mode: 'popup',
          callback: (response) => {
            if (response.credential) callback.current(response.credential);
          },
        });
        node.replaceChildren();
        google.accounts.id.renderButton(node, {
          theme: mode === 'dark' ? 'filled_black' : 'outline',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          // El mismo ancho que el formulario: el botón no sobresale de los campos.
          width: Math.max(MIN_WIDTH, Math.min(slotWidth || node.clientWidth || 360, MAX_WIDTH)),
          locale,
        });
      })
      // Sin red o con el script bloqueado, el botón no aparece y queda el login normal.
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [clientId, locale, mode, slotWidth]);

  return { slot, available: Boolean(clientId) };
};
