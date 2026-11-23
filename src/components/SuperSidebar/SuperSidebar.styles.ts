import type { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { reducedMotion, transitionOf } from '../../styles/motion';
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
