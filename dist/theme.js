import { DEFAULT_ICONS, SuperThemeContext } from './chunk-3YBGSPOJ.js';
export { DEFAULT_ICONS, useSuperLabels, useSuperTheme } from './chunk-3YBGSPOJ.js';
import { tokensToCssVars } from './chunk-VQ2WXUA7.js';
import { resolveTokens } from './chunk-X7SCOXRS.js';
export { DEFAULT_TOKENS, defineTokens, resolveTokens } from './chunk-X7SCOXRS.js';
import { Global } from '@emotion/react';
import { useMemo } from 'react';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var SuperThemeProvider = ({
  tokens,
  mode,
  labels,
  icons,
  LinkComponent,
  children
}) => {
  const vars = useMemo(() => tokensToCssVars(resolveTokens(mode, tokens?.[mode])), [mode, tokens]);
  const value = useMemo(
    () => ({ mode, labels, icons: { ...DEFAULT_ICONS, ...icons }, LinkComponent }),
    [mode, labels, icons, LinkComponent]
  );
  return /* @__PURE__ */ jsxs(SuperThemeContext.Provider, { value, children: [
    /* @__PURE__ */ jsx(
      Global,
      {
        styles: {
          ":root": { ...vars, colorScheme: mode },
          // iOS amplía la página al enfocar un campo con letra de menos de 16px y no la
          // devuelve. Red de seguridad también para campos que no son del design system.
          "@media (pointer: coarse)": {
            "input, textarea, select": { fontSize: "16px !important" }
          },
          "@keyframes sd-spin": { to: { transform: "rotate(360deg)" } },
          "@keyframes sd-shimmer": {
            "0%": { backgroundPosition: "200% 0" },
            "100%": { backgroundPosition: "-200% 0" }
          }
        }
      }
    ),
    children
  ] });
};

export { SuperThemeProvider };
