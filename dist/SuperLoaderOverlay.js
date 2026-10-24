import { useLoaderActive } from './chunk-7PBTLBLQ.js';
import { SuperLoader } from './chunk-EQLP6N2V.js';
import { useSuperLabels } from './chunk-V6RXFFM7.js';
import { zIndex } from './chunk-BJDG5RNM.js';
import { v } from './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/react/jsx-runtime';

var Backdrop = styled.div({
  position: "fixed",
  inset: 0,
  zIndex: zIndex.overlay,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `color-mix(in srgb, ${v.background} 70%, transparent)`,
  backdropFilter: "blur(2px)",
  cursor: "progress"
});
var useSuperLoaderOverlay = (visible, delayMs) => {
  const active = useLoaderActive();
  const wanted = visible ?? active;
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!wanted) {
      setShown(false);
      return void 0;
    }
    if (delayMs <= 0) {
      setShown(true);
      return void 0;
    }
    const timer = setTimeout(() => setShown(true), delayMs);
    return () => clearTimeout(timer);
  }, [wanted, delayMs]);
  return shown && wanted;
};
var SuperLoaderOverlay = ({
  visible,
  delayMs = 120
}) => {
  const labels = useSuperLabels();
  const shown = useSuperLoaderOverlay(visible, delayMs);
  if (!shown) return null;
  return /* @__PURE__ */ jsx(Backdrop, { role: "alert", "aria-busy": "true", "aria-live": "assertive", "aria-label": labels.loading, children: /* @__PURE__ */ jsx(SuperLoader, { size: "lg", decorative: true }) });
};

export { SuperLoaderOverlay };
