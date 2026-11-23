import { prefersReducedMotion, motion, timing, staggerDelay } from './chunk-KETZYNAG.js';
import { useState, useEffect } from 'react';

var useStagger = (count) => {
  const [phase, setPhase] = useState("waiting");
  if (phase === "waiting" && count > 0) setPhase(prefersReducedMotion() ? "done" : "running");
  useEffect(() => {
    if (phase !== "running") return void 0;
    const total = motion.stagger.max * motion.stagger.step + motion.duration.base + motion.duration.fast;
    const timer = setTimeout(() => setPhase("done"), total);
    return () => clearTimeout(timer);
  }, [phase]);
  return (index) => phase === "running" ? { style: { animation: `sd-rise ${timing("base")} ${staggerDelay(index)} both` } } : {};
};

export { useStagger };
