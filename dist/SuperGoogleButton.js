import { useSuperTheme } from './chunk-3YBGSPOJ.js';
import styled from '@emotion/styled';
import { useRef, useEffect } from 'react';
import { jsx } from '@emotion/react/jsx-runtime';

var Slot = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  pointer-events: ${({ $disabled }) => $disabled ? "none" : "auto"};
`;
var SCRIPT = "https://accounts.google.com/gsi/client";
var MAX_WIDTH = 400;
var loading = null;
var loadScript = () => {
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error("gsi"));
    };
    document.head.append(script);
  });
  return loading;
};
var useSuperGoogleButton = (clientId, locale, onCredential) => {
  const slot = useRef(null);
  const { mode } = useSuperTheme();
  const callback = useRef(onCredential);
  useEffect(() => {
    callback.current = onCredential;
  }, [onCredential]);
  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;
    loadScript().then(() => {
      const google = window.google;
      const node = slot.current;
      if (cancelled || !google || !node) return;
      google.accounts.id.initialize({
        client_id: clientId,
        ux_mode: "popup",
        callback: (response) => {
          if (response.credential) callback.current(response.credential);
        }
      });
      node.replaceChildren();
      google.accounts.id.renderButton(node, {
        theme: mode === "dark" ? "filled_black" : "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        width: Math.min(node.clientWidth || 360, MAX_WIDTH),
        locale
      });
    }).catch(() => void 0);
    return () => {
      cancelled = true;
    };
  }, [clientId, locale, mode]);
  return { slot, available: Boolean(clientId) };
};
var SuperGoogleButton = ({
  clientId,
  onCredential,
  locale,
  disabled = false,
  className
}) => {
  const { slot, available } = useSuperGoogleButton(clientId, locale, onCredential);
  if (!available) return null;
  return /* @__PURE__ */ jsx(Slot, { ref: slot, $disabled: disabled, className });
};

export { SuperGoogleButton };
