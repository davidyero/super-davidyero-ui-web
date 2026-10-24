import { transition, space, zIndex } from './chunk-OJWPWQVY.js';
import { v } from './chunk-BSDVG7PM.js';
import './chunk-ASN2VLDU.js';
import { useId, isValidElement, cloneElement } from 'react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Wrap = styled.span({
  position: "relative",
  display: "inline-flex",
  '&:hover > [role="tooltip"], &:focus-within > [role="tooltip"]': {
    opacity: 1,
    visibility: "visible"
  }
});
var Bubble = styled.span(({ $placement }) => ({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  ...$placement === "top" ? { bottom: `calc(100% + ${space.xs})` } : { top: `calc(100% + ${space.xs})` },
  zIndex: zIndex.dropdown,
  padding: `${space.xxs} ${space.sm}`,
  borderRadius: v.radius.sm,
  background: v.surfaceElevated,
  border: `1px solid ${v.border}`,
  boxShadow: v.shadow.md,
  color: v.text,
  fontFamily: v.font.base,
  fontSize: "13px",
  lineHeight: 1.35,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  opacity: 0,
  visibility: "hidden",
  transition: `opacity ${transition}`
}));
var SuperTooltip = ({
  label,
  children,
  placement = "top",
  className
}) => {
  const id = useId();
  const trigger = isValidElement(children) ? cloneElement(children, { "aria-describedby": id }) : children;
  return /* @__PURE__ */ jsxs(Wrap, { className, children: [
    trigger,
    /* @__PURE__ */ jsx(Bubble, { role: "tooltip", id, $placement: placement, children: label })
  ] });
};

export { SuperTooltip };
