import { useEffect, useState } from 'react';
import { motion, prefersReducedMotion, type MotionDuration } from '../styles/motion';

/**
 * Mantiene montado un elemento mientras hace su animación de salida. Con `open` en
 * `false`, `closing` queda en `true` durante `exit` y luego se desmonta. Sin animación
 * posible (SSR, sin `matchMedia`) o con «Reducir movimiento», se desmonta al momento.
 */
export const usePresence = (
  open: boolean,
  exit: MotionDuration,
): { mounted: boolean; closing: boolean } => {
  const [mounted, setMounted] = useState(open);
  // Abrir monta en el mismo render, sin esperar a un efecto.
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    if (open || !mounted) return undefined;
    const canAnimate = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
    const wait = canAnimate && !prefersReducedMotion() ? motion.duration[exit] : 0;
    const timer = setTimeout(() => setMounted(false), wait);
    return () => clearTimeout(timer);
  }, [open, mounted, exit]);

  return { mounted: open || mounted, closing: !open && mounted };
};
