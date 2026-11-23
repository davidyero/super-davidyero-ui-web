import { useEffect, useState, type CSSProperties } from 'react';
import { motion, prefersReducedMotion, staggerDelay, timing } from '../styles/motion';

type Phase = 'waiting' | 'running' | 'done';

/**
 * Entrada escalonada de una lista, solo la primera vez que llega con elementos: fundido
 * con `offset.sm` en `base`, 30 ms entre uno y otro y los del 8.º en adelante a la vez.
 * No se repite al refrescar ni al paginar, y con «Reducir movimiento» no hace nada.
 *
 * ```tsx
 * const stagger = useStagger(items.length);
 * items.map((item, i) => <SuperListItem key={item.id} {...stagger(i)} />)
 * ```
 */
export const useStagger = (count: number): ((index: number) => { style?: CSSProperties }) => {
  const [phase, setPhase] = useState<Phase>('waiting');
  if (phase === 'waiting' && count > 0) setPhase(prefersReducedMotion() ? 'done' : 'running');

  useEffect(() => {
    if (phase !== 'running') return undefined;
    const total =
      motion.stagger.max * motion.stagger.step + motion.duration.base + motion.duration.fast;
    const timer = setTimeout(() => setPhase('done'), total);
    return () => clearTimeout(timer);
  }, [phase]);

  return (index) =>
    phase === 'running'
      ? { style: { animation: `sd-rise ${timing('base')} ${staggerDelay(index)} both` } }
      : {};
};
