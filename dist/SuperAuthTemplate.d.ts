import { ReactNode, ReactElement } from 'react';

interface SuperAuthHighlight {
    /** Icono del registro o id de Iconify. */
    icon: string;
    label: string;
}
type SuperAuthScreenDirection = 'forward' | 'back';
interface SuperAuthTemplateProps {
    /** Monograma y nombre de la app. Arriba en móvil, en la columna de marca en escritorio. */
    brand: ReactNode;
    /** La frase de la app: el titular grande. */
    tagline: string;
    /** Una línea bajo el titular. */
    hint?: string;
    /** Lo que hay dentro, como chips que pasan solos (quietos con movimiento reducido). */
    highlights?: SuperAuthHighlight[];
    /** Arriba a la derecha: idioma y tema. */
    topActions?: ReactNode;
    /**
     * Decoración propia de la app sobre el fondo (rejilla y halos), p. ej. figuras
     * animadas de su temática. Va detrás de todo y no recibe clics.
     */
    backdrop?: ReactNode;
    /** Bajo el formulario: versión, enlaces legales. */
    footer?: ReactNode;
    /** El formulario. */
    children: ReactNode;
    /**
     * Identifica la pantalla del formulario (la ruta: login, registro…). Al cambiar,
     * la tarjeta entera sale deslizándose y entra la nueva por el lado contrario.
     * Para que la saliente conserve su contenido, `children` debe ser el elemento
     * de la ruta (p. ej. `useOutlet()`), no un `<Outlet />`.
     */
    screenKey?: string;
    /** `forward`: la tarjeta sale a la izquierda y entra la nueva por la derecha; `back`, al revés. */
    screenDirection?: SuperAuthScreenDirection;
    className?: string;
}

/**
 * Plantilla de login y registro: marca con su frase, el formulario sobre vidrio
 * y un fondo de rejilla con halos en los colores de la app. En móvil va todo en
 * una columna; desde `lg`, la marca a la izquierda y el formulario a la derecha.
 * Con `screenKey`, el cambio de pantalla desliza la tarjeta completa.
 */
declare const SuperAuthTemplate: ({ brand, tagline, hint, highlights, topActions, backdrop, footer, children, screenKey, screenDirection, className, }: SuperAuthTemplateProps) => ReactElement;

export { SuperAuthTemplate };
export type { SuperAuthHighlight, SuperAuthScreenDirection, SuperAuthTemplateProps };
