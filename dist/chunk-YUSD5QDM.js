import { useSuperLabels } from './chunk-2OYI3VCV.js';
import { space } from './chunk-HF3T4CF3.js';
import { reducedMotion, motion, timing } from './chunk-KETZYNAG.js';
import { v } from './chunk-VQ2WXUA7.js';
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
      animation: `sd-spin ${timing("spin", "linear")} infinite`,
      // Con «Reducir movimiento» sigue girando (indica que carga), a la mitad de velocidad.
      [reducedMotion]: { animationDuration: `${motion.duration.spin * 2}ms` }
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
