import { useEffect, useRef } from 'react';
import { useSuperTheme } from '../../theme/SuperThemeContext';

const SCRIPT = 'https://accounts.google.com/gsi/client';
/** Google no pinta el botón por encima de 400 px. */
const MAX_WIDTH = 400;
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
          width: Math.min(node.clientWidth || 360, MAX_WIDTH),
          locale,
        });
      })
      // Sin red o con el script bloqueado, el botón no aparece y queda el login normal.
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [clientId, locale, mode]);

  return { slot, available: Boolean(clientId) };
};
