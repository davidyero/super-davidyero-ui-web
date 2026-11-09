import { defineTokens, type SuperTokensInput } from '../tokens';

/**
 * Tema Pilates (Agenda Pilates): crema, tinta y terracota; Gilda Display en los
 * títulos y Manrope en el texto; radios grandes y botones en píldora.
 * Fuente: especificación "Refactor de interfaz · Agenda Pilates" v1 (nov 2026), §3.
 *
 * Solo modo claro (decisión de David): `dark` repite `light`, así que monta el
 * provider con `mode="light"`.
 */
const light: SuperTokensInput = {
  background: '#F6F1EC',
  surface: '#FFFDFB',
  surfaceSunken: '#F8F3EF',
  surfaceElevated: '#FFFDFB',
  surfaceField: '#FFFDFB',
  border: '#EDE4DD',
  borderStrong: '#D9CCC3',
  text: '#2A211E',
  textBody: '#2A211E',
  // --muted: el gris más claro permitido sobre crema (contraste AA).
  textMuted: '#5E534D',
  textSubtle: '#5E534D',
  primary: '#9C5646',
  primaryHover: '#864737',
  onPrimary: '#FFFDFB',
  primarySoft: '#F2E1DA',
  primarySoftText: '#7A3F31',
  success: '#3E5A43',
  successSoft: '#E4EBE3',
  successText: '#3E5A43',
  warning: '#7A5418',
  warningSoft: '#F6EBD6',
  warningText: '#7A5418',
  danger: '#A3362B',
  dangerSoft: '#F6E4E0',
  dangerText: '#A3362B',
  info: '#5D6F8C',
  infoSoft: '#E8ECF2',
  infoText: '#3F4E66',
  focusRing: 'rgba(156, 86, 70, 0.35)',
  fontFamily: {
    base: "Manrope, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    heading: "'Gilda Display', Georgia, 'Times New Roman', serif",
  },
  // Tarjeta 24 · campo 14 · botón y chip en píldora.
  radius: { sm: '10px', md: '14px', lg: '24px', pill: '999px', button: '999px' },
  // Sombras casi nulas; la grande es la del drawer.
  shadow: {
    sm: 'none',
    md: '0 8px 24px rgba(42, 33, 30, 0.08)',
    lg: '-20px 0 60px rgba(42, 33, 30, 0.2)',
  },
  // Gilda Display solo tiene peso 400.
  typography: {
    display: { fontWeight: 400, letterSpacing: '-0.01em' },
    h1: { fontWeight: 400, letterSpacing: '-0.01em' },
    h2: { fontWeight: 400 },
    h3: { fontWeight: 400 },
    h4: { fontWeight: 400 },
    h5: { fontWeight: 400 },
    h6: { fontWeight: 400 },
    title: { fontWeight: 400 },
  },
};

export const pilatesTokens = defineTokens({ light, dark: light });

/** Puntos de color por tipo de clase (nunca como fondo saturado completo). */
export const PILATES_TYPE_COLORS = ['#9C5646', '#5E7D63', '#B08A3E', '#5D6F8C'] as const;

/** Hoja de Google Fonts con las dos familias del tema; va en el `<head>` de la app. */
export const PILATES_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Manrope:wght@400;500;600;700&display=swap';
