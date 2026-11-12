export interface SuperGoogleButtonProps {
  /** Client ID de OAuth de tipo Web de la app. Sin él, el botón no se pinta. */
  clientId: string | undefined;
  /** Recibe el ID token de Google (JWT) para mandarlo al backend (`POST /auth/google`). */
  onCredential: (idToken: string) => void;
  /** Idioma del texto del botón (lo pone Google): `es`, `en`… */
  locale: string;
  /** Atenuado y sin acción (p. ej. mientras se envía otro formulario). */
  disabled?: boolean;
  className?: string;
}

/** Lo mínimo de Google Identity Services que usamos. */
export interface GoogleIdentityServices {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: { credential?: string }) => void;
        ux_mode?: 'popup';
      }) => void;
      renderButton: (
        parent: HTMLElement,
        options: {
          theme: 'outline' | 'filled_black';
          size: 'large';
          shape: 'pill';
          text: 'continue_with';
          width: number;
          locale: string;
        },
      ) => void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleIdentityServices;
  }
}
