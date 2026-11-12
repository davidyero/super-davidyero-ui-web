import { ReactElement } from 'react';

interface SuperGoogleButtonProps {
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
interface GoogleIdentityServices {
    accounts: {
        id: {
            initialize: (options: {
                client_id: string;
                callback: (response: {
                    credential?: string;
                }) => void;
                ux_mode?: 'popup';
            }) => void;
            renderButton: (parent: HTMLElement, options: {
                theme: 'outline' | 'filled_black';
                size: 'large';
                shape: 'pill';
                text: 'continue_with';
                width: number;
                locale: string;
            }) => void;
        };
    };
}
declare global {
    interface Window {
        google?: GoogleIdentityServices;
    }
}

/**
 * "Continuar con Google": el botón oficial de Google Identity Services (su diseño
 * lo fija Google y sigue el tema claro/oscuro). Entrega el ID token por
 * `onCredential`. Sin `clientId` no se pinta.
 */
declare const SuperGoogleButton: ({ clientId, onCredential, locale, disabled, className, }: SuperGoogleButtonProps) => ReactElement | null;

export { SuperGoogleButton };
export type { SuperGoogleButtonProps };
