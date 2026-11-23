import type { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { ms, reducedMotion, timing, transitionOf } from '../../styles/motion';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';

/** Anchos de la barra: completa y plegada (solo iconos). */
export const SIDEBAR_WIDTH = { expanded: '240px', collapsed: '64px' } as const;

export const Aside = styled.aside<{ $collapsed: boolean }>(({ $collapsed }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: space.lg,
  boxSizing: 'border-box',
  width: $collapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded,
  height: '100%',
  padding: $collapsed ? `${space.lg} ${space.sm}` : space.lg,
  background: v.surface,
  borderRight: `1px solid ${v.border}`,
  // El ancho es la única excepción a «solo transform y opacity» (movimiento.md §5).
  transition: transitionOf(['width', 'padding'], 'slow', 'inOut'),
  [reducedMotion]: { transition: 'none' },
}));

export const Header = styled.div<{ $collapsed: boolean }>(({ $collapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: $collapsed ? 'center' : 'flex-start',
  minHeight: '36px',
  minWidth: 0,
}));

/*
 * Plegada no hace scroll: un overflow distinto de visible recorta en los dos ejes, y el
 * tooltip con el nombre de cada entrada sale por la derecha de los 64 px de la barra.
 */
export const NavList = styled.div<{ $collapsed: boolean }>(({ $collapsed }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: space.xxs,
  flex: 1,
  minHeight: 0,
  overflowY: $collapsed ? 'visible' : 'auto',
}));

export const ItemWrap = styled.div({ display: 'flex', width: '100%' });

interface EntryState {
  $active: boolean;
  $collapsed: boolean;
}

const entryStyles = ({ $active, $collapsed }: EntryState): CSSObject => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: $collapsed ? 'center' : 'flex-start',
  gap: space.md,
  width: '100%',
  minHeight: '44px',
  boxSizing: 'border-box',
  padding: $collapsed ? 0 : `0 ${space.md}`,
  border: 'none',
  borderRadius: v.radius.md,
  background: $active ? v.primarySoft : 'transparent',
  color: $active ? v.primarySoftText : v.textBody,
  font: 'inherit',
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: `background ${transition}, color ${transition}`,
  '&:hover': {
    background: $active ? v.primarySoft : v.surfaceSunken,
    color: $active ? v.primarySoftText : v.text,
  },
  '&:focus-visible': focusVisible,
});

const ownProp = (prop: string): boolean => prop !== 'as' && !prop.startsWith('$');

export const EntryButton = styled('button', { shouldForwardProp: ownProp })<EntryState>(
  entryStyles,
);

/** Mismo aspecto como enlace: con `as` recibe el `LinkComponent` del provider. */
export const EntryLink = styled('a', { shouldForwardProp: ownProp })<EntryState>(entryStyles);

export const Footer = styled.div<{ $collapsed: boolean }>(({ $collapsed }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: $collapsed ? 'center' : 'stretch',
  gap: space.sm,
  minWidth: 0,
}));

/** Encabezado de sección: botón que pliega y despliega, con la flecha a la derecha. */
export const SectionToggle = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space.sm,
  width: '100%',
  minHeight: '36px',
  marginTop: space.sm,
  padding: `0 ${space.md}`,
  boxSizing: 'border-box',
  border: 'none',
  borderRadius: v.radius.md,
  background: 'transparent',
  color: v.textMuted,
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  transition: `color ${transition}, background ${transition}`,
  '&:hover': { color: v.text, background: v.surfaceSunken },
  '&:focus-visible': focusVisible,
});

export const SectionChevron = styled.span<{ $folded: boolean }>(({ $folded }) => ({
  display: 'inline-flex',
  flexShrink: 0,
  transform: $folded ? 'rotate(-90deg)' : 'none',
  transition: `transform ${timing('fast')}`,
  [reducedMotion]: { transition: 'none' },
}));

/**
 * Cuerpo plegable: la fila de la rejilla pasa de `1fr` a `0fr` en `base` con `inOut`.
 * Plegado queda `visibility: hidden` (fuera del tabulador y del lector de pantalla), pero
 * solo cuando termina de cerrarse.
 */
export const SectionBody = styled.div<{ $folded: boolean }>(({ $folded }) => ({
  display: 'grid',
  gridTemplateRows: $folded ? '0fr' : '1fr',
  visibility: $folded ? 'hidden' : 'visible',
  transition: $folded
    ? `grid-template-rows ${timing('base', 'inOut')}, visibility 0s linear ${ms('base')}`
    : `grid-template-rows ${timing('base', 'inOut')}`,
  [reducedMotion]: { transition: 'none' },
  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    gap: space.xxs,
    minHeight: 0,
    overflow: 'hidden',
  },
}));

/** Con la barra plegada, cada sección es solo una raya. */
export const SectionRule = styled.hr({
  width: '24px',
  margin: `${space.sm} auto`,
  border: 'none',
  borderTop: `1px solid ${v.border}`,
});

/** Las entradas `standalone`: al final, separadas de las secciones. */
export const StandaloneGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.xxs,
  marginTop: 'auto',
  paddingTop: space.sm,
  borderTop: `1px solid ${v.border}`,
});

/** Contador a la derecha (barra completa) o sobre la esquina del icono (plegada). */
export const Count = styled.span<{ $rail: boolean }>(({ $rail }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  minWidth: '20px',
  height: '20px',
  padding: `0 ${space.xs}`,
  boxSizing: 'border-box',
  borderRadius: v.radius.pill,
  background: v.primary,
  color: v.onPrimary,
  fontSize: '13px',
  fontWeight: 600,
  lineHeight: 1,
  fontVariantNumeric: 'tabular-nums',
  marginLeft: $rail ? undefined : 'auto',
  ...($rail
    ? { position: 'absolute', top: '2px', right: '2px', minWidth: '18px', height: '18px' }
    : {}),
}));

export const Trailing = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  marginLeft: 'auto',
});
