import type { SuperLocale } from '../SuperLocaleThemeSwitch/SuperLocaleThemeSwitch.types';
import type { SuperLoginLabels } from './SuperLogin.types';

/**
 * Textos por defecto del login, iguales en las webs de uso propio. Se cambian aquí, en un
 * solo sitio. Una app solo pasa `labels` si de verdad necesita otro texto.
 */
export const SUPER_LOGIN_TEXTS = {
  es: {
    title: 'Bienvenido de vuelta',
    subtitle: 'La misma contraseña de todas tus webs.',
    password: 'Contraseña',
    submit: 'Entrar',
  },
  en: {
    title: 'Welcome back',
    subtitle: 'The same password for all your sites.',
    password: 'Password',
    submit: 'Sign in',
  },
} as const satisfies Record<SuperLocale, Required<SuperLoginLabels>>;
