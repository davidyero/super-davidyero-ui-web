import { useSuperLabels } from './chunk-XMET5A6D.js';
import { v } from './chunk-BSDVG7PM.js';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

var LOADER_PX = { sm: 16, md: 24, lg: 40 };
var Spinner = styled.span(
  ({ $size, $color }) => {
    const px = LOADER_PX[$size];
    return {
      display: "inline-block",
      flexShrink: 0,
      width: `${px}px`,
      height: `${px}px`,
      borderRadius: "50%",
      border: `${Math.max(2, Math.round(px / 10))}px solid currentColor`,
      borderRightColor: "transparent",
      color: $color === "primary" ? v.primary : "currentColor",
      animation: "sd-spin 0.75s linear infinite",
      "@media (prefers-reduced-motion: reduce)": { animationDuration: "1.6s" }
    };
  }
);
var SuperLoader = ({
  size = "md",
  color = "primary",
  decorative = false,
  className
}) => {
  const labels = useSuperLabels();
  return /* @__PURE__ */ jsx(
    Spinner,
    {
      $size: size,
      $color: color,
      className,
      role: decorative ? void 0 : "status",
      "aria-label": decorative ? void 0 : labels.loading,
      "aria-hidden": decorative ? true : void 0
    }
  );
};

export { SuperLoader };
