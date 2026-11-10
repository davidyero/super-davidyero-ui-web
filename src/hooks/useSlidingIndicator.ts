import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type DependencyList,
  type RefObject,
} from 'react';

/** Caja de la opción activa, relativa a su contenedor (offsetLeft/offsetTop). */
export interface IndicatorBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SlidingIndicator<TContainer extends HTMLElement> {
  containerRef: RefObject<TContainer | null>;
  box: IndicatorBox | null;
  /** false en la primera medida (se coloca sin animar); true después (se desliza). */
  animate: boolean;
}

/**
 * Indicador que se desliza a la opción activa (subrayado de SuperTabs, fondo de
 * SuperSegmented). Mide la activa con `findActive`, vuelve a medir cuando cambian `deps`
 * o el tamaño del contenedor, y solo anima a partir de la segunda medida.
 */
export const useSlidingIndicator = <TContainer extends HTMLElement>(
  findActive: (container: TContainer) => HTMLElement | null | undefined,
  deps: DependencyList,
): SlidingIndicator<TContainer> => {
  const containerRef = useRef<TContainer | null>(null);
  const [box, setBox] = useState<IndicatorBox | null>(null);
  const [animate, setAnimate] = useState(false);
  const findRef = useRef(findActive);
  useLayoutEffect(() => {
    findRef.current = findActive;
  });

  const measure = useCallback((): void => {
    const container = containerRef.current;
    const el = container ? findRef.current(container) : null;
    setBox(
      el
        ? { x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight }
        : null,
    );
  }, []);

  // Las deps las da quien llama (value, items, tamaño…).
  useLayoutEffect(measure, [measure, ...deps]);

  useEffect(() => {
    if (box && !animate) {
      const frame = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [box, animate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [measure]);

  return { containerRef, box, animate };
};
