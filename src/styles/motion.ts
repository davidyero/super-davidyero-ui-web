/**
 * Movimiento: los únicos milisegundos y curvas de la librería (regla 14 de la UX del
 * ecosistema, `proyecto-claude/movimiento.md`). Ningún componente ni web escribe
 * `ms` o `cubic-bezier` a mano: los lee de aquí.
 *
 * - Todo lo que responde al usuario dura como mucho 300 ms (`slow`). `intro`, `spin`,
 *   `shimmer` y `pulse` son las únicas excepciones.
 * - La salida dura unos dos tercios de la entrada: `slow` sale en `base`, `base` en `fast`.
 * - Con «Reducir movimiento» (`reducedMotion`) todo deslizamiento, escala o sacudida pasa a
 *   fundido o desaparece, y los bucles se paran o van más despacio.
 */
export const motion = {
  duration: {
    /** Respuesta al toque: escala al pulsar, color del estado activo. */
    instant: 100,
    /** Hover, focus, fundidos, interruptores, giro de un icono. */
    fast: 150,
    /** Menús, tooltips, toasts, deslizamientos cortos, indicador de pestañas. */
    base: 220,
    /** Modales, bottom sheets, drawers, cambio de pantalla. */
    slow: 280,
    /** Solo la entrada decorativa del onboarding o del splash, una vez. */
    intro: 560,
    /** Una vuelta de un spinner (`SuperLoader`, `SuperIcon spin`), en bucle con `linear`. */
    spin: 900,
    /** Bucle del `SuperSkeleton`. */
    shimmer: 1400,
    /**
     * Latido de un indicador de estado «en vivo» (punto que respira), en bucle con
     * `inOut`. Con «Reducir movimiento» se para. Junto con `spin` y `shimmer`, el único
     * bucle permitido.
     */
    pulse: 1600,
  },
  easing: {
    /** La de por defecto: todo lo que entra o responde. */
    out: 'cubic-bezier(0.22, 1, 0.36, 1)',
    /** Lo que sale de la pantalla. */
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    /** Algo visible que cambia de sitio o de tamaño: reordenar, expandir y contraer. */
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    /** Pasarse un poco y volver: la bolita del interruptor, el check de «copiado». */
    overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    /** Solo para bucles (spinner, shimmer). */
    linear: 'linear',
  },
  /** Distancia de un fundido con deslizamiento, en px. */
  offset: { sm: 8, md: 16 },
  scale: {
    /** Al pulsar un botón o una card táctil. */
    press: 0.97,
    /** Un modal o un popover que aparece, de 0.96 a 1. */
    enter: 0.96,
  },
  /** Primera carga de una lista: 30 ms entre elementos, solo los 8 primeros. */
  stagger: { step: 30, max: 8 },
  /** Sacudida de un campo con error: ±6 px en 4 pasos, en `slow`. */
  shake: { distance: 6, steps: 4 },
} as const;

export type MotionDuration = keyof typeof motion.duration;
export type MotionEasing = keyof typeof motion.easing;

/** `150` → `'150ms'`. */
export const ms = (duration: MotionDuration): string => `${motion.duration[duration]}ms`;

/** Duración y curva juntas, para `transition` o `animation`: `'150ms cubic-bezier(…)'`. */
export const timing = (duration: MotionDuration, easing: MotionEasing = 'out'): string =>
  `${ms(duration)} ${motion.easing[easing]}`;

/** `transition` de varias propiedades con la misma duración y curva. */
export const transitionOf = (
  properties: readonly string[],
  duration: MotionDuration = 'fast',
  easing: MotionEasing = 'out',
): string => properties.map((p) => `${p} ${timing(duration, easing)}`).join(', ');

/** Media query de «Reducir movimiento», para los estilos. */
export const reducedMotion = '@media (prefers-reduced-motion: reduce)';

/** «Reducir movimiento» activado, para la lógica (en SSR y sin `matchMedia`, `false`). */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Retardo del elemento `index` de una lista: 30 ms por paso; del 8.º en adelante, a la vez. */
export const staggerDelay = (index: number): string =>
  `${Math.min(Math.max(index, 0), motion.stagger.max) * motion.stagger.step}ms`;
