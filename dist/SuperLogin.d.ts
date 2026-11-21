import { ReactNode, ReactElement } from 'react';
import { SuperAuthTemplateProps } from './SuperAuthTemplate.js';
import { SuperLocale } from './SuperLocaleThemeSwitch.js';
import './SuperPrefToggle.types-BtDC1Jro.js';

/**
 * Textos del login. Por defecto salen de `SUPER_LOGIN_TEXTS` según `locale`, iguales en
 * todas las webs; la app solo pasa los que quiera cambiar.
 */
interface SuperLoginLabels {
    /** Titular de la tarjeta («Bienvenido de vuelta»). */
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
    /** Idioma de los textos por defecto. Por defecto, español. */
    locale?: SuperLocale;
    /** Opcional: por defecto, los textos comunes en el idioma de `locale`. */
    labels?: Partial<SuperLoginLabels>;
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
 * Textos por defecto del login, iguales en las webs de uso propio. Se cambian aquí, en un
 * solo sitio. Una app solo pasa `labels` si de verdad necesita otro texto.
 */
declare const SUPER_LOGIN_TEXTS: {
    readonly es: {
        readonly title: "Bienvenido de vuelta";
        readonly subtitle: "La misma contraseña de todas tus webs.";
        readonly password: "Contraseña";
        readonly submit: "Entrar";
    };
    readonly en: {
        readonly title: "Welcome back";
        readonly subtitle: "The same password for all your sites.";
        readonly password: "Password";
        readonly submit: "Sign in";
    };
};

/**
 * Login de las webs de uso propio: la misma pantalla en todas, solo con contraseña.
 * Cada web pone su marca, su frase, sus chips, el selector de idioma y tema
 * (`topActions`, con `SuperLocaleThemeSwitch`) y su versión; el aspecto sale de sus tokens.
 * La petición, la sesión y los toasts los lleva la app.
 */
declare const SuperLogin: ({ locale, labels: custom, onSubmit, loading, error, onPasswordChange, version, credit, account, extra, ...template }: SuperLoginProps) => ReactElement;

export { SUPER_LOGIN_TEXTS, SuperLogin };
export type { SuperLoginLabels, SuperLoginProps };
