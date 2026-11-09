import { useSuperTheme } from './chunk-3YBGSPOJ.js';
import { v } from './chunk-VQ2WXUA7.js';
import { Icon } from '@iconify/react';
import { jsx, jsxs, Fragment } from '@emotion/react/jsx-runtime';
import styled from '@emotion/styled';

var GAUNTLET = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M8.7 12.5V6.2a1.2 1.2 0 0 1 2.4 0V11" }),
  /* @__PURE__ */ jsx("path", { d: "M11.1 11V4.7a1.2 1.2 0 0 1 2.4 0V11" }),
  /* @__PURE__ */ jsx("path", { d: "M13.5 11V5.2a1.2 1.2 0 0 1 2.4 0V11" }),
  /* @__PURE__ */ jsx("path", { d: "M15.9 11V6.9a1.2 1.2 0 0 1 2.4 0v6.6" }),
  /* @__PURE__ */ jsx("path", { d: "M8.7 14.2 6.9 12a1.2 1.2 0 0 0-1.9 1.5l2.6 3.6" }),
  /* @__PURE__ */ jsx("path", { d: "M7.6 17.1c.6.9 1.6 1.4 2.7 1.4h5.4c1.4 0 2.6-1.2 2.6-2.6v-2.4" }),
  /* @__PURE__ */ jsx("path", { d: "M8.7 12.4h9.6" }),
  /* @__PURE__ */ jsx("path", { d: "M8.7 8.6h9.6" }),
  /* @__PURE__ */ jsx("path", { d: "M9.7 18.5l-.4 3h8.4l-.4-3" })
] });
var SPARKLE = /* @__PURE__ */ jsx(
  "path",
  {
    d: "M4.5 1.2 5.4 3.6 7.8 4.5 5.4 5.4 4.5 7.8 3.6 5.4 1.2 4.5 3.6 3.6Z",
    fill: "currentColor",
    strokeWidth: 1
  }
);
var CUSTOM_ICONS = {
  thanos: GAUNTLET,
  superthanos: /* @__PURE__ */ jsxs(Fragment, { children: [
    GAUNTLET,
    SPARKLE
  ] })
};
var iconColor = (color) => color === "inherit" ? "currentColor" : v[color];
var IconWrap = styled.span(
  ({ $spin, $size, $color }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: `${$size}px`,
    height: `${$size}px`,
    color: iconColor($color),
    ...$spin ? { animation: "sd-spin 0.9s linear infinite" } : {},
    "@media (prefers-reduced-motion: reduce)": { animation: "none" }
  })
);
var SuperIcon = ({
  name,
  size = 20,
  color = "inherit",
  spin = false,
  label,
  className
}) => {
  const { icons } = useSuperTheme();
  const custom = CUSTOM_ICONS[name];
  const id = name.includes(":") ? name : icons[name];
  return /* @__PURE__ */ jsx(
    IconWrap,
    {
      $spin: spin,
      $size: size,
      $color: color,
      className,
      role: label ? "img" : void 0,
      "aria-label": label,
      "aria-hidden": label ? void 0 : true,
      "data-icon": name,
      children: custom ? /* @__PURE__ */ jsx(
        "svg",
        {
          width: size,
          height: size,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.75,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          focusable: "false",
          children: custom
        }
      ) : id ? /* @__PURE__ */ jsx(Icon, { icon: id, width: size, height: size }) : null
    }
  );
};

export { SuperIcon };
