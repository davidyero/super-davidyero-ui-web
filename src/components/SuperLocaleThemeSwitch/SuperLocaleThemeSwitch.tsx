/*
 * Componente ÚNICO del ecosistema para cambiar idioma y tema (web y mobile). No crear
 * alternativas: usar siempre este. Versión móvil: `SuperLocaleThemeSwitch` en cada app RN,
 * misma API y medidas (botón redondo de 44 px, glifo de 22 px, mismos colores de sol y noche).
 */
import type { ReactElement } from 'react';
import { SuperFlag } from '../SuperFlag/SuperFlag';
import { PREF_GLYPH_SIZE, SuperPrefToggle } from '../SuperPrefToggle/SuperPrefToggle';
import { ModeGlyph } from './SuperLocaleThemeSwitch.glyphs';
import { Row } from './SuperLocaleThemeSwitch.styles';
import type { SuperLocale, SuperLocaleThemeSwitchProps } from './SuperLocaleThemeSwitch.types';

const FLAG = { es: 'co', en: 'us' } as const satisfies Record<SuperLocale, 'co' | 'us'>;

/**
 * Idioma y tema en dos botones de un clic (login, registro, barra superior, menú, Ajustes).
 * No depende de ningún store: la app pasa el estado y aplica el cambio.
 */
export const SuperLocaleThemeSwitch = ({
  locale,
  onLocaleChange,
  mode,
  onModeChange,
  labels,
  variant = 'soft',
  align = 'end',
  showLabels = false,
  className,
}: SuperLocaleThemeSwitchProps): ReactElement => {
  const nextLocale: SuperLocale = locale === 'es' ? 'en' : 'es';
  const dark = mode === 'dark';
  return (
    <Row $align={align} className={className}>
      <SuperPrefToggle
        glyph={<SuperFlag country={FLAG[locale]} size={PREF_GLYPH_SIZE} />}
        glyphKey={locale}
        ariaLabel={nextLocale === 'en' ? labels.switchToEn : labels.switchToEs}
        label={showLabels ? labels[locale] : undefined}
        variant={variant}
        onClick={() => onLocaleChange(nextLocale)}
      />
      <SuperPrefToggle
        glyph={<ModeGlyph mode={mode} size={PREF_GLYPH_SIZE} />}
        glyphKey={mode}
        tone={dark ? 'night' : 'sun'}
        ariaLabel={dark ? labels.switchToLight : labels.switchToDark}
        label={showLabels ? labels[mode] : undefined}
        variant={variant}
        onClick={() => onModeChange(dark ? 'light' : 'dark')}
      />
    </Row>
  );
};

export type {
  SuperColorMode,
  SuperLocale,
  SuperLocaleThemeSwitchLabels,
  SuperLocaleThemeSwitchProps,
} from './SuperLocaleThemeSwitch.types';
