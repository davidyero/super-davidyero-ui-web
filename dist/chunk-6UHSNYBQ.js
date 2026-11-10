import { useSuperTheme } from './chunk-3YBGSPOJ.js';
import { v } from './chunk-VQ2WXUA7.js';
import { Icon } from '@iconify/react';
import { useId } from 'react';
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
  /* @__PURE__ */ jsx("path", { d: "M9.7 18.5l-.4 3h8.4l-.4-3" })
] });
var gems = (fills) => /* @__PURE__ */ jsx(Fragment, { children: [10.9, 13.5, 16.1].map((x, i) => /* @__PURE__ */ jsx(
  "path",
  {
    d: `M${x} 13.9 ${x + 1.15} 15.45 ${x} 17 ${x - 1.15} 15.45Z`,
    fill: fills[i],
    stroke: "none"
  },
  x
)) });
var sparkle = (fill) => /* @__PURE__ */ jsx(
  "path",
  {
    d: "M4.5 1.2 5.4 3.6 7.8 4.5 5.4 5.4 4.5 7.8 3.6 5.4 1.2 4.5 3.6 3.6Z",
    fill,
    stroke: "none"
  }
);
var free = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M12 21v-8" }),
  /* @__PURE__ */ jsx("path", { d: "M12 13c0-3.5-2.6-6-6.5-6 0 3.6 2.6 6 6.5 6Z" }),
  /* @__PURE__ */ jsx("path", { d: "M12 11c0-3.2 2.3-5.5 6-5.5 0 3.2-2.4 5.5-6 5.5Z" }),
  /* @__PURE__ */ jsx("path", { d: "M8 21h8" })
] });
var lite = () => /* @__PURE__ */ jsx("path", { d: "M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" });
var pro = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M8 4h8v5a4 4 0 0 1-8 0V4Z" }),
  /* @__PURE__ */ jsx("path", { d: "M8 5.5H5.5v1.2A3 3 0 0 0 8.4 9.8" }),
  /* @__PURE__ */ jsx("path", { d: "M16 5.5h2.5v1.2a3 3 0 0 1-2.9 3.1" }),
  /* @__PURE__ */ jsx("path", { d: "M12 13v4" }),
  /* @__PURE__ */ jsx("path", { d: "M8.5 20.5h7l-.8-3.5H9.3Z" })
] });
var thanos = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  GAUNTLET,
  gems(["currentColor", "currentColor", "currentColor"])
] });
var superthanos = (uid) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: uid, x1: "0", y1: "0", x2: "1", y2: "1", children: [
    /* @__PURE__ */ jsx("stop", { offset: "0", stopColor: "#FFE08A" }),
    /* @__PURE__ */ jsx("stop", { offset: ".5", stopColor: "#E5A823" }),
    /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#A86B0C" })
  ] }) }),
  /* @__PURE__ */ jsx("g", { stroke: `url(#${uid})`, children: GAUNTLET }),
  gems(["#E5484D", "#3E7BFA", "#30A46C"]),
  sparkle("#FFC53D")
] });
var roleOwner = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M4 17.5 3 7.5l5 4 4-6.5 4 6.5 5-4-1 10Z" }),
  /* @__PURE__ */ jsx("path", { d: "M4.5 20.5h15" })
] });
var roleAdmin = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6Z" }),
  /* @__PURE__ */ jsx("path", { d: "m8.8 12 2.2 2.2 4.2-4.4" })
] });
var roleEditor = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M15.5 4.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" }),
  /* @__PURE__ */ jsx("path", { d: "m13.5 6.5 3 3" }),
  /* @__PURE__ */ jsx("path", { d: "M12 20h8" })
] });
var roleViewer = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" }),
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
] });
var roleReception = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "M4 17h16" }),
  /* @__PURE__ */ jsx("path", { d: "M5.5 17a6.5 6.5 0 0 1 13 0" }),
  /* @__PURE__ */ jsx("path", { d: "M12 10.5V8.5" }),
  /* @__PURE__ */ jsx("path", { d: "M10.5 8.5h3" }),
  /* @__PURE__ */ jsx("path", { d: "M3 20h18" })
] });
var roleStaff = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("rect", { x: "5", y: "6", width: "14", height: "15", rx: "2" }),
  /* @__PURE__ */ jsx("path", { d: "M9.5 3h5v4.5h-5Z" }),
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12.5", r: "2" }),
  /* @__PURE__ */ jsx("path", { d: "M8.5 18c.6-1.5 1.9-2.3 3.5-2.3s2.9.8 3.5 2.3" })
] });
var roleMember = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "8", r: "3.8" }),
  /* @__PURE__ */ jsx("path", { d: "M4.5 20.5c.9-3.6 3.9-5.7 7.5-5.7s6.6 2.1 7.5 5.7" })
] });
var roleModerator = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("path", { d: "m13.5 4.5 6 6" }),
  /* @__PURE__ */ jsx("path", { d: "m11 7 6 6" }),
  /* @__PURE__ */ jsx("path", { d: "m10.2 7.8 5 5-2.4 2.4-5-5Z" }),
  /* @__PURE__ */ jsx("path", { d: "m10.1 12.9-6.6 6.6" }),
  /* @__PURE__ */ jsx("path", { d: "M13 20.5h8" })
] });
var CUSTOM_ICONS = {
  "plan-free": free,
  "plan-lite": lite,
  "plan-pro": pro,
  "plan-thanos": thanos,
  "plan-superthanos": superthanos,
  // Roles de equipo; thanos y superthanos son los mismos guanteletes de los planes.
  "role-owner": roleOwner,
  "role-admin": roleAdmin,
  "role-editor": roleEditor,
  "role-viewer": roleViewer,
  "role-reception": roleReception,
  "role-staff": roleStaff,
  "role-member": roleMember,
  "role-moderator": roleModerator,
  "role-thanos": thanos,
  "role-superthanos": superthanos,
  // Alias de la 0.13.0.
  thanos,
  superthanos
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
  const uid = `sd-icon-${useId().replace(/:/g, "")}`;
  const custom = CUSTOM_ICONS[name]?.(uid);
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
