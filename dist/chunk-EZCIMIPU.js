import { useId } from 'react';
import { jsxs, jsx, Fragment } from '@emotion/react/jsx-runtime';

// src/components/SuperFlag/SuperFlag.tsx
var FLAG_PATHS = {
  co: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { width: "32", height: "16", fill: "#FCD116" }),
    /* @__PURE__ */ jsx("rect", { y: "16", width: "32", height: "8", fill: "#003893" }),
    /* @__PURE__ */ jsx("rect", { y: "24", width: "32", height: "8", fill: "#CE1126" })
  ] }),
  us: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { width: "32", height: "32", fill: "#FFFFFF" }),
    [0, 2, 4, 6, 8, 10, 12].map((row) => /* @__PURE__ */ jsx("rect", { y: row * 32 / 13, width: "32", height: 32 / 13, fill: "#B22234" }, row)),
    /* @__PURE__ */ jsx("rect", { width: "16", height: 7 * 32 / 13, fill: "#3C3B6E" }),
    [3, 8, 13].flatMap(
      (x) => [3, 7.5, 12].map((y) => /* @__PURE__ */ jsx("circle", { cx: x, cy: y, r: "1", fill: "#FFFFFF" }, `${x}-${y}`))
    )
  ] }),
  gb: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { width: "32", height: "32", fill: "#012169" }),
    /* @__PURE__ */ jsx("path", { d: "M0 0L32 32M32 0L0 32", stroke: "#FFFFFF", strokeWidth: "6" }),
    /* @__PURE__ */ jsx("path", { d: "M0 0L32 32M32 0L0 32", stroke: "#C8102E", strokeWidth: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M16 0V32M0 16H32", stroke: "#FFFFFF", strokeWidth: "10" }),
    /* @__PURE__ */ jsx("path", { d: "M16 0V32M0 16H32", stroke: "#C8102E", strokeWidth: "6" })
  ] }),
  es: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { width: "32", height: "32", fill: "#AA151B" }),
    /* @__PURE__ */ jsx("rect", { y: "8", width: "32", height: "16", fill: "#F1BF00" })
  ] }),
  mx: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { width: "11", height: "32", fill: "#006847" }),
    /* @__PURE__ */ jsx("rect", { x: "11", width: "10", height: "32", fill: "#FFFFFF" }),
    /* @__PURE__ */ jsx("rect", { x: "21", width: "11", height: "32", fill: "#CE1126" }),
    /* @__PURE__ */ jsx("circle", { cx: "16", cy: "16", r: "3", fill: "#8C6A2F" })
  ] }),
  br: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { width: "32", height: "32", fill: "#009C3B" }),
    /* @__PURE__ */ jsx("path", { d: "M16 5L29 16L16 27L3 16Z", fill: "#FFDF00" }),
    /* @__PURE__ */ jsx("circle", { cx: "16", cy: "16", r: "6", fill: "#002776" })
  ] })
};
var SuperFlag = ({
  country,
  size = 24,
  label,
  className
}) => {
  const clipId = `sd-flag-${useId().replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 32 32",
      role: label ? "img" : void 0,
      "aria-label": label,
      "aria-hidden": label ? void 0 : true,
      focusable: "false",
      className,
      style: { display: "block", flexShrink: 0 },
      children: [
        /* @__PURE__ */ jsx("clipPath", { id: clipId, children: /* @__PURE__ */ jsx("circle", { cx: "16", cy: "16", r: "16" }) }),
        /* @__PURE__ */ jsx("g", { clipPath: `url(#${clipId})`, children: FLAG_PATHS[country] })
      ]
    }
  );
};

export { SuperFlag };
