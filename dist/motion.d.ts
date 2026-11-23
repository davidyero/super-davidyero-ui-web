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
declare const motion: {
    readonly duration: {
        /** Respuesta al toque: escala al pulsar, color del estado activo. */
        readonly instant: 100;
        /** Hover, focus, fundidos, interruptores, giro de un icono. */
        readonly fast: 150;
        /** Menús, tooltips, toasts, deslizamientos cortos, indicador de pestañas. */
        readonly base: 220;
        /** Modales, bottom sheets, drawers, cambio de pantalla. */
        readonly slow: 280;
        /** Solo la entrada decorativa del onboarding o del splash, una vez. */
        readonly intro: 560;
        /** Una vuelta de un spinner (`SuperLoader`, `SuperIcon spin`), en bucle con `linear`. */
        readonly spin: 900;
        /** Bucle del `SuperSkeleton`. */
        readonly shimmer: 1400;
        /**
         * Latido de un indicador de estado «en vivo» (punto que respira), en bucle con
         * `inOut`. Con «Reducir movimiento» se para. Junto con `spin` y `shimmer`, el único
         * bucle permitido.
         */
        readonly pulse: 1600;
    };
    readonly easing: {
        /** La de por defecto: todo lo que entra o responde. */
        readonly out: "cubic-bezier(0.22, 1, 0.36, 1)";
        /** Lo que sale de la pantalla. */
        readonly in: "cubic-bezier(0.4, 0, 1, 1)";
        /** Algo visible que cambia de sitio o de tamaño: reordenar, expandir y contraer. */
        readonly inOut: "cubic-bezier(0.65, 0, 0.35, 1)";
        /** Pasarse un poco y volver: la bolita del interruptor, el check de «copiado». */
        readonly overshoot: "cubic-bezier(0.34, 1.56, 0.64, 1)";
        /** Solo para bucles (spinner, shimmer). */
        readonly linear: "linear";
    };
    /** Distancia de un fundido con deslizamiento, en px. */
    readonly offset: {
        readonly sm: 8;
        readonly md: 16;
    };
    readonly scale: {
        /** Al pulsar un botón o una card táctil. */
        readonly press: 0.97;
        /** Un modal o un popover que aparece, de 0.96 a 1. */
        readonly enter: 0.96;
    };
    /** Primera carga de una lista: 30 ms entre elementos, solo los 8 primeros. */
    readonly stagger: {
        readonly step: 30;
        readonly max: 8;
    };
    /** Sacudida de un campo con error: ±6 px en 4 pasos, en `slow`. */
    readonly shake: {
        readonly distance: 6;
        readonly steps: 4;
    };
};
type MotionDuration = keyof typeof motion.duration;
type MotionEasing = keyof typeof motion.easing;
/** `150` → `'150ms'`. */
declare const ms: (duration: MotionDuration) => string;
/** Duración y curva juntas, para `transition` o `animation`: `'150ms cubic-bezier(…)'`. */
declare const timing: (duration: MotionDuration, easing?: MotionEasing) => string;
/** `transition` de varias propiedades con la misma duración y curva. */
declare const transitionOf: (properties: readonly string[], duration?: MotionDuration, easing?: MotionEasing) => string;
/** Media query de «Reducir movimiento», para los estilos. */
declare const reducedMotion = "@media (prefers-reduced-motion: reduce)";
/** «Reducir movimiento» activado, para la lógica (en SSR y sin `matchMedia`, `false`). */
declare const prefersReducedMotion: () => boolean;
/** Retardo del elemento `index` de una lista: 30 ms por paso; del 8.º en adelante, a la vez. */
declare const staggerDelay: (index: number) => string;

export { motion, ms, prefersReducedMotion, reducedMotion, staggerDelay, timing, transitionOf };
export type { MotionDuration, MotionEasing };
