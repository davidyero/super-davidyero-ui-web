import { SuperSkeleton } from './chunk-ZJKOTCBT.js';
import { SuperTooltip } from './chunk-TU2LGXLM.js';
import { SuperIcon } from './chunk-DGDXZTZH.js';
import './chunk-2OYI3VCV.js';
import { SuperTypography } from './chunk-6OHDPNJ7.js';
import { space, transition, focusVisible } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsx, jsxs } from '@emotion/react/jsx-runtime';

var FILL = {
  primary: v.primary,
  accent: v.accent,
  success: v.success,
  info: v.info
};
var BAR_HEIGHT = "10px";
var List = styled.div(({ $maxHeight }) => ({
  display: "flex",
  flexDirection: "column",
  gap: space.xxs,
  minWidth: 0,
  maxHeight: $maxHeight,
  overflowY: $maxHeight ? "auto" : void 0
}));
var Row = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: space.xs,
  padding: `${space.xs} ${space.sm}`,
  borderRadius: v.radius.sm,
  minWidth: 0,
  transition: `background ${transition}`,
  "&:hover, &:focus-within": { background: v.surfaceSunken },
  "&:hover [data-sd-bar-fill]": { opacity: 0.85 }
});
var RowHead = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: space.sm,
  minWidth: 0
});
var Name = styled.span({
  display: "inline-flex",
  alignItems: "center",
  gap: space.xs,
  minWidth: 0,
  color: v.textBody
});
var Track = styled.span({
  display: "block",
  position: "relative",
  width: "100%",
  height: BAR_HEIGHT,
  borderRadius: v.radius.pill,
  // border y no surfaceSunken: la fila al pasar el ratón ya usa surfaceSunken.
  background: v.border,
  overflow: "hidden",
  "&:focus-visible": focusVisible
});
var Fill = styled.span(({ $tone, $pct }) => ({
  display: "block",
  height: "100%",
  width: `${$pct}%`,
  borderRadius: v.radius.pill,
  background: FILL[$tone],
  transition: "width 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms ease",
  "@media (prefers-reduced-motion: reduce)": { transition: "none" }
}));
var SKELETON_WIDTHS = ["92%", "74%", "58%", "41%", "27%", "18%"];
var SuperBarChart = ({
  items,
  ariaLabel,
  formatValue = String,
  tooltip,
  tone = "primary",
  maxHeight,
  loading = false,
  loadingRows = 5,
  className
}) => {
  if (loading) {
    return /* @__PURE__ */ jsx(List, { "aria-label": ariaLabel, "aria-busy": true, className, children: Array.from({ length: loadingRows }, (_, i) => /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsxs(RowHead, { children: [
        /* @__PURE__ */ jsx(SuperSkeleton, { variant: "text", width: "40%" }),
        /* @__PURE__ */ jsx(SuperSkeleton, { variant: "text", width: "12%" })
      ] }),
      /* @__PURE__ */ jsx(SuperSkeleton, { variant: "block", height: BAR_HEIGHT, width: SKELETON_WIDTHS[i % 6] })
    ] }, i)) });
  }
  const max = Math.max(0, ...items.map((item) => item.value));
  const total = items.reduce((sum, item) => sum + item.value, 0);
  return /* @__PURE__ */ jsx(List, { role: "list", "aria-label": ariaLabel, $maxHeight: maxHeight, className, children: items.map((item) => {
    const pct = max > 0 ? item.value / max * 100 : 0;
    const share = total > 0 ? item.value / total : 0;
    const hint = tooltip ? tooltip(item, share) : formatValue(item.value);
    return /* @__PURE__ */ jsxs(Row, { role: "listitem", children: [
      /* @__PURE__ */ jsxs(RowHead, { children: [
        /* @__PURE__ */ jsxs(Name, { children: [
          item.icon ? /* @__PURE__ */ jsx(SuperIcon, { name: item.icon, size: 18 }) : null,
          /* @__PURE__ */ jsx(SuperTypography, { variant: "bodySmall", color: "textBody", truncate: true, children: item.label })
        ] }),
        /* @__PURE__ */ jsx(SuperTypography, { variant: "bodySmall", color: "text", weight: "semibold", mono: true, children: formatValue(item.value) })
      ] }),
      /* @__PURE__ */ jsx(SuperTooltip, { label: hint, block: true, children: /* @__PURE__ */ jsx(Track, { tabIndex: 0, role: "img", "aria-label": `${item.label}: ${hint}`, children: /* @__PURE__ */ jsx(Fill, { $tone: tone, $pct: pct, "data-sd-bar-fill": true }) }) })
    ] }, item.id);
  }) });
};

export { SuperBarChart };
