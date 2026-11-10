import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { fluidText, media, space } from '../../styles/scale';
import { v } from '../../theme/vars';

const tint = (color: string, amount: number): string =>
  `color-mix(in srgb, ${color} ${amount}%, transparent)`;

const drift = keyframes({
  '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
  '100%': { transform: 'translate3d(8%, 6%, 0) scale(1.15)' },
});

const scroll = keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(-50%)' },
});

const rise = keyframes({
  '0%': { opacity: 0, transform: 'translateY(12px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const SHIFT = '72px';
const slideKeyframes = (from: string, to: string, fromOpacity: number, toOpacity: number) =>
  keyframes({
    '0%': { transform: `translateX(${from})`, opacity: fromOpacity },
    '100%': { transform: `translateX(${to})`, opacity: toOpacity },
  });
const SLIDES = {
  'enter-forward': slideKeyframes(SHIFT, '0', 0, 1),
  'enter-back': slideKeyframes(`-${SHIFT}`, '0', 0, 1),
  'exit-forward': slideKeyframes('0', `-${SHIFT}`, 1, 0),
  'exit-back': slideKeyframes('0', SHIFT, 1, 0),
} as const;
export type CardMotion = keyof typeof SLIDES | 'rise';

const reduced = '@media (prefers-reduced-motion: reduce)';

// Móvil: barra, marca, formulario y pie en una columna. Escritorio: la marca
// ocupa la columna izquierda entera y el formulario la derecha.
export const Shell = styled.div({
  position: 'relative',
  isolation: 'isolate',
  minHeight: '100dvh',
  overflow: 'hidden',
  background: v.background,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'auto auto 1fr auto',
  gridTemplateAreas: '"top" "hero" "form" "foot"',
  padding: `calc(env(safe-area-inset-top, 0px) + ${space.lg}) ${space.lg} calc(env(safe-area-inset-bottom, 0px) + ${space.lg})`,
  gap: space.xl,
  [media.lg]: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: '"hero top" "hero form" "hero foot"',
    padding: 0,
    gap: 0,
  },
});

/** Decoración: rejilla que se desvanece y dos halos con los colores de la app. */
export const Backdrop = styled.div({
  position: 'absolute',
  inset: 0,
  zIndex: -1,
  pointerEvents: 'none',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: `linear-gradient(${tint(v.border, 70)} 1px, transparent 1px), linear-gradient(90deg, ${tint(v.border, 70)} 1px, transparent 1px)`,
    backgroundSize: '32px 32px',
    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)',
    [media.lg]: {
      maskImage: 'radial-gradient(ellipse 60% 80% at 20% 50%, #000 30%, transparent 75%)',
      WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 20% 50%, #000 30%, transparent 75%)',
    },
  },
});

export const Glow = styled.span<{ $tone: 'primary' | 'accent' }>(({ $tone }) => ({
  position: 'absolute',
  width: '70vmax',
  height: '70vmax',
  borderRadius: '50%',
  filter: 'blur(60px)',
  background: `radial-gradient(circle, ${tint($tone === 'primary' ? v.primary : v.accent, 34)} 0%, transparent 65%)`,
  top: $tone === 'primary' ? '-35vmax' : 'auto',
  bottom: $tone === 'accent' ? '-40vmax' : 'auto',
  left: $tone === 'primary' ? '-25vmax' : 'auto',
  right: $tone === 'accent' ? '-30vmax' : 'auto',
  animation: `${drift} ${$tone === 'primary' ? 18 : 23}s ease-in-out infinite alternate`,
  [reduced]: { animation: 'none' },
}));

export const Top = styled.div({
  gridArea: 'top',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: space.xxs,
  [media.lg]: { padding: `${space.xl} ${space.xl} 0` },
});

export const Hero = styled.section({
  gridArea: 'hero',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: space.md,
  animation: `${rise} 420ms ease both`,
  [reduced]: { animation: 'none' },
  [media.lg]: {
    alignItems: 'flex-start',
    textAlign: 'left',
    justifyContent: 'flex-start',
    gap: space.xl,
    padding: space.xxxl,
    borderRight: `1px solid ${v.border}`,
    background: tint(v.surface, 55),
  },
});

export const BrandSlot = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: space.sm,
  // Brillo del color de la app detrás del monograma.
  '& img, & svg': { filter: `drop-shadow(0 6px 18px ${tint(v.primary, 55)})` },
});

export const Pitch = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'inherit',
  gap: space.sm,
  maxWidth: '520px',
  minWidth: 0,
  width: '100%',
  // En escritorio la frase va al centro de la columna, no pegada abajo.
  [media.lg]: { margin: 'auto 0' },
});

/** El titular crece con la pantalla: 26px en un móvil, 44px en escritorio. */
export const Tagline = styled.div({
  '& > *': fluidText.hero,
});

/** Acento bajo el titular: una línea corta con los dos colores de la app. */
export const Rule = styled.span({
  display: 'block',
  width: '56px',
  height: '3px',
  borderRadius: v.radius.pill,
  background: `linear-gradient(90deg, ${v.primary}, ${v.accent})`,
});

export const Marquee = styled.div({
  width: '100%',
  overflow: 'hidden',
  maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
  WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
  [reduced]: { maskImage: 'none', WebkitMaskImage: 'none' },
});

export const Track = styled.ul({
  display: 'flex',
  gap: space.sm,
  width: 'max-content',
  margin: 0,
  padding: `${space.xxs} 0`,
  listStyle: 'none',
  animation: `${scroll} 28s linear infinite`,
  [reduced]: { animation: 'none', flexWrap: 'wrap', width: '100%', justifyContent: 'center' },
  '&:hover': { animationPlayState: 'paused' },
});

export const Chip = styled.li<{ $copy?: boolean }>(({ $copy }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space.xs,
  flexShrink: 0,
  padding: `${space.xs} ${space.md}`,
  borderRadius: v.radius.pill,
  border: `1px solid ${v.border}`,
  background: tint(v.surface, 80),
  color: v.textMuted,
  whiteSpace: 'nowrap',
  '& svg': { color: v.accent },
  // Sin movimiento la lista se queda quieta: la copia del carrusel sobra.
  [reduced]: $copy ? { display: 'none' } : {},
}));

// Rejilla de una celda: al cambiar de pantalla, la tarjeta que sale y la que entra
// se superponen en el mismo sitio.
export const FormArea = styled.main({
  gridArea: 'form',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  alignItems: 'start',
  justifyItems: 'center',
  [media.lg]: { alignItems: 'center', padding: space.xl },
});

/** El formulario sobre vidrio: deja ver la rejilla y los halos detrás. */
export const Card = styled.div<{ $motion: CardMotion }>(({ $motion }) => ({
  gridArea: '1 / 1',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: space.lg,
  padding: space.xl,
  borderRadius: v.radius.lg,
  border: `1px solid ${v.border}`,
  background: tint(v.surface, 82),
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  boxShadow: v.shadow.lg,
  animation:
    $motion === 'rise'
      ? `${rise} 520ms 80ms ease both`
      : `${SLIDES[$motion]} 360ms cubic-bezier(0.22, 1, 0.36, 1) both`,
  pointerEvents: $motion.startsWith('exit') ? 'none' : undefined,
  // La saliente va después en el DOM (ids repetidos): la entrante se pinta encima igual.
  zIndex: $motion.startsWith('exit') ? 0 : 1,
  [reduced]: { animation: 'none' },
}));

export const Foot = styled.footer({
  gridArea: 'foot',
  display: 'flex',
  justifyContent: 'center',
  [media.lg]: { padding: `0 ${space.xl} ${space.xl}` },
});
