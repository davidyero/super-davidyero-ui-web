import { space } from './chunk-BJDG5RNM.js';
import { v } from './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

var Shimmer = styled.span(
  ({ $w, $h, $round }) => ({
    display: "block",
    width: $w,
    height: $h,
    borderRadius: $round ? "50%" : v.radius.sm,
    // border/borderStrong y no surfaceSunken: sobre `surface` oscuro el sunken casi
    // no se distingue y el esqueleto desaparecía.
    background: `linear-gradient(90deg, ${v.border} 25%, ${v.borderStrong} 37%, ${v.border} 63%)`,
    backgroundSize: "400% 100%",
    animation: "sd-shimmer 1.4s ease infinite",
    "@media (prefers-reduced-motion: reduce)": { animation: "none" }
  })
);
var Lines = styled.span({ display: "flex", flexDirection: "column", gap: space.sm });
var SuperSkeleton = ({
  variant = "block",
  width,
  height,
  lines = 3,
  className
}) => {
  if (variant === "circle") {
    const size = width ?? "40px";
    return /* @__PURE__ */ jsx(Shimmer, { $w: size, $h: size, $round: true, className, "aria-hidden": true });
  }
  if (variant === "text") {
    return /* @__PURE__ */ jsx(Lines, { className, "aria-hidden": true, children: Array.from({ length: Math.max(1, lines) }, (_, i) => /* @__PURE__ */ jsx(
      Shimmer,
      {
        $w: i === lines - 1 && lines > 1 ? "60%" : width ?? "100%",
        $h: "14px",
        $round: false
      },
      i
    )) });
  }
  return /* @__PURE__ */ jsx(
    Shimmer,
    {
      $w: width ?? "100%",
      $h: height ?? "80px",
      $round: false,
      className,
      "aria-hidden": true
    }
  );
};

export { SuperSkeleton };
