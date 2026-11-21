import type { ReactNode } from 'react';
import type { SuperAuthTemplateProps } from '../SuperAuthTemplate/SuperAuthTemplate.types';
import type { SuperLocale } from '../SuperLocaleThemeSwitch/SuperLocaleThemeSwitch.types';

/**
 * Textos del login. Por defecto salen de `SUPER_LOGIN_TEXTS` según `locale`, iguales en
 * todas las webs; la app solo pasa los que quiera cambiar.
 */
export interface SuperLoginLabels {
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
export interface SuperLoginProps extends Omit<
  SuperAuthTemplateProps,
  'children' | 'footer' | 'screenKey' | 'screenDirection'
> {
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
