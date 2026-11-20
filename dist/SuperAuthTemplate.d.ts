import { ReactElement } from 'react';
import { S as SuperAuthTemplateProps } from './SuperAuthTemplate.types-BHFGN7yT.js';
export { a as SuperAuthHighlight, b as SuperAuthScreenDirection } from './SuperAuthTemplate.types-BHFGN7yT.js';

/**
 * Plantilla de login y registro: marca con su frase, el formulario sobre vidrio
 * y un fondo de rejilla con halos en los colores de la app. En móvil va todo en
 * una columna; desde `lg`, la marca a la izquierda y el formulario a la derecha.
 * Con `screenKey`, el cambio de pantalla desliza la tarjeta completa.
 */
declare const SuperAuthTemplate: ({ brand, tagline, hint, highlights, topActions, backdrop, footer, children, screenKey, screenDirection, className, }: SuperAuthTemplateProps) => ReactElement;

export { SuperAuthTemplate, SuperAuthTemplateProps };
