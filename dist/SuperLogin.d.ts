import { ReactNode, ReactElement } from 'react';
import { SuperAuthTemplateProps } from './SuperAuthTemplate.js';

/** Textos del login, desde el i18n de la app (EN/ES). La librería no trae textos. */
interface SuperLoginLabels {
    /** Titular de la tarjeta («Bienvenido de nuevo»). */
    title: string;
    /** Una línea bajo el titular. */
    subtitle?: string;
    /** Etiqueta del campo («Contraseña»). */
    password: string;
    /** Texto del botón («Entrar»). */
    submit: string;
}
/**
 * Login de las webs de uso propio (backoffice, dashboard, SuperOffice, SuperAppsInfo…):
 * la plantilla `SuperAuthTemplate` con un formulario de solo contraseña. Sin usuario, sin
 * registro y sin «olvidé mi contraseña»: hay una única cuenta.
 */
interface SuperLoginProps extends Omit<SuperAuthTemplateProps, 'children' | 'footer' | 'screenKey' | 'screenDirection'> {
    labels: SuperLoginLabels;
    /** Recibe la contraseña al enviar. El botón no deja enviar el campo vacío. */
    onSubmit: (password: string) => void;
    /** Mientras la petición está en curso: spinner en el botón y sin doble envío. */
    loading?: boolean;
    /** Error bajo el campo (p. ej. contraseña incorrecta). Se borra al volver a escribir. */
    error?: string;
    /** Al escribir, para que la app limpie su error. */
    onPasswordChange?: (password: string) => void;
    /** Versión de la web (`__APP_VERSION__`), al pie con una «v» delante. */
    version: string;
    /** Tras la versión, separado por « · » (p. ej. la firma «by @Davidyero 🐘»). */
    credit?: string;
    /**
     * Nombre de la cuenta para el gestor de contraseñas (Llavero, 1Password). Va en un campo
     * oculto de solo lectura: sin él, Safari no ofrece guardar la contraseña.
     */
    account?: string;
    /** Bajo el formulario, antes de la versión (p. ej. un aviso). */
    extra?: ReactNode;
}

/**
 * Login de las webs de uso propio: la misma pantalla en todas, solo con contraseña.
 * Cada web pone su marca, su frase, sus chips, el selector de idioma y tema
 * (`topActions`, con `SuperLocaleThemeSwitch`) y su versión; el aspecto sale de sus tokens.
 * La petición, la sesión y los toasts los lleva la app.
 */
declare const SuperLogin: ({ labels, onSubmit, loading, error, onPasswordChange, version, credit, account, extra, ...template }: SuperLoginProps) => ReactElement;

export { SuperLogin };
export type { SuperLoginLabels, SuperLoginProps };
