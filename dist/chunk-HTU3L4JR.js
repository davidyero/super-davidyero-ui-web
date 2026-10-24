import { useSuperTheme } from './chunk-XMET5A6D.js';
import { v } from './chunk-BSDVG7PM.js';
import { Icon } from '@iconify/react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

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
      children: id ? /* @__PURE__ */ jsx(Icon, { icon: id, width: size, height: size }) : null
    }
  );
};

export { SuperIcon };
