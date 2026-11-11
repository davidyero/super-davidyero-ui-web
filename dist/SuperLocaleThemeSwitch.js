import { SuperPrefToggle, PREF_GLYPH_SIZE } from './chunk-SI5RI5HK.js';
import { SuperFlag } from './chunk-EZCIMIPU.js';
import './chunk-3YBGSPOJ.js';
import './chunk-6OHDPNJ7.js';
import { space } from './chunk-GSUBWCY7.js';
import './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';
import styled from '@emotion/styled';

var SUN = "M8.463 15.538Q7 14.075 7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17t-3.537-1.463M2 13q-.425 0-.712-.288T1 12t.288-.712T2 11h2q.425 0 .713.288T5 12t-.288.713T4 13zm18 0q-.425 0-.712-.288T19 12t.288-.712T20 11h2q.425 0 .713.288T23 12t-.288.713T22 13zm-8.712-8.287Q11 4.425 11 4V2q0-.425.288-.712T12 1t.713.288T13 2v2q0 .425-.288.713T12 5t-.712-.288m0 18Q11 22.426 11 22v-2q0-.425.288-.712T12 19t.713.288T13 20v2q0 .425-.288.713T12 23t-.712-.288M5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7t-.687.288t-.713-.288M18 19.425l-1.05-1.075q-.275-.3-.275-.712t.275-.688q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3M16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275M4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288";
var MOON = "M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362t.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21";
var ModeGlyph = ({
  mode,
  size
}) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: "false",
    style: { display: "block", flexShrink: 0 },
    children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: mode === "dark" ? MOON : SUN })
  }
);
var Row = styled.div(({ $align }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: $align === "end" ? "flex-end" : "flex-start",
  gap: space.sm
}));
var FLAG = { es: "co", en: "us" };
var SuperLocaleThemeSwitch = ({
  locale,
  onLocaleChange,
  mode,
  onModeChange,
  labels,
  variant = "soft",
  align = "end",
  showLabels = false,
  className
}) => {
  const nextLocale = locale === "es" ? "en" : "es";
  const dark = mode === "dark";
  return /* @__PURE__ */ jsxs(Row, { $align: align, className, children: [
    /* @__PURE__ */ jsx(
      SuperPrefToggle,
      {
        glyph: /* @__PURE__ */ jsx(SuperFlag, { country: FLAG[locale], size: PREF_GLYPH_SIZE }),
        glyphKey: locale,
        ariaLabel: nextLocale === "en" ? labels.switchToEn : labels.switchToEs,
        label: showLabels ? labels[locale] : void 0,
        variant,
        onClick: () => onLocaleChange(nextLocale)
      }
    ),
    /* @__PURE__ */ jsx(
      SuperPrefToggle,
      {
        glyph: /* @__PURE__ */ jsx(ModeGlyph, { mode, size: PREF_GLYPH_SIZE }),
        glyphKey: mode,
        tone: dark ? "night" : "sun",
        ariaLabel: dark ? labels.switchToLight : labels.switchToDark,
        label: showLabels ? labels[mode] : void 0,
        variant,
        onClick: () => onModeChange(dark ? "light" : "dark")
      }
    )
  ] });
};

export { SuperLocaleThemeSwitch };
