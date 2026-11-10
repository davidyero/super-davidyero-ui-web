import { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react';

// src/hooks/useSlidingIndicator.ts
var useSlidingIndicator = (findActive, deps) => {
  const containerRef = useRef(null);
  const [box, setBox] = useState(null);
  const [animate, setAnimate] = useState(false);
  const findRef = useRef(findActive);
  useLayoutEffect(() => {
    findRef.current = findActive;
  });
  const measure = useCallback(() => {
    const container = containerRef.current;
    const el = container ? findRef.current(container) : null;
    setBox(
      el ? { x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight } : null
    );
  }, []);
  useLayoutEffect(measure, [measure, ...deps]);
  useEffect(() => {
    if (box && !animate) {
      const frame = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(frame);
    }
    return void 0;
  }, [box, animate]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return void 0;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [measure]);
  return { containerRef, box, animate };
};

export { useSlidingIndicator };
