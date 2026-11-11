/*
 * Componente ÚNICO del ecosistema para cambiar idioma y tema (web y mobile). No crear
 * alternativas: usar siempre este. Versión móvil: `SuperLocaleThemeSwitch` en cada app RN,
 * misma API y medidas.
 */
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { space, transition } from '../../styles/scale';
import type { SuperThemeMode } from '../../theme/tokens';
import { v } from '../../theme/vars';
import type { SuperPrefToggleTone, SuperPrefToggleVariant } from './SuperPrefToggle.types';

/** Botón táctil: 44 px, el mismo en todas las apps (y en mobile). */
export const PREF_TOGGLE_SIZE = '44px';
export const PREF_GLYPH_SIZE = 22;

/*
 * Colores fijos del sol y la noche: son los que alinean el selector en todas las apps,
 * por eso no salen de los tokens del tema (referencia: Gazella).
 */
export const PREF_COLORS = {
  sun: { light: '#f28c18', dark: '#ffa53a' },
  night: '#2d3070',
  moon: '#ffd36b',
  onNight: '#ffffff',
} as const;

export const Button = styled.button<{
  $variant: SuperPrefToggleVariant;
  $withLabel: boolean;
  $tone?: SuperPrefToggleTone;
}>(({ $variant, $withLabel, $tone }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space.sm,
  flexShrink: 0,
  minWidth: PREF_TOGGLE_SIZE,
  height: PREF_TOGGLE_SIZE,
  padding: $withLabel ? `0 ${space.lg} 0 ${space.md}` : 0,
  border: 0,
  borderRadius: v.radius.pill,
  background:
    $tone === 'night' ? PREF_COLORS.night : $variant === 'soft' ? v.surfaceSunken : v.surface,
  color: $tone === 'night' ? PREF_COLORS.onNight : v.text,
  boxShadow: $variant === 'surface' ? v.shadow.md : 'none',
  font: 'inherit',
  cursor: 'pointer',
  transition: `transform ${transition}`,
  '&:hover': { transform: 'translateY(-1px)' },
  '&:active': { transform: 'scale(0.94)' },
  '&:focus-visible': { outline: `2px solid ${v.focusRing}`, outlineOffset: '2px' },
}));

const swap = keyframes({
  from: { opacity: 0, transform: 'rotate(-90deg) scale(0.6)' },
});

/** El glifo gira y aparece al cambiar de estado (se apaga con "reducir movimiento"). */
export const Glyph = styled.span<{ $tone?: SuperPrefToggleTone; $mode: SuperThemeMode }>(
  ({ $tone, $mode }) => ({
    display: 'inline-flex',
    color:
      $tone === 'sun' ? PREF_COLORS.sun[$mode] : $tone === 'night' ? PREF_COLORS.moon : 'inherit',
    animation: `${swap} 300ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  }),
);
