import { DEFAULT_ICONS, SuperThemeContext } from './chunk-V6RXFFM7.js';
export { DEFAULT_ICONS, useSuperLabels, useSuperTheme } from './chunk-V6RXFFM7.js';
import { tokensToCssVars } from './chunk-524J7YGQ.js';
import { resolveTokens } from './chunk-5HHPKIMZ.js';
export { DEFAULT_TOKENS, defineTokens, resolveTokens } from './chunk-5HHPKIMZ.js';
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
