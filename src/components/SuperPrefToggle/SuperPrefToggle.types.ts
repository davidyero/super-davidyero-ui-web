/*
 * Componente ÚNICO del ecosistema para cambiar idioma y tema (web y mobile). No crear
 * alternativas: usar siempre este. SuperPrefToggle es la base de un botón;
 * SuperLocaleThemeSwitch es el par listo para usar. Versión móvil: `SuperLocaleThemeSwitch`
 * en cada app RN, misma API y medidas.
 */
import type { ReactNode } from 'react';

export type SuperPrefToggleVariant = 'surface' | 'soft';

/** `sun`: icono naranja (tema claro). `night`: fondo de noche y luna amarilla (tema oscuro). */
export type SuperPrefToggleTone = 'sun' | 'night';

export interface SuperPrefToggleProps {
  /** Dibujo del estado ACTUAL (bandera del idioma, sol o luna), de 22 px. */
  glyph: ReactNode;
  /**
   * Identidad del estado actual (`'es'`, `'dark'`…). Al cambiar, el glifo se monta de nuevo
   * y anima la entrada (gira y aparece).
   */
  glyphKey: string;
  /** Qué hace el clic ("Cambiar a English"): el botón puede no tener texto visible. */
  ariaLabel: string;
  /** Texto visible junto al glifo (Ajustes); sin él, botón redondo de 44 px. */
  label?: string;
  /** soft = gris (sobre hojas y tarjetas, por defecto); surface = superficie con sombra. */
  variant?: SuperPrefToggleVariant;
  tone?: SuperPrefToggleTone;
  onClick: () => void;
  className?: string;
}
