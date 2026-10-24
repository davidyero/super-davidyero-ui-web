import { useSuperLabels } from './chunk-XMET5A6D.js';
import { space } from './chunk-UD6QNXPQ.js';
import { v } from './chunk-TRHOZRUW.js';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

var Center = styled.div(({ $layout }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: space.xl,
  minHeight: $layout === "page" ? "60vh" : void 0
}));
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
      color: $color === "primary" ? v.accent : "currentColor",
      animation: "sd-spin 0.75s linear infinite",
      "@media (prefers-reduced-motion: reduce)": { animationDuration: "1.6s" }
    };
  }
);
var SuperLoader = ({
  size = "md",
  layout = "inline",
  color = "primary",
  decorative = false,
  className
}) => {
  const labels = useSuperLabels();
  const spinner = /* @__PURE__ */ jsx(
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
  return layout === "inline" ? spinner : /* @__PURE__ */ jsx(Center, { $layout: layout, children: spinner });
};

export { SuperLoader };
