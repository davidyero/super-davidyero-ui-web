import { space, focusVisible, transition } from './chunk-UD6QNXPQ.js';
import { v } from './chunk-TRHOZRUW.js';
import './chunk-5HHPKIMZ.js';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

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
var CardRoot = styled.div(({ $variant, $padding, $interactive }) => ({
  display: "block",
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
var SuperCard = ({
  variant = "default",
  padding = "md",
  interactive = false,
  as,
  onClick,
  className,
  id,
  children
}) => /* @__PURE__ */ jsx(
  CardRoot,
  {
    as,
    $variant: variant,
    $padding: padding,
    $interactive: interactive,
    onClick,
    className,
    id,
    children
  }
);

export { SuperCard };
