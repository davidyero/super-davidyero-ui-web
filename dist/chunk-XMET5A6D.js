import { createContext, useContext } from 'react';

// src/theme/SuperThemeContext.ts
var DEFAULT_ICONS = {
  eye: "solar:eye-broken",
  eyeOff: "solar:eye-closed-broken",
  close: "solar:close-circle-broken",
  check: "solar:check-circle-broken",
  chevronDown: "solar:alt-arrow-down-broken",
  info: "solar:info-circle-broken",
  success: "solar:check-circle-broken",
  warning: "solar:danger-triangle-broken",
  danger: "solar:close-circle-broken",
  empty: "solar:box-minimalistic-broken"
};
var SuperThemeContext = createContext(null);
var useSuperTheme = () => {
  const ctx = useContext(SuperThemeContext);
  if (!ctx) {
    throw new Error(
      "@davidyero/ui-web: falta <SuperThemeProvider> en la ra\xEDz de la app (pasa tokens, mode y labels)."
    );
  }
  return ctx;
};
var useSuperLabels = () => useSuperTheme().labels;

export { DEFAULT_ICONS, SuperThemeContext, useSuperLabels, useSuperTheme };
