/*
 * Componente ÚNICO del ecosistema para cambiar idioma y tema (web y mobile). No crear
 * alternativas: usar siempre este. Versión móvil: `SuperLocaleThemeSwitch` en cada app RN,
 * misma API y medidas (botón redondo de 44 px, glifo de 22 px, mismos colores de sol y noche).
 */
import type { ReactElement } from 'react';
import { useSuperTheme } from '../../theme/SuperThemeContext';
import { SuperFlag } from '../SuperFlag/SuperFlag';
import { PREF_COLORS, PREF_GLYPH_SIZE, SuperPrefToggle } from '../SuperPrefToggle/SuperPrefToggle';
import { SuperSegmented } from '../SuperSegmented/SuperSegmented';
import { ModeGlyph } from './SuperLocaleThemeSwitch.glyphs';
import { Row } from './SuperLocaleThemeSwitch.styles';
import type {
  SuperColorMode,
  SuperLocale,
  SuperLocaleThemeSwitchProps,
} from './SuperLocaleThemeSwitch.types';

const FLAG = { es: 'co', en: 'us' } as const satisfies Record<SuperLocale, 'co' | 'us'>;
/** Glifo de las píldoras: el de la app RN (bandera 22/28 px, sol y luna 20/24 px). */
const SEGMENT_FLAG = { sm: 22, md: 28 } as const;
const SEGMENT_MODE = { sm: 20, md: 24 } as const;

type SegmentedProps = Pick<
  SuperLocaleThemeSwitchProps,
  'locale' | 'onLocaleChange' | 'mode' | 'onModeChange' | 'labels' | 'align' | 'className'
> & { size: 'sm' | 'md' };

/** Las dos píldoras: banderas y sol/luna con las dos opciones a la vista. */
const Segmented = ({
  locale,
  onLocaleChange,
  mode,
  onModeChange,
  labels,
  align = 'end',
  size,
  className,
}: SegmentedProps): ReactElement => {
  const { mode: themeMode } = useSuperTheme();
  return (
    <Row $align={align} className={className}>
      <SuperSegmented<SuperLocale>
        variant="icon"
        size={size}
        ariaLabel={labels.language ?? `${labels.es} / ${labels.en}`}
        value={locale}
        onChange={(next) => next !== locale && onLocaleChange(next)}
        options={(['es', 'en'] as const).map((l) => ({
          value: l,
          label: labels[l],
          icon: <SuperFlag country={FLAG[l]} size={SEGMENT_FLAG[size]} />,
        }))}
      />
      <SuperSegmented<SuperColorMode>
        variant="icon"
        size={size}
        ariaLabel={labels.theme ?? `${labels.light} / ${labels.dark}`}
        value={mode}
        onChange={(next) => next !== mode && onModeChange(next)}
        options={(['light', 'dark'] as const).map((m) => ({
          value: m,
          label: labels[m],
          icon: (
            <ModeGlyph
              mode={m}
              size={SEGMENT_MODE[size]}
              color={m === 'light' ? PREF_COLORS.sun[themeMode] : PREF_COLORS.moon}
            />
          ),
        }))}
      />
    </Row>
  );
};

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
  look = 'toggle',
  size = 'md',
  className,
}: SuperLocaleThemeSwitchProps): ReactElement => {
  if (look === 'segmented') {
    return (
      <Segmented
        locale={locale}
        onLocaleChange={onLocaleChange}
        mode={mode}
        onModeChange={onModeChange}
        labels={labels}
        align={align}
        size={size}
        className={className}
      />
    );
  }
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
