import { useLoaderActive } from './chunk-7PBTLBLQ.js';
import { SuperLoader } from './chunk-ZVYWI475.js';
import { useSuperLabels } from './chunk-3YBGSPOJ.js';
import { zIndex } from './chunk-D42FHLD7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
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
    if (!wanted || delayMs <= 0) return void 0;
    const timer = setTimeout(() => setShown(true), delayMs);
    return () => {
      clearTimeout(timer);
      setShown(false);
    };
  }, [wanted, delayMs]);
  if (!wanted) return false;
  return delayMs <= 0 || shown;
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
