// src/styles/motion.ts
var motion = {
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
    pulse: 1600
  },
  easing: {
    /** La de por defecto: todo lo que entra o responde. */
    out: "cubic-bezier(0.22, 1, 0.36, 1)",
    /** Lo que sale de la pantalla. */
    in: "cubic-bezier(0.4, 0, 1, 1)",
    /** Algo visible que cambia de sitio o de tamaño: reordenar, expandir y contraer. */
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    /** Pasarse un poco y volver: la bolita del interruptor, el check de «copiado». */
    overshoot: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    /** Solo para bucles (spinner, shimmer). */
    linear: "linear"
  },
  /** Distancia de un fundido con deslizamiento, en px. */
  offset: { sm: 8, md: 16 },
  scale: {
    /** Al pulsar un botón o una card táctil. */
    press: 0.97,
    /** Un modal o un popover que aparece, de 0.96 a 1. */
    enter: 0.96
  },
  /** Primera carga de una lista: 30 ms entre elementos, solo los 8 primeros. */
  stagger: { step: 30, max: 8 },
  /** Sacudida de un campo con error: ±6 px en 4 pasos, en `slow`. */
  shake: { distance: 6, steps: 4 }
};
var ms = (duration) => `${motion.duration[duration]}ms`;
var timing = (duration, easing = "out") => `${ms(duration)} ${motion.easing[easing]}`;
var transitionOf = (properties, duration = "fast", easing = "out") => properties.map((p) => `${p} ${timing(duration, easing)}`).join(", ");
var reducedMotion = "@media (prefers-reduced-motion: reduce)";
var prefersReducedMotion = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var staggerDelay = (index) => `${Math.min(Math.max(index, 0), motion.stagger.max) * motion.stagger.step}ms`;

export { motion, ms, prefersReducedMotion, reducedMotion, staggerDelay, timing, transitionOf };
