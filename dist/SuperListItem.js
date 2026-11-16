import { SuperTooltip } from './chunk-TU2LGXLM.js';
import { SuperTypography } from './chunk-6OHDPNJ7.js';
import { focusVisible, transition, space } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Item = styled("button", {
  shouldForwardProp: (prop) => prop !== "as" && !prop.startsWith("$")
})(
  ({ $hoverable, $clickable, $divider }) => ({
    display: "flex",
    alignItems: "center",
    gap: space.md,
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: `${space.sm} ${space.sm}`,
    border: "none",
    borderBottom: $divider ? `1px solid ${v.border}` : "none",
    borderRadius: $divider ? 0 : v.radius.sm,
    background: "transparent",
    color: "inherit",
    font: "inherit",
    textAlign: "left",
    transition: `background ${transition}`,
    ...$hoverable || $clickable ? { "&:hover": { background: v.surfaceSunken } } : {},
    ...$clickable ? { cursor: "pointer", "&:focus-visible": focusVisible } : {}
  })
);
var Leading = styled.span({ display: "inline-flex", flexShrink: 0 });
var Content = styled.span({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  flex: 1,
  minWidth: 0
});
var SubtitleFocus = styled.span({
  // flex: el texto truncado de dentro necesita ser un bloque para cortar con "…".
  display: "flex",
  minWidth: 0,
  maxWidth: "100%",
  borderRadius: v.radius.sm,
  "&:focus-visible": focusVisible
});
var Meta = styled.span({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: space.xs,
  marginTop: space.xxs,
  minWidth: 0
});
var Trailing = styled.span({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
  gap: space.xs
});
var SuperListItem = ({
  title,
  subtitle,
  subtitleTooltip = false,
  leading,
  meta,
  trailing,
  hoverable = false,
  onClick,
  divider = false,
  className
}) => {
  const subtitleText = subtitle ? /* @__PURE__ */ jsx(SuperTypography, { variant: "caption", color: "textMuted", truncate: true, as: "span", children: subtitle }) : null;
  return /* @__PURE__ */ jsxs(
    Item,
    {
      as: onClick ? "button" : "div",
      type: onClick ? "button" : void 0,
      onClick,
      $hoverable: hoverable,
      $clickable: Boolean(onClick),
      $divider: divider,
      className,
      children: [
        leading ? /* @__PURE__ */ jsx(Leading, { children: leading }) : null,
        /* @__PURE__ */ jsxs(Content, { children: [
          /* @__PURE__ */ jsx(SuperTypography, { variant: "bodySmall", color: "text", weight: "semibold", truncate: true, as: "span", children: title }),
          subtitle && subtitleTooltip ? /* @__PURE__ */ jsx(SuperTooltip, { label: subtitle, block: true, children: /* @__PURE__ */ jsx(SubtitleFocus, { tabIndex: onClick ? void 0 : 0, children: subtitleText }) }) : subtitleText,
          meta ? /* @__PURE__ */ jsx(Meta, { children: meta }) : null
        ] }),
        trailing ? /* @__PURE__ */ jsx(Trailing, { children: trailing }) : null
      ]
    }
  );
};

export { SuperListItem };
