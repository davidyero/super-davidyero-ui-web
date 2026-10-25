import { SuperTypography } from './chunk-XCRJXV2B.js';
import { space, focusVisible, transition } from './chunk-BJDG5RNM.js';
import { v } from './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var PAD = { none: "0", sm: space.md, md: space.lg, lg: space.xl };
var BG = {
  default: { background: v.surface, border: `1px solid ${v.border}`, boxShadow: v.shadow.sm },
  sunken: { background: v.surfaceSunken, border: "1px solid transparent", boxShadow: "none" },
  elevated: {
    background: v.surfaceElevated,
    border: `1px solid ${v.border}`,
    boxShadow: v.shadow.md
  },
  outline: { background: "transparent", border: `1px solid ${v.borderStrong}`, boxShadow: "none" }
};
var CardRoot = styled("div", {
  shouldForwardProp: (prop) => prop !== "as" && !prop.startsWith("$")
})(({ $variant, $padding, $interactive, $minHeight }) => ({
  display: "block",
  minHeight: $minHeight,
  boxSizing: "border-box",
  width: "100%",
  minWidth: 0,
  padding: PAD[$padding],
  borderRadius: v.radius.lg,
  color: v.textBody,
  textAlign: "left",
  font: "inherit",
  ...BG[$variant],
  ...$interactive ? {
    cursor: "pointer",
    transition: `border-color ${transition}, box-shadow ${transition}`,
    "&:hover": { borderColor: v.accent, boxShadow: v.shadow.md },
    "&:focus-visible": focusVisible
  } : {}
}));
var CardHeader = styled.div(({ $padding }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: space.md,
  marginBottom: space.md,
  // Sin padding (tablas a sangre) la cabecera se indenta para no pegarse al borde.
  padding: $padding === "none" ? `${space.md} ${space.lg} 0` : 0,
  minWidth: 0
}));
var CardTitleArea = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0
});
var SuperCard = ({
  variant = "default",
  padding = "md",
  interactive = false,
  title,
  subtitle,
  trailing,
  minHeight,
  as,
  onClick,
  className,
  id,
  children,
  ...aria
}) => {
  const hasHeader = Boolean(title || subtitle || trailing);
  return /* @__PURE__ */ jsxs(
    CardRoot,
    {
      ...aria,
      as,
      $variant: variant,
      $padding: padding,
      $interactive: interactive,
      $minHeight: minHeight,
      onClick,
      className,
      id,
      children: [
        hasHeader ? /* @__PURE__ */ jsxs(CardHeader, { $padding: padding, children: [
          /* @__PURE__ */ jsxs(CardTitleArea, { children: [
            title ? /* @__PURE__ */ jsx(SuperTypography, { variant: "label", color: "textSubtle", as: "div", children: title }) : null,
            subtitle ? /* @__PURE__ */ jsx(SuperTypography, { variant: "caption", color: "textSubtle", as: "div", children: subtitle }) : null
          ] }),
          trailing
        ] }) : null,
        children
      ]
    }
  );
};

export { SuperCard };
