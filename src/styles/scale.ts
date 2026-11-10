import { v } from '../theme/vars';

/** Espaciado fijo de la librería (no es token: igual en todas las apps). */
export const space = {
  xxs: '4px',
  xs: '6px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
} as const;

/**
 * Escala tipográfica única. Ningún texto baja de 13px (regla del ecosistema).
 */
export const textScale = {
  display: { fontSize: '32px', lineHeight: 1.2, fontWeight: 700, heading: true },
  h1: { fontSize: '24px', lineHeight: 1.25, fontWeight: 700, heading: true },
  h2: { fontSize: '20px', lineHeight: 1.3, fontWeight: 700, heading: true },
  h3: { fontSize: '17px', lineHeight: 1.35, fontWeight: 600, heading: true },
  h4: { fontSize: '16px', lineHeight: 1.4, fontWeight: 600, heading: true },
  h5: { fontSize: '15px', lineHeight: 1.4, fontWeight: 600, heading: true },
  h6: { fontSize: '14px', lineHeight: 1.4, fontWeight: 600, heading: true },
  title: { fontSize: '18px', lineHeight: 1.35, fontWeight: 600, heading: true },
  subtitle: { fontSize: '15px', lineHeight: 1.45, fontWeight: 500, heading: false },
  body: { fontSize: '14px', lineHeight: 1.55, fontWeight: 400, heading: false },
  bodySmall: { fontSize: '13px', lineHeight: 1.5, fontWeight: 400, heading: false },
  caption: { fontSize: '13px', lineHeight: 1.45, fontWeight: 400, heading: false },
  label: { fontSize: '13px', lineHeight: 1.4, fontWeight: 600, heading: false },
} as const;

export type TextVariant = keyof typeof textScale;

/**
 * Titulares fluidos, fuera de la escala fija: crecen con la pantalla. `hero` va de 26px en
 * un móvil a 44px en escritorio (titular de SuperAuthTemplate).
 */
export const fluidText = {
  hero: { fontSize: 'clamp(26px, 6vw, 44px)', lineHeight: 1.12, letterSpacing: '-0.02em' },
} as const;

export const MIN_FONT_SIZE = 13;

export const fontWeight = { regular: 400, medium: 500, semibold: 600, bold: 700 } as const;
export type FontWeight = keyof typeof fontWeight;

/** Puntos de corte, mobile-first: `media.md` = desde tablet. */
export const breakpoints = { sm: 600, md: 900, lg: 1200, xl: 1536 } as const;
export type Breakpoint = keyof typeof breakpoints;

export const media = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
} as const;

/**
 * Capas, de abajo arriba. `dropdown` para menús en el flujo de la página; `popover` para lo
 * que va en un portal sobre todo (la lista de SuperDropdown), así se abre también dentro
 * de un SuperModal o SuperDrawer; `tooltip` por encima de esa lista y bajo los toasts.
 */
export const zIndex = {
  dropdown: 800,
  modal: 1000,
  popover: 1100,
  tooltip: 1150,
  toast: 1200,
  overlay: 1400,
} as const;

/** Velo neutro bajo SuperModal y SuperDrawer: el mismo en todos los temas. */
export const scrim = 'rgba(0, 0, 0, 0.45)';

/** Deslizamiento de los indicadores (SuperTabs, SuperSegmented). */
export const slide = '260ms cubic-bezier(0.22, 1, 0.36, 1)';

export const transition = '150ms ease';

/** Anillo de foco visible, el mismo en todos los controles. */
export const focusVisible = {
  outline: 'none',
  boxShadow: `0 0 0 3px ${v.focusRing}`,
} as const;
