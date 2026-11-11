/*
 * Componente ÚNICO del ecosistema para cambiar idioma y tema (web y mobile). No crear
 * alternativas: usar siempre este. Para el par idioma + tema usa SuperLocaleThemeSwitch;
 * SuperPrefToggle es su botón base. Versión móvil: `SuperLocaleThemeSwitch` en cada app
 * RN, misma API y medidas.
 */
import type { ReactElement } from 'react';
import { useSuperTheme } from '../../theme/SuperThemeContext';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Button, Glyph } from './SuperPrefToggle.styles';
import type { SuperPrefToggleProps } from './SuperPrefToggle.types';

/** Preferencia de dos estados en un clic: muestra el actual y cambia al otro. */
export const SuperPrefToggle = ({
  glyph,
  glyphKey,
  ariaLabel,
  label,
  variant = 'soft',
  tone,
  onClick,
  className,
}: SuperPrefToggleProps): ReactElement => {
  const { mode } = useSuperTheme();
  return (
    <Button
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={onClick}
      $variant={variant}
      $withLabel={Boolean(label)}
      $tone={tone}
      className={className}
    >
      {/* key: el glifo se monta de nuevo al cambiar y anima la entrada. */}
      <Glyph key={glyphKey} aria-hidden $tone={tone} $mode={mode}>
        {glyph}
      </Glyph>
      {label ? (
        <SuperTypography variant="body" weight="semibold" color="inherit" as="span">
          {label}
        </SuperTypography>
      ) : null}
    </Button>
  );
};

export { PREF_COLORS, PREF_GLYPH_SIZE } from './SuperPrefToggle.styles';
export type {
  SuperPrefToggleProps,
  SuperPrefToggleTone,
  SuperPrefToggleVariant,
} from './SuperPrefToggle.types';
